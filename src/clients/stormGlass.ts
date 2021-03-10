import { InternalError } from '@src/util/internal-error'
import { AxiosStatic } from 'axios'

export class ClientRequestError extends InternalError {
	constructor(message: string) {
		const internalMessage = `Erro : `
		super(`${internalMessage} : ${message}`)
	}
}
export class StormGlass {
	constructor(protected request: AxiosStatic) {}
	public async fetchPoints(): Promise<{}> {
		try {
			const response = await this.request.get('colocar a api aqui')
			return Promise.resolve({})
			// return this.request.get(``)
		} catch (error) {
			throw new ClientRequestError(error.message)
		}
	}
}
