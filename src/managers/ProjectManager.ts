import { Project } from 'luyx-management-api-types/v1';
import { LuyxClient } from '../client/LuyxClient.js';
import { LuyxProject } from '../structures/Project.js';
import { CachedManager } from './CachedManager.js';

export class ProjectManager extends CachedManager<'projects'> {
	constructor(client: LuyxClient) {
		super('projects', client);
	}

	protected resolve(data: Project): LuyxProject {
		return new LuyxProject(this.client, data);
	}
}