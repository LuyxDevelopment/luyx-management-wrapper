import { Collection } from '@discordjs/collection';
import { AxiosResponse } from 'axios';
import { BaseAuthRouteOptions } from 'luyx-management-api-types/v1';
import { DataStructure, DataStructureOption } from '../../typings/index.js';
import { LuyxClient } from '../structures/LuyxClient.js';

export abstract class CachedManager<K extends DataStructureOption, D extends DataStructure[K] = DataStructure[K]> {
	public readonly cache: Collection<string, D>;
	public readonly client: LuyxClient;
	public readonly route: K;

	constructor(route: K, client: LuyxClient) {
		this.cache = new Collection();
		this.client = client;
		this.route = route;
	}

	public async create(options: D): Promise<D | null> {
		const response = await this.client.axios.post<BaseAuthRouteOptions<D>['Reply']>(`/${this.route}`, options);

		const { data, error } = response.data;

		if (!error) {
			this.cache.set(data!._id, data!);
		}

		return data;
	}

	public delete(id: string): Promise<AxiosResponse> {
		return this.client.axios.delete(`/${this.route}/${id}`);
	}

	public edit(id: string, data: D): Promise<AxiosResponse> {
		return this.client.axios.patch(`/${this.route}/${id}`, data);
	}

	protected fetch(id: string): Promise<AxiosResponse> {
		return this.client.axios.get(`/${this.route}/${id}`);
	}
}