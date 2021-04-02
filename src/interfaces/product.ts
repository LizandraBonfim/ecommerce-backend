import { IUser } from "./user";

export interface IProduct {
	_id: string
	name: string
	description: string
	photo: string[]
	price: number
	stock: number //estoque
	weight: number //peso
	height: number //altura
	width: number //largura
	length: number //comprimento
	variety?: IVariety[] //variedades
	createdByUser: IUser
}

interface IVariety {
	size?: number
	color?: number
	other?: any
}
