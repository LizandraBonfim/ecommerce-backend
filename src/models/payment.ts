import mongoose, { Model, Document } from 'mongoose'
import { IPayment } from '@src/interfaces/payment'
import { PaymentService } from '@src/services/paymentService'
import logger from '@src/logger'

const schema = new mongoose.Schema(
	{
		creditCardNumber: { type: String, required: true },
		cvc: { type: String, required: true },
		nameHolder: { type: String, required: true },
		documentNumberHolder: { type: String, required: true },
		dueDate: { type: Date, required: true },
		password: { type: String, required: true },
		flag: { type: String, required: true },
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

schema.pre<PaymentModel>('save', async function (): Promise<void> {
	if (
		!this.creditCardNumber ||
		(!this.isModified('creditCardNumber') && !this.cvc) ||
		(!this.isModified('cvc') && !this.password) ||
		!this.isModified('password')
	) {
		return
	}

	try {
		const hashedCreditCardNumber = await PaymentService.hash(
			this.creditCardNumber,
		)
		const hashedCvc = await PaymentService.hash(this.cvc)
		const hashedCPassword = await PaymentService.hash(this.password)
		this.creditCardNumber = hashedCreditCardNumber
		this.cvc = hashedCvc
		this.password = hashedCPassword
	} catch (err) {
		logger.error(`Error hashing the data of card ${err}`)
	}
})

interface PaymentModel extends Omit<IPayment, '_id'>, Document {}
export const Payment: Model<PaymentModel> = mongoose.model('Payment', schema)
