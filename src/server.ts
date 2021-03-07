import './util/module-alias'
import { Server } from '@overnightjs/core'
import express, { Application } from 'express'
import { UsersController } from './controllers/users'

export class SetupServer extends Server {
	constructor(private port = 3000) {
		super()
	}

	public init(): void {
		this.setupExpress()
		this.setupControllers()
	}

	private setupExpress(): void {
		this.app.use(express.json())
	}

	private setupControllers(): void {
		const user = new UsersController()
		this.addControllers([user])
	}

	public getApp(): Application {
		return this.app
	}
}
