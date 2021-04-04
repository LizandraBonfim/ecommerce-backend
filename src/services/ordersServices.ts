import { IOrder } from '@src/interfaces/order'
import { Order } from '@src/models/orders'
import { differenceInDays } from 'date-fns'

export class OrdersServices {
	public static validate(order: IOrder): IOrder {
		const price = !!Number(order.price)
		const deliveryAddress = !!order.deliveryAddress
		const quantity = !!Number(order.quantity)
		const productId = !!order.productId
		const userId = !!order.userId
		const date =
			differenceInDays(new Date(order.dateDelivery), new Date()) > 0
				? true
				: false

		const validationResult = {
			price,
			deliveryAddress,
			productId,
			quantity,
			userId,
			date,
		} as any

		const keys = Object.keys(validationResult)

		const values = keys
			.map((x) => ({ [x]: validationResult[x] }))
			.filter((obj, index) => obj[keys[index]] === false)

		const orderNew = values.map((e) => Object.keys(e)).join(' , ')

		if (values.length > 0) {
			throw {
				code: 400,
				message: `Erro no formato da requisição: ${orderNew}`,
			}
		}

		return order
	}
	public static async create(order: IOrder) {
		const newOrder = new Order(order)
		const orderNew = await newOrder.save()

		console.log('order', order)
		if (!orderNew)
			throw {
				code: 402,
				message: 'Ocorreu um erro',
			}

		return orderNew
	}
}
