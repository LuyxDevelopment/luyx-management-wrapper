import { AxiosResponse } from 'axios';
import {
	APITransaction, APIWallet, PostTransactionRouteOptions, TransactionStage, TransactionType,
} from 'luyx-management-api-types/v1';

import { LuyxClient } from '../client/LuyxClient.js';
import { Base } from './Base.js';

export class LuyxWallet extends Base implements APIWallet {
	public readonly _id;
	public readonly balance;

	constructor(client: LuyxClient, { _id, balance }: APIWallet) {
		super(client);

		this._id = _id;
		this.balance = balance;
	}

	public async deposit(amount: number, description: string): Promise<TransactionStage | APITransaction> {
		const request = await this.client.rest.post<PostTransactionRouteOptions['Reply'], AxiosResponse<PostTransactionRouteOptions['Reply']>, PostTransactionRouteOptions['Body']>('/transactions', { amount, description, to: this._id, transactionType: TransactionType.DEPOSIT, transactionStage: TransactionStage.PENDING });

		return request.data.data!;
	}

	public async transfer(amount: number, recipient: APIWallet, description: string): Promise<TransactionStage | APITransaction> {
		const request = await this.client.rest.post<PostTransactionRouteOptions['Reply'], AxiosResponse<PostTransactionRouteOptions['Reply']>, PostTransactionRouteOptions['Body']>('/transactions', { amount, description, from: this._id, to: recipient._id, transactionType: TransactionType.TRANSFER, transactionStage: TransactionStage.PENDING });

		return request.data.data!;
	}

	public async withdraw(amount: number, description: string): Promise<TransactionStage | APITransaction> {
		const request = await this.client.rest.post<PostTransactionRouteOptions['Reply'], AxiosResponse<PostTransactionRouteOptions['Reply']>, PostTransactionRouteOptions['Body']>('/transactions', { amount, description, from: this._id, transactionType: TransactionType.WITHDRAWAL, transactionStage: TransactionStage.PENDING });

		return request.data.data!;
	}
}