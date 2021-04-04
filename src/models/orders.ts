import { IOrder } from '@src/interfaces/order'
import mongoose, { Schema, Document, Model } from 'mongoose'

const schema = new mongoose.Schema(
	{
		price: { type: Number, required: true },
		productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
		userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		deliveryAddress: {
			type: Schema.Types.ObjectId,
			ref: 'Address',
			required: true,
		},
		quantity: { type: Number, required: true },
		status: { type: String, required: false, default: 'ACTIVE' },
		dateDelivery: { type: Date, required: true },
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

interface OrderModel extends Omit<IOrder, '_id'>, Document {}
export const Order: Model<OrderModel> = mongoose.model('Order', schema)
