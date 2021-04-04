import { IAddress } from './address'

export interface IUser {
	_id?: string
	name: string
	password: string
	gender: GenderEnum
	cellphone: string
	documentNumber: string
	email: string

	payment?: string //undefined
	orders?: string //undefined
	rule: CustomerRuleEnum
	address?: IAddress
	status: UserStatusEnum
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

export enum RuleCustomerEnum {
	ADMIN,
	CUSTOMER,
}

enum GenderCustomer {
	'FEMININO',
	'MASCULINO',
}

export enum UserStatusEnum {
	ACTIVE = 'ACTIVE',
	INACTIVE = 'INACTIVE',
}

export type CustomerGenderEnum = keyof typeof GenderCustomer
export type CustomerRuleEnum = keyof typeof RuleCustomerEnum
