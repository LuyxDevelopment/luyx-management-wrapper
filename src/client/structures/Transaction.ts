import { Transaction, TransactionStage, Wallet } from 'luyx-management-api-types/v1';

export class LuyxTransaction implements Transaction {
	public readonly _id: string;
	public amount: number;
	public description: string;
	public from: Wallet | null;
	public to: Wallet | null;
	public timestamp: number;
	public transactionStage: TransactionStage;
	public transactionType;

	constructor({ _id, amount, description, from, timestamp, to, transactionStage, transactionType }: Transaction) {
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