import { Controller, Get, Post } from '@overnightjs/core'
import { User } from '@src/models/users'
import { TEXT_GERAL } from '@src/util/textGeral'
import { Request, Response } from 'express'

@Controller('users')
export class UsersController {
	@Post('')
	public async create(req: Request, res: Response): Promise<void> {
		try {
			console.log('req.body', req.body)
			const user = new User(req.body)
			// const test = {
			// 	name: 'Julia',
			// 	password: 'Portal123!',
			// 	gender: 'Feminino',
			// 	cellphone: '11966596795',
			// 	documentNumber: '222080164',
			// 	email: 'julia@email.com',
			// }

			const userExists = User.findOne({ email: user.email })

			if (!!userExists) {
				throw {
					code: 402,
					message: TEXT_GERAL.USER_EXISTS,
				}
			}
			const result = await user.save()

			res.status(201).send(result)
		} catch (error) {
			res.status(error.code).json(error.message)
		}
	}

	@Get('')
	public listUserById(req: Request, res: Response): void {
		res.send([
			{
				name: 'Julia',
				password: 'Portal123!',
				gender: 'Feminino',
				cellphone: '11966596795',
				documentNumber: '222080164',
				email: 'julia@email.com',
			},
		])
	}
}
