import { Response, Request } from 'express'
import { Controller, Middleware, Post } from '@overnightjs/core'
import { authMiddleware } from '@src/middlewares/auth'
import { EvaluationService } from '@src/services/evaluationService'
import { UsersServices } from '@src/services/usersServices'
import { checksForFalsyValue } from '@src/util/validator'
import { IEvaluation, StatusEvaluationEnum } from '@src/interfaces/evaluation'

@Controller('evaluations')
export class EvaluationsController {



	@Post('')
	@Middleware(authMiddleware)
	public async create(req: Request, res: Response) {
		try {
			const userId = req.context?.userId as string
			const {
				comment,
				image,
				evaluationValue,
				productId,
			}= req.body

			// checksForFalsyValue({
			// 	comment,
			// 	image,
			// 	evaluationValue,
			// 	productId,
			// 	userId,
			// })

			// await UsersServices.getUser('', '', userId)

			console.log('pre save', {
				comment
				
			});

			const evaluationNew = await EvaluationService.create({
				comment,
				evaluationValue,
				productId,
				userId,
			})

			res.status(201).send(evaluationNew)
		} catch (error) {

			console.log('errorrr', error)

			res.status(400).json({ code: 400, error: error.message, stack: error })
		}
	}
}
