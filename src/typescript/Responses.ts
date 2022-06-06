export type ValuesResponse = {
	blue: {
		_id: {
			$oid: string
		}
		buy: number
		date: {
			$date: Date
		}
		sell: number
		name: string
	}
	bolsa: {
		_id: {
			$oid: string
		}
		buy: number
		date: {
			$date: Date
		}
		sell: number
		name: string
	}
	liqui: {
		_id: {
			$oid: string
		}
		buy: number
		date: {
			$date: Date
		}
		sell: number
		name: string
	}
	oficial: {
		_id: {
			$oid: string
		}
		buy: number
		date: {
			$date: Date
		}
		sell: number
		name: string
	}
	solidario: {
		_id: {
			$oid: string
		}
		buy: number
		date: {
			$date: Date
		}
		sell: number
		name: string
	}
}

export type TypesResponse = {
	_id: {
		$oid: string
	}
	name: string
}

export type ChartValuesResponse = ChartValue[]

export type ChartValue = {
	[TypeOfQuote: string]: {
		_id: {
			$oid: string
		}
		buy: number
		date: {
			$date: number
		}
		name: string
		sell: number
	}
}

