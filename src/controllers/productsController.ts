import { Request, Response } from 'express'
import { Controller, Middleware, Post } from '@overnightjs/core'
import { IProduct } from '@src/interfaces/product'
import { Product } from '@src/models/products'
import { BaseController } from '.'
import { UsersServices } from '@src/services/usersServices'
import { authMiddlewareAdmin } from '@src/middlewares/authAdmin'

@Controller('products')
export class ProductsController extends BaseController {
	@Post('')
	@Middleware(authMiddlewareAdmin)
	public async create(req: Request, res: Response): Promise<Response | any> {
		try {
			const userId = req.context?.userId

			const userExists = await UsersServices.getUser('', '', userId)

			console.log('ProductsController', userExists)

			let product: IProduct = req.body
			product.createdByUser = userExists.id

			const newProduct = new Product(product)

			await newProduct.save()

			res.status(201).json({
				code: 401,
				error: 'Produto cadastrado com sucesso',
			})
		} catch (error) {
			res.status(401).json(error.message)
		}
	}
}
