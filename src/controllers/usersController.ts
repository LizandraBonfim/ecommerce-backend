import { Controller, Get, Post } from '@overnightjs/core'
import { User } from '@src/models/users'
import { TEXT_GERAL } from '@src/util/textGeral'
import { Request, Response } from 'express'
import AuthService from '@src/services/auth'

import { validateFields } from '@src/util/validator'
import { BaseController } from '.'
@Controller('users')
export class UsersController extends BaseController {
	@Post('')
	public async create(req: Request, res: Response): Promise<void> {
		try {
			const user = req.body

			const validate = validateFields(user)

			const userExists = await User.findOne({
				email: user.email,
				documentNumber: user.documentNumber,
			})

			if (userExists) {
				throw {
					code: 409,
					message: TEXT_GERAL.USER_EXISTS,
				}
			}

			const newUser = new User(validate)

			const result = await newUser.save()

			res.status(201).send(result)
		} catch (error) {
			this.sendCreateUpdateErrorResponse(res, error)
		}
	}

	@Post('auth')
	//middleware
	public async authenticate(req: Request, res: Response): Promise<void> {
		const { email, password } = req.body

		const userExists = await User.findOne({
			email,
		})

		if (!userExists) {
			throw {
				code: 402,
				message: TEXT_GERAL.USER_NOT_FOUND,
			}
		}

		const hashPassword = await AuthService.hashPassword(password)

		res.send()
	}
}
