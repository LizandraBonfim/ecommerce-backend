import { IPayment } from '@src/interfaces/payment'
import { Payment } from '@src/models/payment'
import bcrypt from 'bcrypt'
export class PaymentService {
	public static async hash(data: string, salt = 10): Promise<string> {
		return await bcrypt.hash(data, salt)
	}

	public static async compare(
		data: string,
		hashData: string,
	): Promise<boolean> {
		return await bcrypt.compare(data, hashData)
	}

	public static async create(card: IPayment) {
		const payment = await Payment.create({
			creditCardNumber: card.creditCardNumber,
			cvc: card.cvc,
			nameHolder: card.nameHolder,
			documentNumberHolder: card.documentNumberHolder,
			dueDate: card.dueDate,
			password: card.password,
			flag: card.flag,
		})

		await payment.save()

		return payment
	}
}
