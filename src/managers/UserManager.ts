import { AxiosResponse } from 'axios';
import { PatchUserRouteOptions, PostUserRouteOptions, User } from 'luyx-management-api-types/v1';
import { LuyxClient } from '../client/LuyxClient.js';
import { LuyxUser } from '../structures/User.js';
import { CachedManager } from './CachedManager.js';

export class UserManager extends CachedManager<'users'> {
	constructor(client: LuyxClient) {
		super('users', client);
	}

	public async create(options: PostUserRouteOptions['Body']): Promise<LuyxUser> {
		const { data, error, message } = (await this.client.rest.post<PostUserRouteOptions['Reply'], AxiosResponse<PostUserRouteOptions['Reply']>, PostUserRouteOptions['Body']>(`/${this.route}`, options)).data;

		if (error || !data) {
			throw new Error(message);
		}

		return this.addCacheEntry(data);
	}

	public async findByDiscordId(id: string): Promise<LuyxUser | void> {
		const entry = this.cache.find(e => e.contact.discordId === id);
		if (entry) return entry;

		const data = await this.fetchSingleDocument(id);
		if (data) return this.addCacheEntry(data);
	}

	public async edit(user: LuyxUser, options: PatchUserRouteOptions['Body']): Promise<LuyxUser> {
		const { data, error, message } = (await this.client.rest.patch<PatchUserRouteOptions['Reply']>(`/${this.route}/${user._id}`, options)).data;

		if (error || !data) throw new Error(message);

		return user = this.resolve(data);
	}

	protected resolve(data: User): LuyxUser {
		return new LuyxUser(this.client, data);
	}
}