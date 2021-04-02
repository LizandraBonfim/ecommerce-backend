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
	role: CustomerRoleEnum
}

export interface CreateNewUser {
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

export enum RoleCustomerEnum {
	ADMIN,
	CUSTOMER
}

enum GenderCustomer {
	'FEMININO',
	'MASCULINO',
}

export type CustomerGenderEnum = keyof typeof GenderCustomer
export type CustomerRoleEnum = keyof typeof RoleCustomerEnum
