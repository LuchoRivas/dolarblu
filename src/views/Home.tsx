// import React from "react"
import * as React from "react"
import { RefreshControl, ScrollView } from "react-native"
import Body from "../components/Body"
import Header from "../components/Header"
import Axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
import config from "../constants/Enviorment"
import { useTheme } from "react-native-paper"
import AppLoading from "expo-app-loading"

export default function Home() {
	const [values, setValues] = React.useState<ValuesResponse>()
	const [refreshing, setRefreshing] = React.useState(false)
	const [loading, setLoading] = React.useState(true)
	const { colors } = useTheme()

	const themeStyle = {
		backgroundColor: colors.light,
		flex: 1
	}

	const getValues = async () => {
		try {
			const url = `${config.API_URL}/values`
			const { data } = await Axios.get<ValuesResponse>(url)
			if (data) {
				await AsyncStorage.setItem("VALUES", JSON.stringify(data))
				setValues(data)
			} else {
				console.error("Error !")
			}
		} catch (error) {
			console.error(error)
		}
	}

	React.useEffect(() => {
		if (refreshing) refresh()
	}, [refreshing])

	const refresh = async () => {
		await getValues()
		toggleRefresh()
	}

	const toggleRefresh = () => {
		setRefreshing(!refreshing)
	}

	if (loading) {
		return <AppLoading startAsync={getValues} onFinish={() => setLoading(false)} onError={console.warn} />
	}

	return (
		<>
			<Header title={"Cotizaciones"} />
			<ScrollView
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={toggleRefresh} />}
				style={themeStyle}
			>
				{values && <Body data={values} />}
			</ScrollView>
		</>
	)
}
