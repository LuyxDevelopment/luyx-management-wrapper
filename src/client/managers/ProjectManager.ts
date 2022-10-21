import { Collection } from '@discordjs/collection';
import { Project } from 'luyx-management-api-types/v1';
import { LuyxClient } from '../structures/LuyxClient.js';
import { CachedManager } from './CachedManager.js';

export class ProjectManager extends CachedManager<'projects'> {

	public readonly cache: Collection<string, Project>;

	constructor(client: LuyxClient) {
		super('projects', client);

		this.cache = new Collection();
	}
}