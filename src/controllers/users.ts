import { Controller, Get, Post } from '@overnightjs/core'
import { Request, Response } from 'express'

@Controller('users')
export class UsersController {

	@Post('')
	public createUserController(_: Request, res: Response): void {
		res.send({
			name: 'Julia',
			password: 'Portal123!',
			gender: 'Feminino',
			cellphone: '11966596795',
			documentNumber: '222080164',
			email: 'julia@email.com',
		})
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
