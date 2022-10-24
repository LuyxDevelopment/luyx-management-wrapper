import { User } from 'luyx-management-api-types/v1';
import { LuyxClient } from '../client/LuyxClient.js';
import { LuyxUser } from '../structures/User.js';
import { CachedManager } from './CachedManager.js';

export class UserManager extends CachedManager<'users'> {
	constructor(client: LuyxClient) {
		super('users', client);
	}

	protected resolve(data: User): User {
		return new LuyxUser(this.client, data);
	}
}