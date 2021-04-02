import { StormGlass } from '@src/clients/stormGlass'
import { IAddress } from '@src/interfaces/address'
import { Order } from '@src/interfaces/order'
import { IUser } from '@src/interfaces/user'
import { User } from '@src/models/users'

export class ProductsServices {
	

	public static async addUserCreatedProduct(userId: string, addressId: IAddress) {
		// if (!addressId) return
		// await User.findByIdAndUpdate(
		// 	{ _id: userId },
		// 	{ $set: { address: addressId } },
		// )
	}
}
