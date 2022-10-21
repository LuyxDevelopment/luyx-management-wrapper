import { User, Wallet } from 'luyx-management-api-types/v1';

export class LuyxUser implements User {
	public readonly _id: string;
	public alias: string | null;
	public contact: User['contact'];
	public firstName: string;
	public lastName: string;
	public info: User['info'];
	public jobTitles: string[];
	public hiredAt: number;
	public projects: number;
	public readonly wallet: Wallet;

	constructor({ _id, alias, contact, firstName, hiredAt, info, jobTitles, lastName, wallet, projects }: User) {
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

	getFullName(): string {
		return `${this.firstName} ${this.lastName}`;
	}
}