import './util/module-alias'
import { Server } from '@overnightjs/core'
import express, { Application } from 'express'
import { UsersController } from './controllers/usersController'
import * as database from '@src/database'
import { ProductsController } from './controllers/productsController'
import logger from './logger'
export class SetupServer extends Server {
	constructor(private port = 3000) {
		super()
	}

	public async init(): Promise<void> {
		console.log('teste')
		this.setupExpress()
		this.setupControllers()

		await this.databaseSetup()
	}

	private setupExpress(): void {
		this.app.use(express.json())
	}

	private setupControllers(): void {
		const user = new UsersController()
		const product = new ProductsController()
		this.addControllers([user, product])
	}

	private async databaseSetup(): Promise<void> {
		await database.connect()
	}

	public async close(): Promise<void> {
		await database.close()
	}

	public start(): void {
		this.app.listen(this.port, () => {
			logger.info(`Server listening of port: ${this.port}`)
		})
	}

	public getApp(): Application {
		return this.app
	}
}
