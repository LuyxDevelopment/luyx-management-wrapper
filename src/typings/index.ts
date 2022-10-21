import { Project, Transaction, User } from 'luyx-management-api-types/v1';

export interface DataStructure {
	projects: Project;
	transactions: Transaction;
	users: User;
}

export type DataStructureOption = keyof DataStructure;