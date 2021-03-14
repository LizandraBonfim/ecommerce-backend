export interface IUser {
	_id?: string
	name: string
	password: string
	gender: GenderEnum
	cellphone: string
	documentNumber: string
	email: string

	street?: string
	neighborhood?: string
	houseNumber?: string
	city?: string
	state?: string
	payment?: string //undefined
	orders?: string //undefined
}

export interface CreateNewUser{
	name: string
	password: string
	gender: GenderEnum
	cellphone: string
	documentNumber: string
	email: string
}

export enum GenderEnum {
	FEMININO,
	MASCULINO,
}

enum CustomerCategories {
	'FEMININO',
	'MASCULINO',
}

export type CustomerCategoriesEnum = keyof typeof CustomerCategories
