import { AxiosResponse } from 'axios';
import { APIUser, PatchUserRouteOptions, PostUserRouteOptions } from 'luyx-management-api-types/v1';

import { LuyxClient } from '../client/LuyxClient.js';
import { LuyxUser } from '../structures/User.js';
import { CachedManager } from './CachedManager.js';

export class UserManager extends CachedManager<'users'> {
	constructor(client: LuyxClient) {
		super('users', client);
	}

	public async create<R extends PostUserRouteOptions['Reply'] = PostUserRouteOptions['Reply'], D extends PostUserRouteOptions['Body'] = PostUserRouteOptions['Body']>(options: D): Promise<LuyxUser> {
		const { data, error, message } = (await this.client.rest.post<R, AxiosResponse<R>, D>(`/${this.route}`, options)).data;

		if (error || !data) {
			throw new Error(message || 'Unknown response from API.');
		}

		return this.addCacheEntry(data);
	}

	public async findByDiscordId(id: string): Promise<LuyxUser | void> {
		const entry = this.cache.find(e => e.contact.discordId === id);
		if (entry) return entry;

		const data = await this.fetchSingleDocument(id);
		if (data) return this.addCacheEntry(data);
	}

	public async edit<R extends PatchUserRouteOptions['Reply'] = PatchUserRouteOptions['Reply'], D extends PatchUserRouteOptions['Body'] = PatchUserRouteOptions['Body']>(user: LuyxUser, options: D): Promise<LuyxUser> {
		const { data, error, message } = (await this.client.rest.patch<R, AxiosResponse<R>, D>(`/${this.route}/${user._id}`, options)).data;

		if (error || !data) throw new Error(message);

		return user = this.resolve(data);
	}

	protected resolve(data: APIUser): LuyxUser {
		return new LuyxUser(this.client, data);
	}
}