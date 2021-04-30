export interface IEvaluation {
	_id?: string
	productId: string
	comment: string
	userId: string
	image?: string[]
	evaluationValue: number
	status?: StatusEvaluationEnum
}

export enum StatusEvaluationEnum {
	ACTIVE = 'ACTIVE',
	INACTIVE = 'INACTIVE',
}
