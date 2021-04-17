import { Controller, Middleware, Post } from '@overnightjs/core'
import { authMiddleware } from '@src/middlewares/auth'
import { PaymentService } from '@src/services/paymentService'
import { UsersServices } from '@src/services/usersServices'
import { Response, Request } from 'express'

@Controller('payment')
export class PaymentController {
	@Post('')
	@Middleware(authMiddleware)
	public async create(req: Request, res: Response): Promise<Request | any> {
		try {
			const {
				creditCardNumber,
				cvc,
				nameHolder,
				documentNumberHolder,
				dueDate,
				password,
				flag,
				isHead,
			} = req.body
			const userId = req.context?.userId as string

			const newPayment = await PaymentService.create({
				creditCardNumber,
				cvc,
				nameHolder,
				documentNumberHolder,
				dueDate,
				password,
				flag,
			})

			if (isHead) {
				await UsersServices.createPaymentHead(userId, newPayment.id)
			} else {
				await UsersServices.createPayment(newPayment.id)
			}

			res.status(201).send(newPayment)
		} catch (error) {
			res.status(400).json({
				code: 400,
				error: error.message,
			})
		}
	}
}
