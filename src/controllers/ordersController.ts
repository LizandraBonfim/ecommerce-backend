import { Controller, Post, Get, Middleware } from '@overnightjs/core'
import { authMiddleware } from '@src/middlewares/auth'
import { OrdersServices } from '@src/services/ordersServices'
import { TEXT_GERAL } from '@src/util/textGeral'
import { Request, Response } from 'express'

@Controller('orders')
export class OrdersController {
	@Post('')
	@Middleware(authMiddleware)
	public async create(req: Request, res: Response): Promise<Response | any> {
		try {
			const userId = req.context?.userId
			const order = req.body

			debugger

			const orderValidator = OrdersServices.validate({
				...order,
				clientId: userId,
			})

			const newOrder = await OrdersServices.create(orderValidator)

			console.log('newOrder', newOrder)

			res.status(201).send(newOrder)
		} catch (error) {
			res.status(402).json({ code: 402, error: error.message })
		}
	}

	@Post('cancel/:id')
	@Middleware(authMiddleware)
	public async cancel(req: Request, res: Response): Promise<Response | any> {
		try {
			const userId = req.context?.userId as string
			const { id } = req.params

			await OrdersServices.cancel(id, userId)

			res.status(201).json({
				code: 201,
				message: TEXT_GERAL.ORDER_CANCEL,
			})
		} catch (error) {
			res.status(404).json({ code: 404, error: error.message })
		}
	}

	@Get('history')
	@Middleware(authMiddleware)
	public async listOrderByUser(
		req: Request,
		res: Response,
	): Promise<Response | any> {
		try {
			const userId = req.context?.userId as string
			const {
				page,
			}: {
				page: number
			} = req.body

			const orders = await OrdersServices.listOrderByUser(userId, page)

			res.status(200).send(orders)
		} catch (error) {
			res.status(400).json({
				code: 400,
				error: TEXT_GERAL.ADDRESS_NOT_SEND,
			})
		}
	}
}
