import { Project, Transaction, User } from 'luyx-management-api-types/v1';
import { LuyxProject } from '../structures/Project.js';
import { LuyxTransaction } from '../structures/Transaction.js';
import { LuyxUser } from '../structures/User.js';

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