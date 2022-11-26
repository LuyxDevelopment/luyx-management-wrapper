import {
	APIUser, AuthorityLevel, PatchUserRouteOptions, UserPositionTitle, UserSubPosition,
} from 'luyx-management-api-types/v1';

import { LuyxClient } from '../client/LuyxClient.js';
import { Base } from './Base.js';

export class LuyxUser extends Base implements APIUser {
	public readonly _id;
	public readonly alias;
	public readonly avatar;
	public readonly firstName;
	public readonly lastName;
	public readonly contact;
	public readonly hiredAt;
	public readonly info;
	public readonly position: UserPositionTitle;
	public readonly subPositions: UserSubPosition[];
	public readonly authorityLevel;
	public readonly isPrivate;
	public readonly projects;
	public readonly wallet;

	constructor(client: LuyxClient, { _id, alias, avatar, firstName, lastName, contact, hiredAt, info, authorityLevel, position, subPositions, isPrivate, wallet, projects }: APIUser) {
		super(client);

		this._id = _id;
		this.alias = alias;
		this.avatar = avatar;
		this.contact = contact;
		this.firstName = firstName;
		this.hiredAt = hiredAt;
		this.info = info;
		this.position = position;
		this.subPositions = subPositions;
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

	public addSubPosition(position: UserSubPosition): Promise<LuyxUser> {
		if (this.subPositions.includes(position.toLowerCase() as UserSubPosition)) {
			throw new Error('User already has position');
		}

		this.subPositions.push(position);

		return this.edit({ subPositions: this.subPositions });
	}

	public removeSubPosition(position: UserSubPosition): Promise<LuyxUser> {
		if (!this.subPositions.includes(position.toLowerCase() as UserSubPosition)) {
			throw new Error('User does not have position.');
		}

		this.subPositions.splice(this.subPositions.indexOf(position), 1);

		return this.edit({ subPositions: this.subPositions });
	}

	public setPositionTitle(position: UserPositionTitle): Promise<LuyxUser> {
		return this.edit({ position });
	}

	public setPrivate(isPrivate: boolean): Promise<LuyxUser> {
		return this.edit({ isPrivate });
	}

	private edit(data: PatchUserRouteOptions['Body']): Promise<LuyxUser> {
		return this.client.users.edit(this, data);
	}
}