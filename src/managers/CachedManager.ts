import { Collection } from '@discordjs/collection';
import { DataInterface, DataStructure } from '../typings/index.js';
import { LuyxClient } from '../client/LuyxClient.js';
import { BaseAuthRouteOptions } from 'luyx-management-api-types/v1';

export abstract class CachedManager<K extends keyof DataStructure, S extends DataStructure[K] = DataStructure[K], I extends DataInterface[K] = DataInterface[K]> {
	public readonly cache: Collection<string, S>;
	public readonly client: LuyxClient;
	public readonly route: K;

	constructor(route: K, client: LuyxClient) {
		this.cache = new Collection();
		this.client = client;
		this.route = route;
	}

	public async get(id: string): Promise<S | void> {
		const entry = this.cache.get(id);
		if (entry) return entry;

		const data = await this.fetchSingleDocument(id);
		if (data) return this.addCacheEntry(data);
	}

	public async create(options: S): Promise<S> {
		const response = await this.client.axios.post(`/${this.route}`, options);

		const { data, error } = response.data;

		if (!error) {
			this.cache.set(data!._id, data);
		}

		return data!;
	}

	protected addCacheEntry(data: I): S {
		const entry = this.resolve(data);

		this.cache.set(data._id, entry);

		return entry;
	}

	protected async fetchSingleDocument(id: string): Promise<I | null> {
		return (await this.client.axios.get<BaseAuthRouteOptions<I>['Reply']>(`/${this.route}/${id}`)).data.data;
	}

	protected async fetchManyDocuments(queryString: string): Promise<I[] | null> {
		return (await this.client.axios.get<BaseAuthRouteOptions<I[]>['Reply']>(`/${this.route}?${queryString}`)).data.data;
	}

	protected abstract resolve(data: I): S;
}