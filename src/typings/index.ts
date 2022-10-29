import { PostProjectRouteOptions, PostTransactionRouteOptions, PostUserRouteOptions, Project, Transaction, User } from 'luyx-management-api-types/v1';
import { LuyxProject } from '../structures/Project.js';
import { LuyxTransaction } from '../structures/Transaction.js';
import { LuyxUser } from '../structures/User.js';

export interface DataBuild {
	projects: PostProjectRouteOptions['Body'];
	transactions: PostTransactionRouteOptions['Body'];
	users: PostUserRouteOptions['Body'];
}

export interface DataInterface {
	projects: Project;
	transactions: Transaction;
	users: User;
}

export interface DataStructure {
	projects: LuyxProject;
	transactions: LuyxTransaction;
	users: LuyxUser;
}

export type DeepPartial<T> = T extends object
	? {
		[P in keyof T]?: DeepPartial<T[P]>;
	}
	: T;