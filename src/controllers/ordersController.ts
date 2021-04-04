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

			const orderValidator = OrdersServices.validate({ ...order, userId })

			await OrdersServices.create(orderValidator)

			res.status(201).send({
				code: 201,
				message: TEXT_GERAL.ORDER_CREATE,
			})
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

			res.status(201).send({
				code: 201,
				message: TEXT_GERAL.ORDER_CANCEL,
			})
		} catch (error) {
			res.status(402).json({ code: 402, error: error.message })
		}
	}
}
