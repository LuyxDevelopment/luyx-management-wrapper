import { AxiosResponse } from 'axios';
import { PatchProjectRouteOptions, PostProjectRouteOptions, Project } from 'luyx-management-api-types/v1';
import { LuyxClient } from '../client/LuyxClient.js';
import { LuyxProject } from '../structures/Project.js';
import { CachedManager } from './CachedManager.js';

export class ProjectManager extends CachedManager<'projects'> {
	constructor(client: LuyxClient) {
		super('projects', client);
	}

	public async create(options: Pick<Project, 'deadline' | 'description' | 'name'>): Promise<LuyxProject> {
		const { data, error, message } = (await this.client.rest.post<PostProjectRouteOptions['Reply'], AxiosResponse<PostProjectRouteOptions['Reply']>, PostProjectRouteOptions['Body']>(`/${this.route}`, options)).data;
	
		if (error || !data) {
			throw new Error(message);
		}

		return this.addCacheEntry(data);
	}

	public async edit(project: LuyxProject, options: PatchProjectRouteOptions['Body']): Promise<LuyxProject> {

		const { data, error, message } = (await this.client.rest.patch<PatchProjectRouteOptions['Reply']>(`/${this.route}/${project._id}`, options)).data;

		if (error || !data) {
			throw new Error(message);
		}

		return project = this.resolve(data);
	}

	public async import(body: Pick<Project, 'deadline' | 'gitHubURL' | 'name'>): Promise<LuyxProject> {
		const response = await this.client.rest.post<PostProjectRouteOptions['Reply'], AxiosResponse<PostProjectRouteOptions['Reply']>, Pick<Project, 'deadline' | 'gitHubURL' | 'name'>>(`/${this.route}`, body);

		const { data, error, message } = response.data;

		if (error || !data) {
			throw new Error(message);
		}

		return this.addCacheEntry(data);
	}

	protected resolve(data: Project): LuyxProject {
		return new LuyxProject(this.client, data);
	}
}