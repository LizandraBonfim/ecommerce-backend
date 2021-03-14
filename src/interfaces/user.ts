export interface IUser {
	_id?: string
	name: string
	password: string
	gender: GenderEnum
	cellphone: string
	documentNumber: string
	email: string

	street: string
	neighborhood: string
	houseNumber: string
	city: string
	state: string
	payment: string //undefined
	orders: string //undefined
}

export enum GenderEnum {
	FEMININO = 'FEMININO',
	MASCULINO = 'MASCULINO',
	'Não informar' = 'Não informar',
}
