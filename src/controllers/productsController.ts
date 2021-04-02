import { Request, Response } from 'express'
import { Controller, Middleware, Post } from '@overnightjs/core'
import { IProduct } from '@src/interfaces/product'
import { authMiddlewareAdmin } from '@src/middlewares/authAdmin'
import { Product } from '@src/models/products'
import { BaseController } from '.'
import { UsersServices } from '@src/services/usersServices'

@Controller('products')
export class ProductsController extends BaseController {
	@Post('')
	@Middleware(authMiddlewareAdmin)
	public async create(req: Request, res: Response): Promise<Response | any> {
		try {
			const email = req.decoded ? req.decoded.email : undefined

			const userExists = await UsersServices.getUser(email)

			let product: IProduct = req.body
			product.createdByUser = userExists.id

			const newProduct = new Product(product)

			const result = await newProduct.save()

			res.status(201).send(result)
		} catch (error) {
			res.status(401).json(error.message)
		}
	}
}
