export interface IEvaluation {
	_id?: string
	productId: string
	comment: string
	userId: string
	image?: string
	evaluationValue: string
	status: IStatusEvaluation
}

export enum IStatusEvaluation {
	ACTIVE = 'ACTIVE',
	INACTIVE = 'INACTIVE',
}
