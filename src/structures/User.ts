import { AuthorityLevel, PatchUserRouteOptions, User, UserPosition, Wallet } from 'luyx-management-api-types/v1';
import { Base } from './Base.js';
import { LuyxClient } from '../client/LuyxClient.js';

export class LuyxUser extends Base implements User {
	public readonly _id: string;
	public alias: string;
	public firstName: string;
	public lastName: string;
	public contact: User['contact'];
	public hiredAt: number;
	public info: User['info'];
	public positions: UserPosition[];
	public authorityLevel: AuthorityLevel;
	public visibility: 'public' | 'private';
	public readonly projects: number;
	public readonly wallet: Wallet;

	constructor(client: LuyxClient, { _id, alias, firstName, lastName, contact, hiredAt, info, authorityLevel, positions, visibility, wallet, projects }: User) {
		super(client);

		this._id = _id;
		this.alias = alias;
		this.contact = contact;
		this.firstName = firstName;
		this.hiredAt = hiredAt;
		this.info = info;
		this.positions = positions;
		this.lastName = lastName;
		this.authorityLevel = authorityLevel;
		this.visibility = visibility;
		this.projects = projects;
		this.wallet = wallet;
	}

	public getFullName(): string {
		return `${this.firstName} ${this.lastName}`;
	}

	public setAuthority(authorityLevel: AuthorityLevel): Promise<LuyxUser> {
		return this.edit({ authorityLevel });
	}

	public addPosition(position: UserPosition): Promise<LuyxUser> {
		if (this.positions.includes(position.toLowerCase() as UserPosition)) {
			throw new Error('User already has position');
		}

		this.positions.push(position);

		return this.edit({ positions: this.positions });
	}

	public removePosition(position: UserPosition): Promise<LuyxUser> {
		if (!this.positions.includes(position.toLowerCase() as UserPosition)) {
			throw new Error('User does not have position.');
		}

		this.positions.splice(this.positions.indexOf(position), 1);

		return this.edit({ positions: this.positions });
	}

	public setPrivate(visibility: 'public' | 'private'): Promise<LuyxUser> {
		return this.edit({ visibility });
	}

	public edit(data: PatchUserRouteOptions['Body']): Promise<LuyxUser> {
		return this.client.users.edit(this, data);
	}
}