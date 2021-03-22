import { IUser } from '@src/interfaces/user'
import AuthService from '@src/services/auth'
import mongoose, { Model, Document } from 'mongoose'

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
schema.set('timestamps', true)

schema.pre<UserModel>('save', async function (): Promise<void> {
	if (!this.password || !this.isModified('password')) {
		return
	}

	try {
		const hashedPassword = await AuthService.hashPassword(this.password)
		this.password = hashedPassword
	} catch (err) {
		console.error(`Error hashing the password for the user ${err}`)
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

interface UserModel extends Omit<IUser, '_id'>, Document {}
export const User: Model<UserModel> = mongoose.model('User', schema)
