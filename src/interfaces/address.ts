export interface IAddress {
	street: string
	neighborhood: string
	houseNumber: string
	city: string
	state: string
	zipCode: string
	status: AddressStatusEnum
}

export enum AddressStatusEnum {
	ACTIVE = 'ACTIVE',
	INACTIVE = 'INACTIVE',
}
