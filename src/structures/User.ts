import { User, Wallet } from 'luyx-management-api-types/v1';
import { Base } from './Base.js';
import { LuyxClient } from '../client/LuyxClient.js';

export class LuyxUser extends Base implements User {
	public readonly _id: string;
	public readonly alias: string | null;
	public readonly contact: User['contact'];
	public readonly firstName: string;
	public readonly lastName: string;
	public readonly info: User['info'];
	public readonly jobTitles: string[];
	public readonly hiredAt: number;
	public projects: number;
	public readonly wallet: Wallet;

	constructor(client: LuyxClient, { _id, alias, contact, firstName, hiredAt, info, jobTitles, lastName, wallet, projects }: User) {
		super(client);

		this._id = _id;
		this.alias = alias;
		this.contact = contact;
		this.firstName = firstName;
		this.hiredAt = hiredAt;
		this.info = info;
		this.jobTitles = jobTitles;
		this.lastName = lastName;
		this.projects = projects;
		this.wallet = wallet;
	}

	public getFullName(): string {
		return `${this.firstName} ${this.lastName}`;
	}
}