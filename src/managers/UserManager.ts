import { User } from 'luyx-management-api-types/v1';
import { LuyxClient } from '../client/LuyxClient.js';
import { LuyxUser } from '../structures/User.js';
import { CachedManager } from './CachedManager.js';

export class UserManager extends CachedManager<'users'> {
	constructor(client: LuyxClient) {
		super('users', client);
	}

	public async findByDiscordId(id: string): Promise<LuyxUser | void> {
		const entry = this.cache.find(e => e.contact.discordId === id);
		if (entry) return entry;

		const data = await this.fetchSingleDocument(id);
		if (data) return this.addCacheEntry(data);
	}

	protected resolve(data: User): LuyxUser {
		return new LuyxUser(this.client, data);
	}
}