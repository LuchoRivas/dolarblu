import React from "react"
import { StyleSheet, View } from "react-native"
import {
	ActivityIndicator,
	Button,
	Divider,
	Subheading,
	Surface,
	TextInput,
	Title,
	IconButton,
	useTheme
} from "react-native-paper"
import TextHelper from "../helpers/TextHelper"
import TypesModal from "./TypesModal"
import { CurrencyTypes } from "../constants/CurrencyTypes"
import { COLORS } from "../constants/Colors"

export default function Converter(props: ConverterProps) {
	const { options, currencies } = props
	const { colors } = useTheme()

	//#region states

	const [visible, setVisible] = React.useState(false)
	const [loading, setLoading] = React.useState(true)
	const [currency, setCurrency] = React.useState(1)
	const [currencyInput, setCurrencyInput] = React.useState("1")
	const [buyPrice, setBuyPrice] = React.useState(0)
	const [sellPrice, setSellPrice] = React.useState(0)
	const [selected, setSelected] = React.useState<TypesResponse>({
		name: "",
		_id: {
			$oid: ""
		}
	})
	const [currencyType, setCurrencyType] = React.useState<CurrencyTypes>(CurrencyTypes.dolar)

	//#endregion states

	//#region hooks

	React.useEffect(() => {
		const default_option = options[0]
		if (currencies) {
			setSelected(default_option)
			setter(default_option)
			setLoading(false)
		}
	}, [])

	React.useEffect(() => {
		if (currency) calc(currency)
	}, [currency, selected, currencyType])

	//#endregion hooks

	const finder = (typeOfValue: TypesResponse) => {
		// db response to array of values
		const dataValues = Object.values(currencies)
		const match_value = dataValues.find((value) => {
			return value._id.$oid === typeOfValue._id.$oid
		})
		return match_value
	}

	const setter = (typeOfValue: TypesResponse) => {
		const values_to_set = finder(typeOfValue)
		if (values_to_set !== undefined) {
			setBuyPrice(values_to_set.buy)
			setSellPrice(values_to_set.sell)
		}
	}

	const calc = (currency: number) => {
		const value_selected = finder(selected)
		if (value_selected !== undefined) {
			const buy = value_selected.buy
			const sell = value_selected.sell
			const value = currency || 1
			switch (currencyType) {
				case CurrencyTypes.dolar:
					setBuyPrice(buy * value)
					setSellPrice(sell * value)
					break
				case CurrencyTypes.peso:
					setBuyPrice(value / buy)
					setSellPrice(value / sell)
					break
			}
		}
	}

	const toggleModal = () => {
		setVisible(!visible)
	}

	const onChangeType = (typeId: string) => {
		const value_type_selected = options.find((t) => t._id.$oid === typeId)
		if (value_type_selected?._id.$oid === selected._id.$oid) return toggleModal()
		setSelected(value_type_selected || options[0])
		setter(value_type_selected || options[0])
		toggleModal()
	}

	const swapCurrency = () => {
		setCurrencyType(currencyType === CurrencyTypes.dolar ? CurrencyTypes.peso : CurrencyTypes.dolar)
	}

	return (
		<>
			{loading ? (
				<View style={styles.spinnerContainer}>
					<ActivityIndicator animating={loading} size="large" />
				</View>
			) : (
				<View style={{ flex: 1, justifyContent: "center" }}>
					<TypesModal
						visible={visible}
						toggleModal={toggleModal}
						selected={selected}
						options={options}
						onChangeType={onChangeType}
					/>
					<Surface
						style={{
							...styles.container,
							backgroundColor: colors.surface,
							elevation: 4,
							borderColor: colors.accent,
							shadowColor: colors.primary
						}}
					>
						<View
							style={{
								flexDirection: "row",
								alignItems: "center"
							}}
						>
							<TextInput
								style={[styles.input, { marginLeft: 20 }]}
								label={currencyType === CurrencyTypes.dolar ? "Dolar" : "Peso"}
								keyboardType={"numeric"}
								value={currencyInput}
								onChangeText={(value) => {
									setCurrencyInput(value)
									setCurrency(Number(value.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, "")))
								}}
								selectionColor={colors.primary}
								underlineColor={colors.primary}
							/>
							<View style={{ flex: 1, alignItems: "center" }}>
								<IconButton
									size={40}
									icon="swap-horizontal-bold"
									color={colors.primary}
									onPress={swapCurrency}
								/>
							</View>
						</View>
						<View style={styles.pricesRow}>
							{isNaN(buyPrice) === false && (
								<TextInput
									style={{ ...styles.input }}
									disabled
									label="Compra"
									value={`$ ${buyPrice.toFixed(2).toString()}`}
								/>
							)}
							{sellPrice && (
								<TextInput
									style={styles.input}
									disabled
									label="Venta"
									value={`$ ${sellPrice.toFixed(2).toString()}`}
								/>
							)}
						</View>
						<Divider />
						<View style={styles.footer}>
							<Title style={{ marginVertical: 15 }}>
								<Subheading>{"Tipo de dolar"}</Subheading>
							</Title>
							<Button
								mode="outlined"
								labelStyle={{ color: colors.accent }}
								color={colors.accent}
								style={{ borderColor: colors.primary }}
								onPress={toggleModal}
							>
								{selected && TextHelper.capitalize(selected.name)}
							</Button>
						</View>
					</Surface>
				</View>
			)}
		</>
	)
}

const styles = StyleSheet.create({
	spinnerContainer: {
		flex: 1,
		justifyContent: "center"
	},
	container: {
		marginTop: 30,
		marginHorizontal: 30,
		borderRadius: 2
	},
	input: {
		marginTop: 10,
		backgroundColor: COLORS.invisible,
		fontSize: 20,
		fontWeight: "bold",
		flexGrow: 1
	},
	pricesRow: {
		flexDirection: "row",
		flexWrap: "wrap",
		alignItems: "center"
	},
	footer: {
		paddingHorizontal: 15,
		marginBottom: 25
	}
})
