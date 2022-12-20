import { AxiosResponse } from 'axios';
import {
	APIProject, PartialPick, PatchProjectRouteOptions, PostProjectRouteOptions,
} from 'luyx-management-api-types/v1';
import qs from 'querystring';

import { LuyxClient } from '../client/LuyxClient.js';
import { LuyxProject } from '../structures/Project.js';
import { CachedManager } from './CachedManager.js';

export class ProjectManager extends CachedManager<'projects'> {
	constructor(client: LuyxClient) {
		super('projects', client);
	}

	public async create<R extends PostProjectRouteOptions['Reply'] = PostProjectRouteOptions['Reply'], D extends PartialPick<APIProject, 'isPrivate' | 'stage', 'deadline' | 'description' | 'name'> = PartialPick<APIProject, 'isPrivate' | 'stage', 'deadline' | 'description' | 'name'>>(options: D): Promise<LuyxProject> {
		const { data, error, message } = (await this.client.rest.post<R, AxiosResponse<R>, D>(`/${this.route}`, options)).data;

		if (error || !data) {
			throw new Error(message || 'Unknown response from API.');
		}

		return this.addCacheEntry(data);
	}

	public async edit<R extends PatchProjectRouteOptions['Reply'] = PatchProjectRouteOptions['Reply'], D extends PatchProjectRouteOptions['Body'] = PatchProjectRouteOptions['Body']>(project: LuyxProject, options: D): Promise<LuyxProject> {
		const { data, error, message } = (await this.client.rest.patch<R, AxiosResponse<R>, D>(`/${this.route}/${project._id}`, options)).data;

		if (error || !data) {
			throw new Error(message || 'Unknown response from API.');
		}

		return project = this.resolve(data);
	}

	public async import<R extends PostProjectRouteOptions['Reply'] = PostProjectRouteOptions['Reply'], D extends Pick<APIProject, 'deadline' | 'name'> = Pick<APIProject, 'deadline' | 'name'>>(options: D): Promise<LuyxProject> {
		const { data, error, message } = (await this.client.rest.post<R, AxiosResponse<R>, D>(`/${this.route}?${qs.stringify({ import: true })}`, options)).data;

		if (error || !data) {
			throw new Error(message || 'Unknown response from API.');
		}

		return this.addCacheEntry(data);
	}


	protected resolve(data: APIProject): LuyxProject {
		return new LuyxProject(this.client, data);
	}
}