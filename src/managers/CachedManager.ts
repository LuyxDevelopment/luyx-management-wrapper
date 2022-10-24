import { Collection } from '@discordjs/collection';
import { DataStructure } from '../typings/index.js';
import { LuyxClient } from '../client/LuyxClient.js';

export abstract class CachedManager<K extends keyof DataStructure, D extends DataStructure[K] = DataStructure[K]> {
	public readonly cache: Collection<string, D>;
	public readonly client: LuyxClient;
	public readonly route: K;

	constructor(route: K, client: LuyxClient) {
		this.cache = new Collection();
		this.client = client;
		this.route = route;
	}

	public async get(id: string): Promise<D | void> {
		const entry = this.cache.get(id);
		if (entry) return entry;

		const data = await this.fetchDb(id);
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

	protected fetchDb(id: string): Promise<D> {
		return this.client.axios.get(`/${this.route}/${id}`);
	}

	protected abstract resolve(data: DataStructure[K]): D;
}