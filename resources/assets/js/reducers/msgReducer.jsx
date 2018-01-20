export default function msgReducer(state = {
	page: null,
	action: null,
	status: null,
	message: null,
	error: null,
	success: null
}, action) {
	switch(action.type) {
		case "SET_MSG": {
			state = {...state, status: action.status, action: action.action, message: action.message, page: action.page }
			break;
		}
		case "CLEAR_MSG": {
			state = {...state, status: null, message: null, success: null, error: null}
			break;
		}
	}

	return state;
};
