import { NavigationContainer } from "@react-navigation/native"
import React from "react"
import { DefaultTheme, IconButton, Provider as PaperProvider } from "react-native-paper"
import Home from "./src/views/Home"
import Calculator from "./src/views/Calculator"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

const Tab = createBottomTabNavigator()

const theme = {
	...DefaultTheme,
	roundness: 2,
	colors: {
		...DefaultTheme.colors,
		primary: "#007fa9",
		accent: "#3271a8",
		secondary: "#3271a8",
		light: "#edf7ff"
	}
}

export default function App() {
	return (
		<NavigationContainer>
			<PaperProvider theme={theme}>
				<Tab.Navigator
					initialRouteName="Cotizaciones"
					screenOptions={({ route }) => ({
						tabBarIcon: ({ focused }) => {
							return route.name === "Cotizaciones" ? (
								<IconButton icon="cash-multiple" color={focused ? theme.colors.primary : theme.colors.disabled} />
							) : (
								<IconButton icon="calculator" color={focused ? theme.colors.primary : theme.colors.disabled} />
							)
						}
					})}
				>
					<Tab.Screen name="Cotizaciones" component={Home} />
					<Tab.Screen name="Calculadora" component={Calculator} />
				</Tab.Navigator>
			</PaperProvider>
		</NavigationContainer>
	)
}
