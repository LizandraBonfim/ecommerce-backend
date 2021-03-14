import { StormGlass } from '@src/clients/stormGlass'
import { UsersController } from '@src/controllers/usersController'

jest.mock('@src/clients/stormGlass')
describe('Users Service', () => {
	it('should return if the user exist ', async () => {
		StormGlass.prototype.fetchPoints = jest.fn().mockResolvedValue({})
		const expectedResponse = {}

        const user = new UsersController()
		expect(expectedResponse).toBe({})
	})
})
