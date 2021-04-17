export interface IPayment {
	creditCardNumber: string
	cvc: string
	nameHolder: string
	documentNumberHolder: string
	dueDate: Date
	password: string
	flag: IFlag
}

export enum IFlag {
	MASTERCARD = 'MASTERCARD',
	VISA = 'VISA',
	AMERICAN_EXPRESS = 'AMERICAN EXPRESS',
	HIPERCARD = 'HIPERCARD',
	ELO = 'ELO',
}
