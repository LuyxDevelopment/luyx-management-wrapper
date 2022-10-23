import { Transaction, TransactionStage, Wallet } from 'luyx-management-api-types/v1';
import { Base } from './Base.js';
import { LuyxClient } from './LuyxClient.js';

export class LuyxTransaction extends Base implements Transaction {
	public readonly _id: string;
	public readonly amount: number;
	public readonly description: string;
	public readonly from: Wallet | null;
	public readonly to: Wallet | null;
	public readonly timestamp: number;
	public readonly transactionStage: TransactionStage;
	public readonly transactionType;

	constructor(client: LuyxClient, { _id, amount, description, from, timestamp, to, transactionStage, transactionType }: Transaction) {
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