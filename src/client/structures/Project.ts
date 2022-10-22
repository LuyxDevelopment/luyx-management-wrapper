/* eslint-disable require-await */
import { DeleteProjectAssignedRouteOptions, PatchProjectRouteOptions, Project, PutProjectAssignedRouteOptions, StatusCodePhrases, User } from 'luyx-management-api-types/v1';
import { Base } from './Base.js';
import { LuyxClient } from './LuyxClient.js';
import { LuyxUser } from './User.js';

export class LuyxProject extends Base implements Project {
	public readonly _id: string;

	private _name: string;
	private _description: string;
	private _createdAt: number;
	private _deadline: number;
	private _gitHubURL: string;
	public readonly assignedUsers: User[];
	public readonly wallet;

	constructor(client: LuyxClient, { _id, assignedUsers, createdAt, deadline, description, gitHubURL, name, wallet }: Project) {
		super(client);

		this._id = _id;
		this._name = name;
		this._description = description;
		this._createdAt = createdAt;
		this._deadline = deadline;
		this._gitHubURL = gitHubURL;
		this.assignedUsers = assignedUsers;
		this.wallet = wallet;
	}

	public get name(): string {
		return this._name;
	}

	public get description(): string {
		return this._description;
	}
	public get createdAt(): number {
		return this._createdAt;
	}

	public get deadline(): number {
		return this._deadline;
	}

	public get gitHubURL(): string {
		return this._gitHubURL;
	}

	public async assign(user: LuyxUser): Promise<boolean> {
		const request = await this.client.axios.put<PutProjectAssignedRouteOptions['Reply']>(`/projects/${this._id}/assigned/${user._id}`);

		if (request.data.message !== StatusCodePhrases.PROJECT_USER_ASSIGNED) {
			throw new Error(`Error assigning user: ${request.data.message}`);
		}

		this.assignedUsers.push(user);

		return true;
	}

	public async unassign(user: LuyxUser): Promise<boolean> {
		const request = await this.client.axios.delete<DeleteProjectAssignedRouteOptions['Reply']>(`/projects/${this._id}/assigned/${user._id}`);

		if (request.data.message !== StatusCodePhrases.PROJECT_USER_UNASSIGNED) {
			throw new Error(`Error unassigning user: ${request.data.message}`);
		}

		this.assignedUsers.splice(this.assignedUsers.indexOf(user), 1);

		return true;
	}

	public async edit(data: Partial<Pick<Project, 'createdAt' | 'deadline' | 'description' | 'gitHubURL' | 'name'>>): Promise<Project> {
		const request = await this.client.axios.patch<PatchProjectRouteOptions['Reply']>(`/projects/${this._id}`, data);

		if (request.data.message !== StatusCodePhrases.PROJECT_UPDATED) {
			throw new Error(`Error editing project: ${request.data.message}`);
		}

		this._name = data.name ?? this._name;
		this._description = data.description ?? this._description;
		this._createdAt = data.createdAt ?? this._createdAt;
		this._deadline = data.deadline ?? this._deadline;
		this._gitHubURL = data.gitHubURL ?? this._gitHubURL;

		return this;
	}
}