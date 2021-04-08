import { Model } from 'mongoose'

const myCustomLabels = {
	totalDocs: 'itemCount',
	docs: 'itemsList',
	limit: 'perPage',
	page: 'currentPage',
	nextPage: 'next',
	prevPage: 'prev',
	totalPages: 'pageCount',
	pagingCounter: 'slNo',
	meta: 'paginator',
}

const options = {
	page: 1,
	limit: 10,
	customLabels: myCustomLabels,
}

export interface IMongoosePaginateOptions {
	select: object | string
	collation: object
	sort: object | string
	populate: Array<object | string> | object | string
	lean: boolean
	leanWithId: boolean
	offset: number
	page: number
	limit: number
	customLabels: object
	pagination: boolean
	read: object
}

export interface IMongoosePaginateReturn<T> {
	docs: Array<T>
	totalDocs: number
	limit: number
	hasPrevPage: boolean
	hasNextPage: boolean
	page: number
	totalPages: number
	offset: number
	prevPage: number
	nextPage: number
	pagingCounter: number
	meta: object
}

// Model.paginate({}, options, function (err, result) {})
export declare interface IMongoosePaginate<T> {
	paginate: (
		query: { [x: string]: any },
		options: Partial<IMongoosePaginateOptions>,
		callback?: (err: any, result: any) => void,
	) => Promise<IMongoosePaginateReturn<T>>
}

export declare type MongoDocument<T> = T & Document & { _id: any }
