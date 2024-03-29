/* eslint-disable require-await */
import {
	APIProject, DeleteProjectAssignedRouteOptions, PutProjectAssignedRouteOptions, StatusCodePhrases,
} from 'luyx-management-api-types/v1';

import { LuyxClient } from '../client/LuyxClient.js';
import { Base } from './Base.js';
import { LuyxUser } from './User.js';

export class LuyxProject extends Base implements APIProject {
	public readonly _id;
	public readonly name;
	public readonly contact;
	public readonly createdAt;
	public readonly description;
	public readonly deadline;
	public readonly imageURL;
	public readonly isPrivate;
	public readonly stage;
	public readonly assignedUsers;
	public readonly wallet;

	public constructor(client: LuyxClient, { _id, name, contact, createdAt, deadline, description, imageURL, isPrivate, stage, assignedUsers, wallet }: APIProject) {
		super(client);

		this._id = _id;
		this.name = name;
		this.contact = contact;
		this.createdAt = createdAt;
		this.description = description;
		this.deadline = deadline;
		this.imageURL = imageURL;
		this.isPrivate = isPrivate;
		this.stage = stage;
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

	private edit(data: APIProject): Promise<LuyxProject> {
		return this.client.projects.edit(this, data);
	}
}