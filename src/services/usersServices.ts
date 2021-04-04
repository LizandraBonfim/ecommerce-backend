import { StormGlass } from '@src/clients/stormGlass'
import { IAddress } from '@src/interfaces/address'
import { Order } from '@src/interfaces/order'
import { IUser } from '@src/interfaces/user'
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
			$or: [
				{ email: email ?? '' },
				{ documentNumber: documentNumber ?? '' },
				{ _id: mongoose.Types.ObjectId(userId) ?? '' },
			],
		})

		if (!userExists) {
			throw {
				code: 404,
				error: TEXT_GERAL.USER_NOT_FOUND,
			}
		}

		return userExists
	}

	public static async addAddressId(userId: string, addressId: IAddress) {
		if (!addressId) return
		await User.findByIdAndUpdate(
			{ _id: userId },
			{ $set: { address: addressId } },
		)
	}
}
