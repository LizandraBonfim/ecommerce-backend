import { IAddress } from './address'

export interface IOrder {
	total: number
	itemsProducts: ItemsOrder[]
	clientId: string
	addressId: IAddress
	dateDelivery: Date
	payment: Payment
	status: OrderStatusEnum
}

export enum OrderStatusEnum {
	ACTIVE = 'ACTIVE',
	INACTIVE = 'INACTIVE',
}

export interface ItemsOrder {
	idProduct: string
	quantity: number
	price: number
}

export interface Payment {
	paymentType: PaymentType
	quota: number
	interest: number
}

export enum PaymentType {
	CARTAO = 'CARTAO',
	BOLETO = 'BOLETO',
}
