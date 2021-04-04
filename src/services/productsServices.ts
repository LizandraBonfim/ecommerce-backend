import { IAddress } from '@src/interfaces/address'
import { IVariety, ProductStatusEnum } from '@src/interfaces/product'
import { Product } from '@src/models/products'

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
}
