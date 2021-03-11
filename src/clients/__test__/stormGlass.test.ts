import { StormGlass } from '@src/clients/stormGlass'
import * as HTTPUtil from '@src/util/request'

const data = {
	name: 'Julia',
	password: 'Portal123!',
	gender: 'Feminino',
	cellphone: '11966596795',
	documentNumber: '222080164',
	email: 'julia@email.com',
}
jest.mock('@src/util/request')
describe('StormGlass client', () => {
	const MochedRequestClass = HTTPUtil.Request as jest.Mocked<
		typeof HTTPUtil.Request
	>
	const mockedRequest = new HTTPUtil.Request() as jest.Mocked<HTTPUtil.Request>
	it('should return the normalized users from the StormGlass service', async () => {
		mockedRequest.get.mockResolvedValue({
			data: data,
		} as HTTPUtil.Response)
		const stormGlass = new StormGlass(mockedRequest)
		const response = await stormGlass.fetchPoints()
		expect(response).toEqual({})
	})
})
