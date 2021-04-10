import { Request, Response } from 'express'
import {
	Controller,
	Middleware,
	Post,
	Get,
	Delete,
	Put,
} from '@overnightjs/core'
import { IProduct } from '@src/interfaces/product'
import { Product } from '@src/models/products'
import { BaseController } from '.'
import { UsersServices } from '@src/services/usersServices'
import { authMiddlewareAdmin } from '@src/middlewares/authAdmin'
import { authMiddleware } from '@src/middlewares/auth'
import { ProductsServices } from '@src/services/productsServices'
import { TEXT_GERAL } from '@src/util/textGeral'

@Controller('products')
export class ProductsController extends BaseController {
	@Post('')
	@Middleware(authMiddlewareAdmin)
	public async create(req: Request, res: Response): Promise<Response | any> {
		try {
			const userId = req.context?.userId

			const userExists = await UsersServices.getUser('', '', userId)

			let product: IProduct = req.body
			product.createdByUser = userExists.id

			const newProduct = new Product(product)

			await newProduct.save()

			res.status(201).json({
				code: 201,
				message: TEXT_GERAL.PRODUCT_CREATE,
			})
		} catch (error) {
			res.status(401).json({ code: 401, error: error.message })
		}
	}

	@Get('detail/:productId')
	// @Middleware(authMiddleware)
	public async getProduct(
		req: Request,
		res: Response,
	): Promise<Response | any> {
		try {
			const { productId } = req.params

			const product = await ProductsServices.getProduct(productId)
			res.status(200).json(product)
		} catch (error) {
			res.status(401).json({ code: 401, error: error.message })
		}
	}

	@Delete('delete/:productId')
	@Middleware(authMiddlewareAdmin)
	public async delProduct(
		req: Request,
		res: Response,
	): Promise<Response | any> {
		try {
			const { productId } = req.params

			await ProductsServices.deleteProduct(productId)
			res.status(200).json({
				code: 200,
				message: TEXT_GERAL.PRODUCT_DELETE,
			})
		} catch (error) {
			res.status(401).json({ code: 401, error: error.message })
		}
	}

	@Put('update/:productId')
	@Middleware(authMiddlewareAdmin)
	public async updateProduct(
		req: Request,
		res: Response,
	): Promise<Response | any> {
		try {
			const {
				name,
				description,
				photo,
				price,
				stock,
				weight,
				height,
				width,
				length,
				variety,
			}: IProduct = req.body
			const { productId } = req.params

			await ProductsServices.updateProduct(
				productId,
				name,
				description,
				photo,
				price,
				stock,
				weight,
				height,
				width,
				length,
				variety,
			)

			res.status(200).json({
				code: 200,
				message: TEXT_GERAL.PRODUCT_UPDATE,
			})
		} catch (error) {
			res.status(401).json({ code: 401, error: error.message })
		}
	}

	@Get('list')
	public async listProduct(
		req: Request,
		res: Response,
	): Promise<Response | any> {
		try {
			const {
				page,
			}: {
				page: number
			} = req.body
			const productList = await ProductsServices.listProduct(page)

			console.log({ productList })
			res.status(200).send(productList)
		} catch (error) {
			res.status(500).json({ code: 500, error: error.message })
		}
	}
}
