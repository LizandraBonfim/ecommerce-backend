import { IAddress } from './address'
import { IProduct } from './product'

export interface IOrder {
	price: number
	productId: IProduct[]
	userId: string
	deliveryAddress: IAddress
	quantity: number
	status: OrderStatusEnum
	dateDelivery: Date
}

export enum OrderStatusEnum {
	ACTIVE = 'ACTIVE',
	INACTIVE = 'INACTIVE',
}
