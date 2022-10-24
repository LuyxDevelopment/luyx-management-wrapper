import { LuyxClient } from '../client/LuyxClient.js';

export abstract class Base {
	public readonly client: LuyxClient;

	constructor(client: LuyxClient) {
		this.client = client;
	}
}