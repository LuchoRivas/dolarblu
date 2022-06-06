import AsyncStorage from "@react-native-community/async-storage"
import Axios from "axios"
import React from "react"
import { View } from "react-native"
import { useTheme } from "react-native-paper"
import Converter from "../components/Converter"
import Header from "../components/Header"
import config from "../constants/Enviorment"
import { ChartConfiguration, LinearChartData } from "../typescript/Components"
import { ChartValue, ChartValuesResponse, TypesResponse, ValuesResponse } from "../typescript/Responses"

export default function Calculator() {
	const [values, setValues] = React.useState<ValuesResponse>()
	const [chartValues, setChartValues] = React.useState<LinearChartData>()
	const [chartConfigs, setChartConfigs] = React.useState<ChartConfiguration>()
	const [types, setTypes] = React.useState<TypesResponse[]>()
	const { colors } = useTheme()

	const themeStyle = {
		backgroundColor: colors.light,
		flex: 1
	}

	//#region services
	const getFromStorage = async () => {
		try {
			const store = (await AsyncStorage.getItem("VALUES")) || ""
			const data = JSON.parse(store)
			setValues(data)
		} catch (error) {
			console.error(error)
		}
	}

	const getTypes = async () => {
		try {
			const url = `${config.API_URL}/types`
			const { data } = await Axios.get<TypesResponse[]>(url)
			setTypes(data)
		} catch (error) {
			console.error(error)
		}
	}

	const getChartValues = async () => {
		try {
			const url = `${config.API_URL}/chart`
			const { data } = await Axios.get<ChartValuesResponse>(url)

			const getMaxOfArray = (numArray) => {
				return Math.max.apply(null, numArray)
			}

			const getMinOfArray = (numArray) => {
				return Math.min.apply(null, numArray)
			}

			const test = data.map((val) => {
				return {
					x: new Date(val.blue.date.$date).getDay()
				}
			})

			console.log(test)

			const pepe = data.map((val) => {
				return {
					y: val.blue.buy,
					x: new Date(val.blue.date.$date).getDay()
				}
			})

			const pepo = {
				minY: getMinOfArray(pepe.map((p) => p.y)),
				minX: getMinOfArray(pepe.map((p) => p.x)),
				maxY: getMaxOfArray(pepe.map((p) => p.y)) + 1,
				maxX: getMaxOfArray(pepe.map((p) => p.x)) + 1
			}

			setChartValues(pepe)
			setChartConfigs(pepo)
		} catch (error) {
			console.error(error)
		}
	}

	//#endregion services

	React.useEffect(() => {
		const fetch = async () => {
			await getChartValues()
			await getTypes()
			await getFromStorage()
		}
		fetch()
	}, [])

	return (
		<View style={themeStyle}>
			<Header title={"Calculadora"} />
			{values && types && (
				<Converter chartConfig={chartConfigs} chart={chartValues} options={types} currencies={values} />
			)}
		</View>
	)
}
