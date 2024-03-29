import { APITransaction } from 'luyx-management-api-types/v1';

import { LuyxClient } from '../client/LuyxClient.js';
import { LuyxTransaction } from '../structures/Transaction.js';
import { CachedManager } from './CachedManager.js';

export class TransactionManager extends CachedManager<'transactions'> {
	constructor(client: LuyxClient) {
		super('transactions', client);
	}

	protected resolve(data: APITransaction): LuyxTransaction {
		return new LuyxTransaction(this.client, data);
	}
}