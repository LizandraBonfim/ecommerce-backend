import { AxiosStatic } from 'axios'

export class StormGlass {
	constructor(protected request: AxiosStatic){ }
	public async fetchPoints(): Promise<{}> {
		return Promise.resolve({})
        // return this.request.get(``)
	}
}
