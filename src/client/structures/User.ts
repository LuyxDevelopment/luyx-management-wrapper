import { PatchUserRouteOptions, StatusCodePhrases, User, Wallet } from 'luyx-management-api-types/v1';
import { Base } from './Base.js';
import { LuyxClient } from './LuyxClient.js';

export class LuyxUser extends Base implements User {
	public readonly _id: string;
	private _alias: string | null;
	private _contact: User['contact'];
	private _firstName: string;
	private _lastName: string;
	private _info: User['info'];
	private _jobTitles: string[];
	private _hiredAt: number;
	public projects: number;
	public readonly wallet: Wallet;

	constructor(client: LuyxClient, { _id, alias, contact, firstName, hiredAt, info, jobTitles, lastName, wallet, projects }: User) {
		super(client);
		this._id = _id;
		this._alias = alias;
		this._contact = contact;
		this._firstName = firstName;
		this._hiredAt = hiredAt;
		this._info = info;
		this._jobTitles = jobTitles;
		this._lastName = lastName;
		this.projects = projects;
		this.wallet = wallet;
	}

	get alias(): string | null {
		return this._alias;
	}

	get contact(): User['contact'] {
		return this._contact;
	}

	get firstName(): string {
		return this._firstName;
	}

	get lastName(): string {
		return this._lastName;
	}

	get info(): User['info'] {
		return this._info;
	}

	get jobTitles(): string[] {
		return this._jobTitles;
	}

	get hiredAt(): number {
		return this._hiredAt;
	}

	public getFullName(): string {
		return `${this.firstName} ${this.lastName}`;
	}

	public async edit(data: Partial<Pick<User, 'alias' | 'contact' | 'firstName' | 'hiredAt' | 'info' | 'jobTitles' | 'lastName'>>): Promise<User> {
		const request = await this.client.axios.patch<PatchUserRouteOptions['Reply']>(`/users/${this._id}`, data);

		if (request.data.message !== StatusCodePhrases.USER_UPDATED) {
			throw new Error(`Error editing user: ${request.data.message}`);
		}

		this._alias = data.alias ?? this._alias;
		this._contact = data.contact ?? this._contact;
		this._firstName = data.firstName ?? this._firstName;
		this._hiredAt = data.hiredAt ?? this._hiredAt;
		this._info = data.info ?? this._info;
		this._jobTitles = data.jobTitles ?? this._jobTitles;
		this._lastName = data.lastName ?? this._lastName;

		return this;
	}
}