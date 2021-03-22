import { User } from '@src/models/users'
import AuthService from '@src/services/auth'
import { checkPassword } from '@src/util/validator'

describe('Create Account functional tests', () => {
	// beforeEach(async () => {
	// 	await User.deleteMany({})
	// })

	describe('When creating a new user', () => {
		it('should create a account for user', async () => {
			const newUser = {
				name: 'Julia',
				password: 'Portal123!',
				gender: 'FEMINIMO',
				cellphone: '11966596795',
				documentNumber: '27305187039',
				email: 'jeeeuliaddd3@email.com',
			}

			const response = await global.testRequest.post('/users').send(newUser)

			console.log('response', response)
			expect(response.status).toBe(201)
			await expect(
				AuthService.comparePassword(newUser.password, response.body.password),
			).resolves.toBeTruthy()
			expect(response.body).toEqual(
				expect.objectContaining({
					...newUser,
					...{ password: expect.any(String) },
				}),
			)
		})

		it('should return error if email already exists', async () => {
			const newUser = {
				name: 'Julia',
				password: 'Portal123!',
				gender: 'FEMINIMO',
				cellphone: '11966596795',
				documentNumber: '89075199007',
				email: 'julia3@email.com',
			}

			await global.testRequest.post('/users').send(newUser)
			const response = await global.testRequest.post('/users').send(newUser)

			expect(response.status).toBe(409)
			expect(response.body).toEqual({
				code: 409,
				error:
					'User validation failed: email: command aggregate requires authentication',
			})
		})
	})
})
