import { IOrder, PaymentType } from '@src/interfaces/order'
import { IMongoosePaginate, MongoDocument } from '@src/services/paginate'
import mongoose, { Schema, Document, Model, model } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
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
	quota: { type: Number, required: true, default: 1 },
	interest: { type: Number, required: true, default: 0 },
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
		status: { type: String, required: false, default: 'PENDING' },
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
schema.plugin(mongoosePaginate)

interface OrderModel extends Omit<IOrder, '_id'>, Document {}
export const Order: Model<OrderModel> = mongoose.model('Order', schema)

type OrderModelWithPagination = Model<MongoDocument<OrderModel>, {}> &
	IMongoosePaginate<IOrder>

const orderPag = model<MongoDocument<OrderModel>>(
	'Order',
	schema,
	'order',
) as OrderModelWithPagination

export default orderPag

module.exports = model('Order', schema)
