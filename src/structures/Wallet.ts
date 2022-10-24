import { AxiosResponse } from 'axios';
import { PostTransactionRouteOptions, Transaction, TransactionStage, TransactionType, Wallet } from 'luyx-management-api-types/v1';
import { Base } from './Base.js';
import { LuyxClient } from '../client/LuyxClient.js';

export class LuyxWallet extends Base implements Wallet {
	public readonly _id: string;
	public balance: number;

	constructor(client: LuyxClient, { _id, balance }: Wallet) {
		super(client);

		this._id = _id;
		this.balance = balance;
	}

	public async deposit(amount: number, description: string): Promise<TransactionStage | Transaction> {
		const request = await this.client.axios.post<PostTransactionRouteOptions['Reply'], AxiosResponse<PostTransactionRouteOptions['Reply']>, PostTransactionRouteOptions['Body']>('/transactions', { amount, description, to: this, transactionType: TransactionType.DEPOSIT, transactionStage: TransactionStage.PENDING });

		return request.data.data!;
	}

	public async transfer(amount: number, recipient: Wallet, description: string): Promise<TransactionStage | Transaction> {
		const request = await this.client.axios.post<PostTransactionRouteOptions['Reply'], AxiosResponse<PostTransactionRouteOptions['Reply']>, PostTransactionRouteOptions['Body']>('/transactions', { amount, description, from: this, to: recipient, transactionType: TransactionType.TRANSFER, transactionStage: TransactionStage.PENDING });

		return request.data.data!;
	}

	public async withdraw(amount: number, description: string): Promise<TransactionStage | Transaction> {
		const request = await this.client.axios.post<PostTransactionRouteOptions['Reply'], AxiosResponse<PostTransactionRouteOptions['Reply']>, PostTransactionRouteOptions['Body']>('/transactions', { amount, description, from: this, transactionType: TransactionType.WITHDRAWAL, transactionStage: TransactionStage.PENDING });

		return request.data.data!;
	}
}