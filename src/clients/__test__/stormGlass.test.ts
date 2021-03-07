import { StormGlass } from '@src/clients/stormGlass'
import axios from 'axios'

jest.mock('axios')
describe('StormGlass client', () => {
	it('should return the normalized users from the StormGlass service', async () => {
		axios.get = jest.fn().mockResolvedValue({})
		const stormGlass = new StormGlass(axios)
		const response = await stormGlass.fetchPoints()
		expect(response).toEqual({})
	})
})
