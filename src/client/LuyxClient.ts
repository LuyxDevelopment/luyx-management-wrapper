import { Axios } from 'axios';
import { ProjectManager } from '../managers/ProjectManager.js';
import { TransactionManager } from '../managers/TransactionManager.js';
import { UserManager } from '../managers/UserManager.js';

export class LuyxClient {
	public readonly axios: Axios;

	public readonly projects: ProjectManager;
	public readonly transactions: TransactionManager;
	public readonly users: UserManager;

	constructor(token: string) {

		if (!token) throw Error('API token is required for authenitcation.');

		this.axios = new Axios({ baseURL: 'https://api.luyx.dev/v1', headers: { authorization: token } });

		this.projects = new ProjectManager(this);
		this.transactions = new TransactionManager(this);
		this.users = new UserManager(this);
	}
}