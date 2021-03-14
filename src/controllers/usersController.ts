import { Controller, Get, Post } from '@overnightjs/core'
import { User } from '@src/models/users'
import { TEXT_GERAL } from '@src/util/textGeral'
import { Request, Response } from 'express'
import AuthService from '@src/services/auth'
@Controller('users')
export class UsersController {
	@Post('')
	public async create(req: Request, res: Response): Promise<void> {
		try {
			const user = req.body

			// const fieldsValidate =
			const userExists = await User.findOne({
				email: user.email,
				documentNumber: user.documentNumber,
			})

			if (userExists) {
				throw {
					code: 402,
					message: TEXT_GERAL.USER_EXISTS,
				}
			}
			const hashPassword = await AuthService.hashPassword(req.body.password)

			const newUser = new User({ ...user, password: hashPassword })

			const result = await newUser.save()

			res.status(201).send(result)
		} catch (error) {
			res.status(error.code).json(error)
		}
	}

	@Get('auth')
	//middleware
	public async authenticate(req: Request, res: Response): Promise<void> {
		const { email, password } = req.body

		const userExists = await User.findOne({
			email,
		})

		if (userExists) {
			throw {
				code: 402,
				message: TEXT_GERAL.USER_EXISTS,
			}
		}

		res.send()
	}
}
