export default function appReducer(state = {
	loggedIn: false
}, action) {
	switch(action.type) {
		case "LOGIN": {
			state = {...state, loggedIn: action.payload}
			break;
		}
		case "LOGOUT": {
			state = {...state, loggedIn: action.payload}
			break;
		}
	}
	return state;
};