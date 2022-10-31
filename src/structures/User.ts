import { AuthorityLevel, PatchUserRouteOptions, User, UserPosition } from 'luyx-management-api-types/v1';
import { Base } from './Base.js';
import { LuyxClient } from '../client/LuyxClient.js';

export class LuyxUser extends Base implements User {
	public readonly _id;
	public readonly alias;
	public readonly firstName;
	public readonly lastName;
	public readonly contact;
	public readonly hiredAt;
	public readonly info;
	public readonly positions;
	public readonly authorityLevel;
	public readonly isPrivate;
	public readonly projects;
	public readonly wallet;

	constructor(client: LuyxClient, { _id, alias, firstName, lastName, contact, hiredAt, info, authorityLevel, positions, isPrivate, wallet, projects }: User) {
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
		this.isPrivate = isPrivate;
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

	public setPrivate(isPrivate: boolean): Promise<LuyxUser> {
		return this.edit({ isPrivate });
	}

	private edit(data: PatchUserRouteOptions['Body']): Promise<LuyxUser> {
		return this.client.users.edit(this, data);
	}
}