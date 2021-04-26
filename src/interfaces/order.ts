import { Types } from 'mongoose'
import { IAddress } from './address'

export interface IOrder {
	total: number
	itemsProducts: ItemsOrder[]
	clientId: Types.ObjectId
	addressId: Types.ObjectId
	dateDelivery: Date
	payment: Payment
	status: OrderStatusEnum
}

export enum OrderStatusEnum {
	PENDING = 'PENDING',
	CANCELED = 'CANCELED',
	APPROVED = 'APPROVED',
	RECUSED = 'RECUSED',
	DELIVERED = 'DELIVERED',
	CARRIER = 'CARRIER',
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
