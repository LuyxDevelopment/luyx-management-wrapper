/* eslint-disable require-await */
import { DeleteProjectAssignedRouteOptions, Project, PutProjectAssignedRouteOptions, StatusCodePhrases } from 'luyx-management-api-types/v1';
import { Base } from './Base.js';
import { LuyxClient } from '../client/LuyxClient.js';
import { LuyxUser } from './User.js';

export class LuyxProject extends Base implements Project {
	public readonly _id;
	public readonly name;
	public readonly description;
	public readonly createdAt;
	public readonly deadline;
	public readonly gitHubURL;
	public readonly assignedUsers;
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

		this.assignedUsers.push(user._id);

		return true;
	}

	public async unassign(user: LuyxUser): Promise<boolean> {
		const request = await this.client.rest.delete<DeleteProjectAssignedRouteOptions['Reply']>(`/projects/${this._id}/assigned/${user._id}`);

		if (request.data.message !== StatusCodePhrases.PROJECT_USER_UNASSIGNED) {
			throw new Error(`Error unassigning user: ${request.data.message}`);
		}

		this.assignedUsers.splice(this.assignedUsers.indexOf(user._id), 1);

		return true;
	}

	private edit(data: Project): Promise<LuyxProject> {
		return this.client.projects.edit(this, data);
	}
}