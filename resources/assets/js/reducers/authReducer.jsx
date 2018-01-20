export default function authReducer(state = {
	status: 'loading',
	username: null,
	role: null,
	authenticated: false
}, action) {
	switch(action.type) {
		case "CLEAR_STATUS": {
			state = {...state, status: null, username: null, authenticated: null}
			break;
		}
		case "AUTH_TOKEN": {
			state = {...state, status: 'auth_token'}
			break;			
		}
		case "AUTH_TOKEN_SUCCESS": {
			state = {...state, username: action.username, authenticated: true, role: action.role, status: 'auth_token_success'}
			break;			
		}
		case "AUTH_TOKEN_ERROR": {
			state = {...state, username: null, authenticated: false, status: 'auth_token_error'}
			break;			
		}
		case "AUTH_USER": {
			state = {...state, status: 'auth_user'}
			break;
		}
		case "AUTH_USER_SUCCESS": {
			state = {...state, username: action.username, authenticated: true, role: action.role, status: 'auth_user_success'}
			break;
		}
		case "AUTH_USER_ERROR": {
			state = {...state, username: null, authenticated: false, status: 'auth_user_error'}
			break;
		}
		case "LOGOUT_USER": {
			state = {...state, authenticated: false, status: 'logout'}
			break;
		}
	}
	return state;
};
