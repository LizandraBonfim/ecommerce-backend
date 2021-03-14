describe('Create Account functional tests', () => {
	it('should create a account for user', async () => {
		const newUser = {
			name: 'Julia',
			password: 'Portal123!',
			gender: 'Feminino',
			cellphone: '11966596795',
			documentNumber: '222080164',
			email: 'julia@email.com',
		}

		const response = await global.testRequest
			.post('/users')
			.send(newUser)

		expect(response.status).toBe(201)
		expect(response.body).toEqual(newUser)
	})

	it('should list all users', async () => {
		const response = await global.testRequest.get('/users')

		expect(response.status).toBe(200)
		expect(response.body).toEqual([
			{
				name: 'Julia',
				password: 'Portal123!',
				gender: 'Feminino',
				cellphone: '11966596795',
				documentNumber: '222080164',
				email: 'julia@email.com',
			},
		])
	})
})
