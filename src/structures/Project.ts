/* eslint-disable require-await */
import { DeleteProjectAssignedRouteOptions, Project, PutProjectAssignedRouteOptions, StatusCodePhrases, User } from 'luyx-management-api-types/v1';
import { Base } from './Base.js';
import { LuyxClient } from '../client/LuyxClient.js';
import { LuyxUser } from './User.js';

export class LuyxProject extends Base implements Project {
	public readonly _id: string;
	public name: string;
	public description: string | null;
	public createdAt: number;
	public deadline: number;
	public gitHubURL: string;
	public readonly assignedUsers: User[];
	public readonly wallet;

	public constructor(client: LuyxClient, { _id, assignedUsers, createdAt, deadline, description, gitHubURL, name, wallet }: Project) {
		super(client);

		this._id = _id;
		this.name = name;
		this.description = description;
		this.createdAt = createdAt;
		this.deadline = deadline;
		this.gitHubURL = gitHubURL;
		this.assignedUsers = assignedUsers;
		this.wallet = wallet;
	}

	public async assign(user: LuyxUser): Promise<boolean> {
		const request = await this.client.rest.put<PutProjectAssignedRouteOptions['Reply']>(`/projects/${this._id}/assigned/${user._id}`);

		if (request.data.message !== StatusCodePhrases.PROJECT_USER_ASSIGNED) {
			throw new Error(`Error assigning user: ${request.data.message}`);
		}

		this.assignedUsers.push(user);

		return true;
	}

	public async unassign(user: LuyxUser): Promise<boolean> {
		const request = await this.client.rest.delete<DeleteProjectAssignedRouteOptions['Reply']>(`/projects/${this._id}/assigned/${user._id}`);

		if (request.data.message !== StatusCodePhrases.PROJECT_USER_UNASSIGNED) {
			throw new Error(`Error unassigning user: ${request.data.message}`);
		}

		this.assignedUsers.splice(this.assignedUsers.indexOf(user), 1);

		return true;
	}

	public edit(data: Project): Promise<LuyxProject> {
		return this.client.projects.edit(this, data);
	}
}