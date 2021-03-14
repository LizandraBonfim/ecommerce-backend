import { IUser } from '@src/interfaces/user'
import mongoose, { Model, Document } from 'mongoose'

const schema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		password: { type: String, required: true },
		gender: { type: String, required: true },
		cellphone: { type: String, required: true },
		documentNumber: { type: String, required: true },
		email: { type: String, required: true },

		street: { type: String, required: false },
		neighborhood: { type: String, required: false },
		houseNumber: { type: String, required: false },
		city: { type: String, required: false },
		state: { type: String, required: false },
		payment: { type: String, required: false }, //undefined
		orders: { type: String, required: false }, //undefined
	},
	{
		toJSON: {
			transform: (_, ret): void => {
				;(ret.id = ret._id), delete ret._id, delete ret._v
			},
		},
	},
)

interface UserModel extends Omit<IUser, '_id'>, Document {}
export const User: Model<UserModel> = mongoose.model('User', schema)
