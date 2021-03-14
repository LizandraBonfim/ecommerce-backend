import { Controller, Get, Post } from '@overnightjs/core'
import { User } from '@src/models/users'
import { Request, Response } from 'express'

@Controller('users')
export class UsersController {
	@Post('')
	public async create(req: Request, res: Response): Promise<void> {
		const user = new User(req.body)

		// const test = {
		// 	name: 'Julia',
		// 	password: 'Portal123!',
		// 	gender: 'Feminino',
		// 	cellphone: '11966596795',
		// 	documentNumber: '222080164',
		// 	email: 'julia@email.com',
		// }

		const result = await user.save()

		res.status(201).send(result)
	}

	@Get('')
	public listUserController(_: Request, res: Response): void {
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
