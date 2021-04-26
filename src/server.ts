import './util/module-alias'
import { Server } from '@overnightjs/core'
import express, { Application } from 'express'
import * as database from '@src/database'
import swaggerUi from 'swagger-ui-express'
import { UsersController } from './controllers/usersController'
import { ProductsController } from './controllers/productsController'
import { OrdersController } from './controllers/ordersController'
import logger from './logger'
import { PaymentController } from './controllers/paymentController'

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
		const order = new OrdersController()
		const payment = new PaymentController()
		// const evaluation = new EvaluationController()
		this.addControllers([user, product, order, payment, 
			// evaluation
		])
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
