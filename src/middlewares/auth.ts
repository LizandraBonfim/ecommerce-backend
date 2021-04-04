import { NextFunction, Request, Response } from 'express'
import AuthService from '@src/services/auth'
import { UsersServices } from '@src/services/usersServices'
import { TEXT_GERAL } from '@src/util/textGeral'

export function authMiddleware(
	req: Partial<Request>,
	res: Partial<Response>,
	next: NextFunction,
): void {
	const token = req.headers?.['x-access-token']

	try {
		const claims = AuthService.decodedToken(token as string)

		req.context = { userId: claims.sub }
		const user = UsersServices.getUser('', '', req.context?.userId)

		if (!user) {
			throw {
				code: 404,
				message: TEXT_GERAL.USER_NOT_FOUND,
			}
		}

		next()
	} catch (error) {
		res.status?.(401).send({ code: 401, error: error.message })
	}
}
