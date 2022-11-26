import { APITransaction } from 'luyx-management-api-types/v1';

import { LuyxClient } from '../client/LuyxClient.js';
import { Base } from './Base.js';

export class LuyxTransaction extends Base implements APITransaction {
	public readonly _id;
	public readonly amount;
	public readonly description;
	public readonly from;
	public readonly to;
	public readonly timestamp;
	public readonly transactionStage;
	public readonly transactionType;

	constructor(client: LuyxClient, { _id, amount, description, from, timestamp, to, transactionStage, transactionType }: APITransaction) {
		super(client);

		this._id = _id;
		this.amount = amount;
		this.description = description;
		this.from = from;
		this.to = to;
		this.timestamp = timestamp;
		this.transactionStage = transactionStage;
		this.transactionType = transactionType;
	}
}