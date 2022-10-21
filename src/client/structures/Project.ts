/* eslint-disable require-await */
import { AxiosResponse } from 'axios';
import { DeleteProjectAssignedRouteOptions, Project, PutProjectAssignedRouteOptions, User, Wallet } from 'luyx-management-api-types/v1';
import { Base } from './Base.js';
import { LuyxClient } from './LuyxClient.js';
import { LuyxUser } from './User.js';

export class LuyxProject extends Base implements Project {
	public readonly _id: string;
	public name: string;
	public description: string;
	public createdAt: number;
	public deadline: number;
	public gitHubURL: string;
	public wallet: Wallet;
	public assignedUsers: User[];

	constructor(client: LuyxClient, { _id, assignedUsers, createdAt, deadline, description, gitHubURL, name, wallet }: Project) {
		super(client);

		this._id = _id;
		this.name = name;
		this.description = description;
		this.createdAt = createdAt;
		this.deadline = deadline;
		this.gitHubURL = gitHubURL;
		this.wallet = wallet;
		this.assignedUsers = assignedUsers;
	}

	public async assign(user: LuyxUser): Promise<boolean> {
		return this.client.axios.put(`/projects/${this._id}/assigned`, user);
	}

	public async unassign(user: LuyxUser): Promise<AxiosResponse<DeleteProjectAssignedRouteOptions['Reply']>> {
		return this.client.axios.delete(`/projects/${this._id}/assigned`);
	}
}