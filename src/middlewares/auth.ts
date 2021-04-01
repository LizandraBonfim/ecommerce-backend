import { NextFunction, Request, Response } from 'express'
import AuthService from '@src/services/auth'

export function authMiddleware(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	const token = req.headers['x-access-token']
	try {
		const decoded = AuthService.decodedToken(token as string)
		req.decoded = decoded
		next()
	} catch (error) {
		res.status(401).send({ code: 401, error: error.message })
	}
}
