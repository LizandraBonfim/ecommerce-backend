import { StormGlass } from '@src/clients/stormGlass'
import { IAddress } from '@src/interfaces/address'
import { Order } from '@src/interfaces/order'
import { IUser } from '@src/interfaces/user'
import { User } from '@src/models/users'
import { TEXT_GERAL } from '@src/util/textGeral'
export class UsersServices {
	// constructor(protected user = new User()) {}

	// public async processUserForOrders(orders: Order[]): Promise<Order[]> {
	// 	const order = []
	// 	for (const index of orders) {
	// 	}

	// 	return orders
	// }

	public static async addAddressId(userId: string, addressId: IAddress) {
		if (!addressId) return
		await User.findByIdAndUpdate(
			{ _id: userId },
			{ $set: { address: addressId } },
		)
	}

	public static async getUser(email?: string, documentNumber?: string) {
		const userExists = await User.findOne({
			$or: [{ email }, { documentNumber }],
		})

		if (!userExists) {
			throw {
				code: 402,
				error: TEXT_GERAL.USER_NOT_FOUND,
			}
		}

		return userExists
	}
}
