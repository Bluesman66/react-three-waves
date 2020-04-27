import { LOGIN_USER } from './types';
import { USER_SERVER } from '../components/utils/misc';
import axios from 'axios';

export function loginUser(dataToSubmit) {
	const request = axios.post(`${USER_SERVER}/login`, dataToSubmit).then((response) => response.data);

	return {
		type: LOGIN_USER,
		payload: request,
	};
}
