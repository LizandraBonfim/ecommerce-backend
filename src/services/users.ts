import { StormGlass } from '@src/clients/stormGlass'
import { Order } from '@src/interfaces/order'


export class Users {
	constructor(protected user = new StormGlass()) {}

	public async processUserForOrders(orders: Order[]): Promise<Order[]> {
		const order = []
		for (const index of orders) {
		}

        return orders
	}
}
