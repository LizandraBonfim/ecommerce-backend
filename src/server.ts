import './util/module-alias'
import { Server } from '@overnightjs/core'
import express, { Application } from 'express'
import { UsersController } from './controllers/usersController'
import * as database from '@src/database'
export class SetupServer extends Server {
	constructor(private port = 3000) {
		super()
	}

	public async init(): Promise<void> {
		this.setupExpress()
		this.setupControllers()
		await this.databaseSetup()
	}

	private setupExpress(): void {
		this.app.use(express.json())
	}

	private setupControllers(): void {
		const user = new UsersController()
		this.addControllers([user])
	}

	private async databaseSetup(): Promise<void> {
		await database.connect()
	}

	public async close(): Promise<void> {
		await database.close()
	}

	public getApp(): Application {
		return this.app
	}
}
