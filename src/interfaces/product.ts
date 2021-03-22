export interface IProduct {
	_id: string
	name: string
	description: string
	photo: string[]
	price: number
	stock: number //estoque
	weight: number //largura
	height: number //altura
	length: number //comprimento
	pound: number //peso
	variety?: IVariety[] //variedades
}

interface IVariety {
	size?: number
	color?: number
	other?: any
}
