import { Controller, Get, Middleware, Post } from '@overnightjs/core'
import { User } from '@src/models/users'
import { TEXT_GERAL } from '@src/util/textGeral'
import { Request, Response } from 'express'
import AuthService from '@src/services/auth'

import { validateFields } from '@src/util/validator'
import { BaseController } from '.'
import { IUser } from '@src/interfaces/user'
import { authMiddleware } from '@src/middlewares/auth'
import { IAddress } from '@src/interfaces/address'
import { Address } from '@src/models/address'
import { UsersServices } from '../services/usersServices'
@Controller('users')
export class UsersController extends BaseController {
	@Post('')
	public async create(req: Request, res: Response): Promise<Response | any> {
		try {
			const user: IUser = req.body

			const validate = validateFields(user)

			const userExists = await User.findOne({
				email: validate.email,
				documentNumber: validate.documentNumber,
			})

			if (userExists) {
				throw {
					code: 400,
					message: TEXT_GERAL.USER_EXISTS,
				}
			}

			const newUser = new User(validate)

			const result = await newUser.save()

			res.status(201).send(result)
		} catch (error) {
			// this.sendCreateUpdateErrorResponse(res, error)
			res.status(400).json({ code: 400, error: error.message })
		}
	}

	@Post('auth')
	public async authenticate(
		req: Request,
		res: Response,
	): Promise<Response | any> {
		try {
			const { email, password } = req.body

			console.log('email, password', email, password)

			const userExists = await UsersServices.getUser(email)

			if (!(await AuthService.comparePassword(password, userExists.password))) {
				return res.status(402).send({
					code: 402,
					error: TEXT_GERAL.PASSWORD_NOT_MATCH,
				})
			}

			const token = AuthService.generateToken(userExists._id)

			console.log({ token })
			return res.send({ ...userExists.toJSON(), ...{ token } })
		} catch (error) {
			// this.sendCreateUpdateErrorResponse(res, error)
			res.status(400).json({ code: 400, error: error.message })
		}
	}

	@Get('me')
	@Middleware(authMiddleware)
	public async myProfile(req: Request, res: Response): Promise<Response | any> {
		try {
			const userId = req.context?.userId
			const userExists = await UsersServices.getUser('', '', userId)

			res.send(userExists)
		} catch (err) {
			res.status(400).json({
				code: 400,
				error: TEXT_GERAL.NOT_AUTHORIZATION,
			})
		}
	}

	@Post('address')
	@Middleware(authMiddleware)
	public async addAddress(
		req: Request,
		res: Response,
	): Promise<Response | any> {
		try {
			const userId = req.context?.userId

			const userExists = await UsersServices.getUser('', '', userId)

			const address: IAddress = req.body

			const newAddress = new Address(address)
			const sendAdress = await newAddress.save()

			await UsersServices.addAddressId(userExists.id, sendAdress.id)

			res.status(201).send({
				message: TEXT_GERAL.ADDRESS_SEND,
			})
		} catch (error) {
			res.status(401).json({
				code: 401,
				error: TEXT_GERAL.ADDRESS_NOT_SEND,
			})
		}
	}

	@Post('deleteMyAccount')
	@Middleware(authMiddleware)
	public async deleteMyAccount(
		req: Request,
		res: Response,
	): Promise<Response | any> {
		try {
			const userId = req.context?.userId

			if (!userId) return

			await UsersServices.deleteMyAccount(userId)

			res.status(200).send({
				code: 200,
				message: TEXT_GERAL.USER_DELETE_MY_ACCOUNT,
			})
		} catch (error) {
			res.status(400).json({
				code: 400,
				error: TEXT_GERAL.ADDRESS_NOT_SEND,
			})
		}
	}
}
