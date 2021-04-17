import { IAddress } from '@src/interfaces/address'
import { IUser, UserStatusEnum } from '@src/interfaces/user'
import { User } from '@src/models/users'
import { TEXT_GERAL } from '@src/util/textGeral'
import mongoose from 'mongoose'
export class UsersServices {
	// constructor(protected user = new User()) {}

	// public async processUserForOrders(orders: Order[]): Promise<Order[]> {
	// 	const order = []
	// 	for (const index of orders) {
	// 	}

	// 	return orders
	// }

	public static async getUser(
		email?: string,
		documentNumber?: string,
		userId?: string,
	) {
		const userExists = await User.findOne({
			$and: [{ status: { $ne: UserStatusEnum.INACTIVE } }],
			$or: [
				{ email: email ?? '' },
				{ documentNumber: documentNumber ?? '' },
				{ _id: mongoose.Types.ObjectId(userId) ?? '' },
			],
		})

		if (!userExists) {
			throw {
				code: 404,
				message: TEXT_GERAL.USER_NOT_FOUND,
			}
		}

		return userExists
	}

	public static async addAddressId(userId: string, addressId: IAddress) {
		await User.findByIdAndUpdate(
			{ _id: userId },
			{ $set: { address: addressId } },
		)
	}

	public static async deleteMyAccount(userId: string) {
		await User.findByIdAndUpdate(
			{ _id: userId },
			{ $set: { status: UserStatusEnum.INACTIVE } },
		)
	}

	public static async updateMyAccount(userId: string, user: IUser) {
		const newUser = await User.findByIdAndUpdate(
			{ _id: userId },
			{
				$set: {
					cellphone: user.cellphone,
					email: user.email,
					name: user.name,
					password: user.password,
				},
			},
		)

		return newUser
	}

	public static async createPayment(paymentHead: string) {
		const newPayment = User.updateOne({ payment: paymentHead })

		return newPayment
	}

	public static async createPaymentHead(userId: string, paymentId: string) {
		await User.updateOne({ paymentHead: paymentId })

		const paymentHistory = await User.findOne({
			_id: userId,
			payment: paymentId,
		})

		if (!paymentHistory) {
			await this.createPayment(paymentId)
		}
	}
}
