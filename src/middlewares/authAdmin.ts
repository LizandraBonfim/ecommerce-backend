import { NextFunction, Request, Response } from 'express'
import AuthService from '@src/services/auth'
import { TEXT_GERAL } from '@src/util/textGeral'
import { UsersServices } from '@src/services/usersServices'

export async function authMiddlewareAdmin(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	const token = req.headers?.['x-access-token']

	try {
		const claims = AuthService.decodedToken(token as string)

		req.context = { userId: claims.sub }

		const user = await UsersServices.getUser('', '', req.context?.userId)

		if (user.rule !== 'ADMIN') {
			throw {
				code: 400,
				message: TEXT_GERAL.NOT_AUTHORIZATION,
			}
		}
		next()
	} catch (error) {
		res.status(401).send({ code: 401, error: error.message })
	}
}
