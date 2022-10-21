import { Axios } from 'axios';

export class LuyxClient {
	public readonly axios: Axios;

	/**
	 * Use your API token to create a client.
	 * @param token 
	 */
	constructor(token: string) {

		if (!token) throw Error('API token is required for authenitcation.');

		this.axios = new Axios({ baseURL: 'https://api.luyx.dev/v1', headers: { authorization: token } });
	}
}