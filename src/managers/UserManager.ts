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
		const response = await this.client.rest.post<PostUserRouteOptions['Reply'], AxiosResponse<PostUserRouteOptions['Reply']>, PostUserRouteOptions['Body']>(`/${this.route}`, options);

		const { data, error, message } = response.data;

		if (error) {
			throw new Error(message);
		}

		return this.addCacheEntry(data!);
	}

	public async findByDiscordId(id: string): Promise<LuyxUser | void> {
		const entry = this.cache.find(e => e.contact.discordId === id);
		if (entry) return entry;

		const data = await this.fetchSingleDocument(id);
		if (data) return this.addCacheEntry(data);
	}

	public async edit(user: LuyxUser, data: PatchUserRouteOptions['Body']): Promise<LuyxUser> {
		return user = this.resolve((await this.client.rest.patch<PatchUserRouteOptions['Reply']>(`/users/${user._id}`, data)).data.data!);
	}

	protected resolve(data: User): LuyxUser {
		return new LuyxUser(this.client, data);
	}
}