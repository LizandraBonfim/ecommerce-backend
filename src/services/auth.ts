import bcrypt from 'bcrypt'
import config from 'config'
import jwt from 'jsonwebtoken'
import { IUser } from '@src/interfaces/user'

export interface DecodedUser extends Omit<IUser, '_id'> {
	_id: string
}

export default class AuthService {
	public static async hashPassword(
		password: string,
		salt = 10,
	): Promise<string> {
		return await bcrypt.hash(password, salt)
	}

	public static async comparePassword(
		password: string,
		hashedPassword: string,
	): Promise<boolean> {
		return await bcrypt.compare(password, hashedPassword)
	}

	public static generateToken(payload: any): string {
		return jwt.sign(payload, config.get('App.auth.key'), {
			expiresIn: config.get('App.auth.expiresIn'),
		})
	}

	public static decodedToken(token: string): DecodedUser {
		return jwt.verify(token, config.get('App.auth.key')) as DecodedUser
	}
}
