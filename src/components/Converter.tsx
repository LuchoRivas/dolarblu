import React from "react"
import { StyleSheet, View } from "react-native"
import { ActivityIndicator, Button, Divider, Subheading, Surface, TextInput, Title } from "react-native-paper"
import TextHelper from "../helpers/TextHelper"
import TypesModal from "./TypesModal"
import { useTheme } from "react-native-paper"

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

	//#endregion states

	//#region hooks

	React.useEffect(() => {
		const default_option = options[0]
		setSelected(default_option)
		if (currencies) {
			setter(default_option)
			setLoading(false)
		}
	}, [])

	React.useEffect(() => {
		if (currency) calc(currency)
	}, [currency, selected])

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
			setBuyPrice(buy * value)
			setSellPrice(sell * value)
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
						<TextInput
							style={[styles.input, { marginHorizontal: 50 }]}
							label="Dolar"
							keyboardType={"numeric"}
							value={currencyInput}
							onChangeText={(value) => {
								setCurrencyInput(value)
								setCurrency(Number(value.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, "")))
							}}
							selectionColor={colors.primary}
							underlineColor={colors.primary}
						/>
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
								<Subheading>Tipo de dolar</Subheading>
							</Title>
							<Button mode="outlined" labelStyle={{ color: colors.accent }} color={colors.accent} style={{borderColor: colors.primary}} onPress={toggleModal}>
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
		backgroundColor: "transparent",
		fontSize: 20,
		fontWeight: "bold",
		flexGrow: 1
	},
	pricesRow: {
		flexDirection: "row",
		flexWrap: "wrap",
		alignItems: "center"
	},
	typeItem: {
		width: "100%",
		alignItems: "center"
	},
	typeText: {
		fontWeight: "bold",
		fontSize: 17,
		alignSelf: "center"
	},
	footer: {
		paddingHorizontal: 15,
		marginBottom: 25
	}
})
