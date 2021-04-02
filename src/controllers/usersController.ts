import { Controller, Get, Middleware, Post } from '@overnightjs/core'
import { User } from '@src/models/users'
import { TEXT_GERAL } from '@src/util/textGeral'
import { Request, Response } from 'express'
import AuthService from '@src/services/auth'

import { validateFields } from '@src/util/validator'
import { BaseController } from '.'
import { IUser } from '@src/interfaces/user'
import { authMiddleware } from '@src/middlewares/auth'
@Controller('users')
export class UsersController extends BaseController {
	@Post('')
	public async create(req: Request, res: Response): Promise<Response | any> {
		try {
			const user: IUser = req.body

			const userExists = await User.findOne({
				email: user.email,
				documentNumber: user.documentNumber,
			})

			console.log('userExists', userExists)
			if (userExists) {
				return res.status(402).send({
					code: 402,
					error: TEXT_GERAL.USER_EXISTS,
				})
			}

			const validate = validateFields(user)

			const newUser = new User(validate)

			const result = await newUser.save()

			res.status(201).send(result)
		} catch (error) {
			this.sendCreateUpdateErrorResponse(res, error)
		}
	}

	@Post('auth')
	public async authenticate(
		req: Request,
		res: Response,
	): Promise<Response | any> {
		try {
			const { email, password } = req.body

			const userExists = await User.findOne({
				email,
			})

			if (!userExists) {
				return res.status(402).send({
					code: 402,
					error: TEXT_GERAL.USER_NOT_FOUND,
				})
			}

			if (!(await AuthService.comparePassword(password, userExists.password))) {
				return res.status(402).send({
					code: 409,
					error: TEXT_GERAL.PASSWORD_NOT_MATCH,
				})
			}

			const token = AuthService.generateToken(userExists.toJSON())

			console.log({ token })

			res.status(201).send({ token })
		} catch (error) {
			this.sendCreateUpdateErrorResponse(res, error)
		}
	}

	@Get('me')
	@Middleware(authMiddleware)
	public async myProfile(req: Request, res: Response): Promise<Response | any> {
		const email = req.decoded ? req.decoded.email : undefined
		const userExists = await User.findOne({
			email,
		})

		if (!userExists) {
			return res.status(402).send({
				code: 402,
				error: TEXT_GERAL.USER_NOT_FOUND,
			})
		}

		return res.send({ userExists })
	}
}
