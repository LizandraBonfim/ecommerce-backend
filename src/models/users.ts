import mongoose, { Model, Document, Schema } from 'mongoose'
import { IUser } from '@src/interfaces/user'
import AuthService from '@src/services/auth'
import logger from '@src/logger'

export enum CUSTOM_VALIDATION {
	DUPLICATED = 'DUPLICATED',
}

const schema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		password: { type: String, required: true },
		gender: { type: String, required: true },
		cellphone: { type: String, required: true },
		documentNumber: {
			type: String,
			required: true,
			unique: [true, 'Document Number must be unique'],
		},
		email: {
			type: String,
			required: true,
			unique: [true, 'Email must be unique'],
		},
		rule: { type: String, required: true, default: 'CUSTOMER' },
		address: { type: Schema.Types.ObjectId, ref: 'Address', required: false },
		payment: { type: [Schema.Types.ObjectId], ref: 'Payment', required: false }, //undefined
		paymentHead: {
			type: Schema.Types.ObjectId,
			ref: 'Payment',
			required: false,
		},
		orders: { type: String, required: false }, //undefined
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

schema.pre<UserModel>('save', async function (): Promise<void> {
	if (!this.password || !this.isModified('password')) {
		return
	}

	try {
		const hashedPassword = await AuthService.hashPassword(this.password)
		this.password = hashedPassword
	} catch (err) {
		logger.error(`Error hashing the password for the user ${err}`)
	}
})

schema.path('email').validate(
	async (email: string) => {
		const emailCount = await mongoose.models.User.countDocuments({ email })
		return !emailCount
	},
	'already exists in the database.',
	CUSTOM_VALIDATION.DUPLICATED,
)

schema.path('documentNumber').validate(
	async (documentNumber: string) => {
		const document = await mongoose.models.User.countDocuments({
			documentNumber,
		})
		return !document
	},
	'already exists in the database.',
	CUSTOM_VALIDATION.DUPLICATED,
)

interface UserModel extends Omit<IUser, '_id'>, Document {}
export const User: Model<UserModel> = mongoose.model('User', schema)

// export default model<MongoDocument<IUser>>(
// 	'User',
// 	UserSchema,
// 	'users'
// ) as UserModelWithPagination
