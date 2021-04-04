import { IProduct } from '@src/interfaces/product'
import mongoose, { Model, Document, Schema } from 'mongoose'

const schema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		description: { type: String, required: true },
		photo: { type: String, required: true },
		price: { type: Number, required: true },
		stock: { type: Number, required: true },
		weight: { type: Number, required: true },
		height: { type: Number, required: true },
		length: { type: Number, required: true },
		width: { type: Number, required: true },
		variety: { type: Array, required: false },
		createdByUser: { type: Schema.Types.ObjectId, ref: 'User', required: false },
		status: { type: String, required: false, default: 'ACTIVE' },

	},
	{
		toJSON: {
			transform: (_, ret): void => {
				;(ret.id = ret._id), delete ret._id, delete ret._v
			},
		},
	},
)
schema.set('timestamps', true)
interface ProductModel extends Omit<IProduct, '_id'>, Document {}
export const Product: Model<ProductModel> = mongoose.model('Product', schema)
