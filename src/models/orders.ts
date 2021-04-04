import { IOrder, PaymentType } from '@src/interfaces/order'
import mongoose, { Schema, Document, Model } from 'mongoose'

const Product = {
	idProduct: {
		type: Schema.Types.ObjectId,
		ref: 'Product',
		required: true,
	},
	quantity: {
		type: Number,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
}

const Payment = {
	paymentType: {
		type: PaymentType,
		required: true,
	},
	quota: { type: Number, required: true },
	interest: { type: Number, required: true },
}

const schema = new mongoose.Schema(
	{
		total: { type: Number, required: true },
		itemsProducts: { type: [Product], required: true },
		clientId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		addressId: {
			type: Schema.Types.ObjectId,
			ref: 'Address',
			required: true,
		},
		dateDelivery: { type: Date, required: true },
		payment: { type: Payment, required: true },
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

interface OrderModel extends Omit<IOrder, '_id'>, Document {}
export const Order: Model<OrderModel> = mongoose.model('Order', schema)
