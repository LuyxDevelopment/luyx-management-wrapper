import { APIProject, APITransaction, APIUser } from 'luyx-management-api-types/v1';

import { LuyxProject } from '../structures/Project.js';
import { LuyxTransaction } from '../structures/Transaction.js';
import { LuyxUser } from '../structures/User.js';

export interface DataInterface {
	projects: APIProject;
	transactions: APITransaction;
	users: APIUser;
}

export interface DataStructure {
	projects: LuyxProject;
	transactions: LuyxTransaction;
	users: LuyxUser;
}