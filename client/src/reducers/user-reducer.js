import { LOGIN_USER } from '../consts';

export default function (state = {}, action) {
	switch (action.type) {
		case LOGIN_USER:
			return { ...state, loginSucces: action.payload };
		default:
			return state;
	}
}
