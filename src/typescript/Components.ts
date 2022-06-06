import { ChartValue, LinearChartData, TypesResponse, ValuesResponse } from "./Responses"

//#region Home
export type HomeBody = {
	data: ValuesResponse
}

export type HeaderProps = {
	title: string
}

export type ValuesCardProps = {
	type: string
	buy?: number
	sell?: number
	update: string
}

//#endregion Home

//#region Converter
export type LinearChartData = { x: number; y: number; meta?: any }[]
export type ChartConfiguration = {
	minY: number
	minX: number
	maxY: number
	maxX: number
}
export type ConverterProps = {
	options: TypesResponse[]
	currencies: ValuesResponse
	chart: LinearChartData
	chartConfig: ChartConfiguration | undefined
}
//#endregion Converter

//#region TypesModal
export type TypesModalProps = {
	visible: boolean
	toggleModal: () => void
	selected: TypesResponse
	options: TypesResponse[]
	onChangeType: (typeId: string) => void
}
//#region TypesModal
