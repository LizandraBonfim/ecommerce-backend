import { IAddress } from '@src/interfaces/address'
import mongoose, { Model, Document } from 'mongoose'

const schema = new mongoose.Schema(
	{
		street: { type: String, required: true },
		numberHouse: { type: String, required: false },
		neighborhood: { type: String, required: true },
		city: { type: String, required: true },
		state: { type: String, required: true },
		zipCode: { type: String, required: true },
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
interface AddressModal extends Omit<IAddress, '_id'>, Document {}
export const Address: Model<AddressModal> = mongoose.model('Address', schema)
