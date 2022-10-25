import { Collection } from '@discordjs/collection';
import { DataStructure } from '../typings/index.js';
import { LuyxClient } from '../client/LuyxClient.js';
import { BaseAuthRouteOptions } from 'luyx-management-api-types/v1';

export abstract class CachedManager<K extends keyof DataStructure, D extends DataStructure[K] = DataStructure[K]> {
	public readonly cache: Collection<string, D>;
	public readonly client: LuyxClient;
	public readonly route: K;

	constructor(route: K, client: LuyxClient) {
		this.cache = new Collection();
		this.client = client;
		this.route = route;
	}

	public async find(search: D): Promise<Collection<string, D> | void> {
		const entries = this.cache.filter(e => e === search);
		if (entries) return entries;

		const documents = await this.fetchManyDocuments(this.queryFormat(search));

		if (!documents) return;

		for (const document of documents) {
			this.addCacheEntry(document);
		}

		return this.cache.filter(e => e === search);
	}

	public async get(id: string): Promise<D | void> {
		const entry = this.cache.get(id);
		if (entry) return entry;

		const data = await this.fetchSingleDocument(id);
		if (data) return this.addCacheEntry(data);
	}

	public async create(options: D): Promise<D> {
		const response = await this.client.axios.post(`/${this.route}`, options);

		const { data, error } = response.data;

		if (!error) {
			this.cache.set(data!._id, data);
		}

		return data!;
	}

	protected addCacheEntry(data: DataStructure[K]): D {
		const entry = this.resolve(data);

		this.cache.set(data._id, entry);

		return entry;
	}

	protected queryFormat(q: Partial<D>): string {
		let query = '';

		const keys = Object.keys(q);
		for (let i = 0; i < keys.length; ++i) {
			const val = keys[i]!;
			query += `&${val}=${q[val as keyof typeof q]}`;
		}

		return query;
	}

	protected async fetchSingleDocument(id: string): Promise<D | undefined> {
		return (await this.client.axios.get<BaseAuthRouteOptions<D>['Reply']>(`/${this.route}/${id}`)).data.data;
	}

	protected async fetchManyDocuments(queryString: string): Promise<D[] | undefined> {
		return (await this.client.axios.get<BaseAuthRouteOptions<D[]>['Reply']>(`/${this.route}?${queryString}`)).data.data;
	}

	protected abstract resolve(data: DataStructure[K]): D;
}