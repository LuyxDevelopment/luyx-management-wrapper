import { AxiosResponse } from 'axios';
import {
	/*PatchProjectRouteOptions,*/ PostProjectRouteOptions, APIProject, PartialPick,
} from 'luyx-management-api-types/v1';

import { LuyxClient } from '../client/LuyxClient.js';
import { LuyxProject } from '../structures/Project.js';
import { CachedManager } from './CachedManager.js';

export class ProjectManager extends CachedManager<'projects'> {
	constructor(client: LuyxClient) {
		super('projects', client);
	}

	public async create(options: PartialPick<APIProject, 'isPrivate', 'deadline' | 'description' | 'name'>): Promise<LuyxProject> {
		const { data, error, message } = (await this.client.rest.post<PostProjectRouteOptions['Reply'], AxiosResponse<PostProjectRouteOptions['Reply']>, PostProjectRouteOptions['Body']>(`/${this.route}`, options)).data;

		if (error || !data) {
			throw new Error(message || 'API Unreachable.');
		}

		return this.addCacheEntry(data);
	}

	// public async edit(project: LuyxProject, options: PatchProjectRouteOptions['Body']): Promise<LuyxProject> {

	// 	const { data, error, message } = (await this.client.rest.patch<PatchProjectRouteOptions['Reply']>(`/${this.route}/${project._id}`, options)).data;

	// 	if (error || !data) {
	// 		throw new Error(message || 'API Unreachable.');
	// 	}

	// 	return project = this.resolve(data);
	// }

	public async import(body: Pick<APIProject, 'deadline' | 'gitHubURL' | 'name'>): Promise<LuyxProject> {
		const { data, error, message } = (await this.client.rest.post<PostProjectRouteOptions['Reply'], AxiosResponse<PostProjectRouteOptions['Reply']>, Pick<APIProject, 'deadline' | 'gitHubURL' | 'name'>>(`/${this.route}`, body)).data;

		if (error || !data) {
			throw new Error(message || 'API Unreachable.');
		}

		return this.addCacheEntry(data);
	}

	protected resolve(data: APIProject): LuyxProject {
		return new LuyxProject(this.client, data);
	}
}