import { GenderEnum, CreateNewUser } from '@src/interfaces/user'

export function validateFields(user: CreateNewUser) {
	const name = !!user.name.trim()
	const email = !!checkEmail(user.email.trim())
	const password = !!checkPassword(user.password.trim())
	const gender = !!(user.gender === GenderEnum.FEMININO || GenderEnum.MASCULINO)
	const cellphone = !!checkTel(user.cellphone.trim())
	const documentNumber = !!checkCPF(user.documentNumber.trim())

	const validationResult = {
		name,
		email,
		password,
		gender,
		cellphone,
		documentNumber,
	} as any

	const keys = Object.keys(validationResult)

	const values = keys
		.map((x) => ({ [x]: validationResult[x] }))
		.filter((obj, index) => obj[keys[index]] === false)

	const userNew = values.map((e) => Object.keys(e)).join(' , ')

	if (!values) {
		throw {
			code: 400,
			message: `Erro no formato da requisição: ${userNew}`,
		}
	}
}

export const IS_VALID_EMAIL = /^(([^<>()[\]\\.,:\s@"]+(\.[^<>()[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
export const ALL_SAME_NUMBER = /^(\d)\1+$/
export const SPECIAL_CHAR_AND_WHITESPACE = /[^\w\s]/gi
export const NON_DIGIT = /\D/g
export const IS_VALID_PASSWORD = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/

export const validDDDs = [
	11,
	12,
	13,
	14,
	15,
	16,
	17,
	18,
	19,
	21,
	22,
	24,
	27,
	28,
	31,
	32,
	33,
	34,
	35,
	37,
	38,
	41,
	42,
	43,
	44,
	45,
	46,
	47,
	48,
	49,
	51,
	53,
	54,
	55,
	61,
	62,
	64,
	63,
	65,
	66,
	67,
	68,
	69,
	71,
	73,
	74,
	75,
	77,
	79,
	81,
	82,
	83,
	84,
	85,
	86,
	87,
	88,
	89,
	91,
	92,
	93,
	94,
	95,
	96,
	97,
	98,
	99,
]

export function checkEmail(email: string): boolean {
	return Boolean(email && email.length && IS_VALID_EMAIL.test(email))
}

export function checkCPF(cpf: string): boolean {
	cpf = cpf.replace(SPECIAL_CHAR_AND_WHITESPACE, '').trim()

	if (cpf.length !== 11 || ALL_SAME_NUMBER.test(cpf)) {
		return false
	}

	// Valida 1o digito
	let add = 0
	for (let i = 0; i < 9; i++) add += parseInt(cpf.charAt(i), 0) * (10 - i)
	let rev: number = 11 - (add % 11)
	if (rev === 10 || rev === 11) rev = 0
	if (rev !== parseInt(cpf.charAt(9), 0)) return false

	// Valida 2o digito
	add = 0
	for (let i = 0; i < 10; i++) {
		add += parseInt(cpf.charAt(i), 0) * (11 - i)
	}
	rev = 11 - (add % 11)
	if (rev === 10 || rev === 11) rev = 0
	if (rev !== parseInt(cpf.charAt(10), 0)) return false

	return true
}

export function checkPassword(password: string) {
	password = password.trim()
	const isValidPassword = IS_VALID_PASSWORD.test(password)
	const isTrue = password.length !== 0 && isValidPassword

	return isTrue
}

export function checkPasswordMatch(
	password: string,
	password_check: string,
): boolean {
	password = password.trim()
	password_check = password_check.trim()

	const areEqualAndNotEmpty =
		password === password_check &&
		password.length !== 0 &&
		password_check.length !== 0

	return areEqualAndNotEmpty
}

export function checkTel(telephone: string): boolean {
	const tel = telephone.replace(NON_DIGIT, '').trim()

	const telArr = [...tel]

	const ddd = telArr.slice(0, 2).join('')

	// Verifica se tem a quantidade de numero correto
	if (tel.length > 11 || tel.length < 10) return false

	if (tel.length === 11 && Number(telArr[2]) !== 9) {
		// Se celular verifica se começa com 9
		return false
	}

	if (ALL_SAME_NUMBER.test(tel)) return false

	return validDDDs.includes(Number(ddd))
}
