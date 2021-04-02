import { Request, Response } from 'express'
import { Controller, Middleware, Post } from '@overnightjs/core'
import { IProduct } from '@src/interfaces/product'
import { authMiddlewareAdmin } from '@src/middlewares/authAdmin'
import { Product } from '@src/models/products'
import { BaseController } from '.'

@Controller('products')
export class ProductsController extends BaseController {
	@Post('')
	@Middleware(authMiddlewareAdmin)
	public async create(req: Request, res: Response): Promise<Response | any> {
		try {
			const product: IProduct = req.body

			const newProduct = new Product(product)

			const result = await newProduct.save()

			res.status(201).send(result)
		} catch (error) {
			res.status(401).json(error.message)
		}
	}
}
