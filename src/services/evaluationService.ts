import { IEvaluation } from '@src/interfaces/evaluation'
import { Evaluation } from '@src/models/evaluation'

export class EvaluationService {
	public static async create(evaluation: IEvaluation) {

		
		const newEvaluation = new Evaluation(evaluation)

		const createNewEvaluation = await newEvaluation.save()

		if (!createNewEvaluation) {
			throw {
				code: 402,
				message: 'Ocorreu um erro',
			}
		}

		return createNewEvaluation
	}
}
