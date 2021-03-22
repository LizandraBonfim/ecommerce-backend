import { Controller, Post } from '@overnightjs/core'
import { IProduct } from '@src/interfaces/product'
import { Product } from '@src/models/products'
import { Request, Response } from 'express'
import { BaseController } from '.'

@Controller('products')
export class ProductsController extends BaseController {
	@Post('')
	public async create(req: Request, res: Response): Promise<void> {
		try {
			const product : IProduct = req.body

            const newProduct = new Product(product)

            const result = await newProduct.save()

			res.status(201).send(result)
		} catch (error) {
			res.status(error.status).json(error)

        }
	}
}
