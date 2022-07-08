import AsyncStorage from "@react-native-async-storage/async-storage"
import Axios from "axios"
import { useState, useEffect } from "react"
import View from "react-native"
import { useTheme } from "react-native-paper"
import Converter from "../components/Converter"
import Header from "../components/Header"
import config from "../constants/Enviorment"

export default function Calculator() {
	const [values, setValues] = useState<ValuesResponse>()
	const [types, setTypes] = useState<TypesResponse[]>()
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

	//#endregion services

	useEffect(() => {
		const fetch = async () => {
			await getTypes()
			await getFromStorage()
		}
		fetch()
	}, [])

	return (
		<View style={themeStyle}>
			<Header title={"Calculadora"} />
			{values && types && <Converter options={types} currencies={values} />}
		</View>
	)
}
