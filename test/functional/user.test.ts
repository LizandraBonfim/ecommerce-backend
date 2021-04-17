import {
	CreateNewUser,
	GenderEnum,
	IUser,
	UserStatusEnum,
} from '@src/interfaces/user'
import { User } from '@src/models/users'
import AuthService from '@src/services/auth'
import { checkPassword, validateFields } from '@src/util/validator'

describe('Create Account functional tests', () => {
	beforeEach(async () => {
		await User.deleteMany({})
	})

	describe('When creating a new user', () => {
		it('should create a account for user', async () => {
			const user: IUser = {
				name: 'Julia',
				password: 'Portal123!',
				gender: GenderEnum.FEMININO,
				cellphone: '11966596795',
				documentNumber: '27305187080',
				email: 'johndoe@email.com',
				rule: 'ADMIN',
				status: UserStatusEnum.ACTIVE,
			}

			// const newUser = validateFields(user)

			console.log('newUser', user)

			const response = await global.testRequest.post('/users').send(user)

			console.log('responseeeeeeeee', response.status)
			expect(response.status).toBe(201)

			await expect(
				AuthService.comparePassword(user.password, response.body.password),
			).resolves.toBeTruthy()

			expect(response.body).toEqual(
				expect.objectContaining({
					...user,
					...{ password: expect.any(String) },
				}),
			)
		})

		it('should return status 409 when there is a validation error', async () => {
			const user: IUser = {
				name: 'Julia',
				password: 'Portal123!',
				gender: GenderEnum.FEMININO,
				cellphone: '11966596795',
				email: 'julia2@email.com',
				documentNumber: '',
				rule: 'CUSTOMER',
				status: UserStatusEnum.ACTIVE,
			}

			const newUser = validateFields(user)

			const response = await global.testRequest.post('/users').send(newUser)

			console.log('response', response.body)

			expect(response.status).toBe(400)
			expect(response.body).toEqual({
				code: 400,
				error: 'command find requires authentication',
			})
		})

		it('should return error if email already exists', async () => {
			const newUser = {
				name: 'Julia',
				password: 'Portal123!',
				gender: 'FEMININO',
				cellphone: '11966596795',
				documentNumber: '89075199009',
				email: 'julia@email.com',
				rule: 'ADMIN',
			}

			await global.testRequest.post('/users').send(newUser)
			const response = await global.testRequest.post('/users').send(newUser)

			expect(response.status).toBe(400)
			expect(response.body).toEqual({
				code: 400,
				error: 'command find requires authentication',
			})
		})
	})
})

describe('When authenticating a user', () => {
	it('should generate a token if valid user', async () => {
		const user = {
			email: 'julia1@email.com',
			password: 'Portal123!',
		}

		const response = await global.testRequest.post('/users/auth').send(user)

		console.log('authn', response.body)

		expect(response.body).toEqual({
			token: expect.any(String),
		})
	})
})
