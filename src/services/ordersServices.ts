import { IOrder, OrderStatusEnum } from '@src/interfaces/order'
import orderPag, { Order } from '@src/models/orders'
import { TEXT_GERAL } from '@src/util/textGeral'
import { addDays, differenceInDays } from 'date-fns'
import mongoose from 'mongoose'

export class OrdersServices {
	public static validate(order: IOrder): IOrder {
		const total = !!Number(order.total)
		const addressId = !!order.addressId
		const payment = !!order.payment
		const itemsProducts = !!order.itemsProducts
		const clientId = !!order.clientId
		const date = (order.dateDelivery = addDays(new Date(), 10))

		const validationResult = {
			total,
			addressId,
			itemsProducts,
			payment,
			clientId,
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
		console.log('order', order)

		const newOrder = new Order(order)

		const orderNew = await newOrder.save()

		console.log('orderrerere', order)
		if (!orderNew)
			throw {
				code: 402,
				message: 'Ocorreu um erro',
			}

		return orderNew
	}

	public static async cancel(id: string, userId: string) {
		const order = await Order.updateOne(
			{
				$and: [
					{ _id: id },
					{ status: OrderStatusEnum.PENDING },
					{ clientId: userId },
				],
			},
			{ status: OrderStatusEnum.CANCELED },
			{ new: true },
		)

		console.log('order', order)

		if (!order)
			throw {
				code: 404,
				message: TEXT_GERAL.ORDER_NOT_CANCEL,
			}

		return order
	}

	public static async listOrderByUser(userId: string, page: number) {
		const options = { page: page, limit: 10, lean: true }

		const counterPage = await orderPag.paginate(
			{
				clientId: userId,
			},
			options,
		)

		return counterPage
	}
}
