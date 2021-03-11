import { InternalError } from '@src/util/erros/internal-error'
import config, { IConfig } from 'config'
import * as HTTPUtil from '@src/util/request'
export class ClientRequestError extends InternalError {
	constructor(message: string) {
		const internalMessage = `Erro : `
		super(`${internalMessage} : ${message}`)
	}
}

export class ClientResponseError extends InternalError {
	constructor(message: string) {
		const internalMessage = `Erro : `
		super(`${internalMessage} : ${message}`)
	}
}

const stormGlassResourceConfig: IConfig = config.get('App.resources.StormGlass')
export class StormGlass {
	constructor(protected request = new HTTPUtil.Request()) {}
	public async fetchPoints(): Promise<{}> {
		try {
			const response = await this.request.get('colocar a api aqui', {
				headers: {
					Authorization: stormGlassResourceConfig.get('apiToken'),
				},
			})
			return Promise.resolve({})
			// return this.request.get(``)
		} catch (error) {
			throw new ClientRequestError(error.message)
		}
	}
}
