import { NextFunction, Request, Response } from 'express'
import AuthService from '@src/services/auth'
import { TEXT_GERAL } from '@src/util/textGeral'

export function authMiddlewareAdmin(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	const token = req.headers['x-access-token']

	try {
		const decoded = AuthService.decodedToken(token as string)

		if (decoded.rule !== 'ADMIN') {
			res.status(400).json({
				code: 400,
				error: TEXT_GERAL.NOT_AUTHORIZATION,
			})
			next()
		}
		req.decoded = decoded
		next()
	} catch (error) {
		res.status(401).send({ code: 401, error: error.message })
	}
}
