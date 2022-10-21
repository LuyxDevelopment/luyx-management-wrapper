import { LuyxClient } from '../structures/LuyxClient.js';
import { CachedManager } from './CachedManager.js';

export class TransactionManager extends CachedManager<'transactions'> {
	constructor(client: LuyxClient) {
		super('transactions', client);
	}
}