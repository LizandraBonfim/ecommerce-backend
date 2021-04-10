import { IAddress } from '@src/interfaces/address'
import productPag, { Product } from '@src/models/products'
import { IVariety, ProductStatusEnum } from '@src/interfaces/product'

import { TEXT_GERAL } from '@src/util/textGeral'
import mongoose from 'mongoose'

export class ProductsServices {
	public static async addUserCreatedProduct(
		userId: string,
		addressId: IAddress,
	) {
		// if (!addressId) return
		// await User.findByIdAndUpdate(
		// 	{ _id: userId },
		// 	{ $set: { address: addressId } },
		// )
	}

	public static async getProduct(id: string) {
		const product = await Product.findById({
			_id: mongoose.Types.ObjectId(id),
		})

		if (!product) {
			throw {
				code: 404,
				error: TEXT_GERAL.PRODUCT_NOT_FOUND,
			}
		}

		return product
	}

	public static async deleteProduct(id: string) {
		const product = await Product.updateOne(
			{
				_id: id,
			},
			{
				status: ProductStatusEnum.INACTIVE,
			},
		)

		if (!product) {
			throw {
				code: 404,
				error: TEXT_GERAL.PRODUCT_NOT_FOUND,
			}
		}

		return product
	}

	public static async updateProduct(
		id: string,
		name?: string,
		description?: string,
		photo?: string[],
		price?: number,
		stock?: number,
		weight?: number,
		height?: number,
		width?: number,
		length?: number,
		variety?: IVariety[],
	) {
		const product = await Product.updateOne(
			{ _id: id },
			{
				$set: {
					name,
					description,
					photo,
					price,
					stock,
					weight,
					height,
					width,
					length,
					variety: variety?.length ? variety : [],
				},
			},
			{ new: true, rawResult: true },
		)

		if (!product) {
			throw {
				code: 404,
				error: TEXT_GERAL.PRODUCT_UPDATE,
			}
		}

		return product
	}

	public static async listProduct(page: number) {
		const options = { page: page, limit: 10, lean: true }

		console.log('options', options)

		const products = await productPag.paginate(
			{
				status: 'ACTIVE',
			},
			options,
		)

		if (!products) {
			throw {
				code: 500,
				error: 'Erro no servidor',
			}
		}

		console.log('products', products)
		return products
	}
}
