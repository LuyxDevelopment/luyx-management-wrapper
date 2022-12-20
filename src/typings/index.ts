import { APIProject, APITransaction, APIUser, GetProjectRouteOptions, GetTransactionRouteOptions, GetUserRouteOptions } from 'luyx-management-api-types/v1';

import { LuyxProject } from '../structures/Project.js';
import { LuyxTransaction } from '../structures/Transaction.js';
import { LuyxUser } from '../structures/User.js';

export interface DataInterface {
	projects: APIProject;
	transactions: APITransaction;
	users: APIUser;
}

export interface DataQueryInterface {
	projects: Readonly<GetProjectRouteOptions['Querystring']>;
	transactions: Readonly<GetTransactionRouteOptions['Querystring']>;
	users: Readonly<GetUserRouteOptions['Querystring']>;
}

export interface DataStructure {
	projects: LuyxProject;
	transactions: LuyxTransaction;
	users: LuyxUser;
}