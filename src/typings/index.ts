import { Project, Transaction, User, Wallet } from 'luyx-management-api-types/v1';
import { LuyxProject } from '../structures/Project.js';
import { LuyxTransaction } from '../structures/Transaction.js';
import { LuyxUser } from '../structures/User.js';

export interface DataInterface {
	projects: Project;
	transactions: Transaction;
	users: User;
	wallets: Wallet;
}

export interface DataStructure {
	projects: LuyxProject;
	transactions: LuyxTransaction;
	users: LuyxUser;
	wallets: Wallet;
}

export type DeepPartial<T> = T extends object
	? {
		[P in keyof T]?: DeepPartial<T[P]>;
	}
	: T;