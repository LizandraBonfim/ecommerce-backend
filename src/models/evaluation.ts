import mongoose, { Model, Document, Schema, model } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import { IEvaluation } from '@src/interfaces/evaluation'
import { IMongoosePaginate, MongoDocument } from '@src/services/paginate'

const schema = new mongoose.Schema(
	{
		productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
		comment: { type: String, required: true },
		userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		image: { type: [String], required: false },
		evaluationValue: { type: Number, required: true },
		status: { type: String, default: 'ACTIVE', required: false  },
	},
	{
		toJSON: {
			transform: (_, ret): void => {
				;(ret.id = ret._id), delete ret._id, delete ret._v
			},
		},
	},
)

schema.set('timestamps', true)
schema.plugin(mongoosePaginate)

interface EvaluationModel extends Omit<IEvaluation, '_id'>, Document {}
export const Evaluation: Model<EvaluationModel> = mongoose.model(
	'Evaluation',
	schema,
)

type EvaluationModelWithPaginate = Model<MongoDocument<EvaluationModel>, {}> &
	IMongoosePaginate<IEvaluation>
const evaluationPag = model<MongoDocument<EvaluationModel>>(
	'Evaluation',
	schema,
	'evaluation',
) as EvaluationModelWithPaginate

export default evaluationPag

//module.exports = model('Evaluation', schema)
