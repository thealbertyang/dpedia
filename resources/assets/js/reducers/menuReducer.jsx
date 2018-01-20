export default function menuReducer(state = {
	pathname: null
}, action) {
	switch(action.type) {
		case "MENU_ACTIVATE": {
			state = {...state, pathname: action.payload }
			break;
		}
	}
	return state;
};
