export default function categoriesReducer(state = {
	categories: null,
	status: null,
	errors: null,
	form: null,
	data: null,
	results: { 
		to: null, 
		from: null,
		total: null,
		current: null,
		prev_url: null,
		next_url: null
	}
}, action) {
	switch(action.type) {
		case "FETCH_FULL_CATEGORIES_SUCCESS": {
			state = {...state, status: 'fetch_categories_success', categories: action.payload, results: {...state.results, to: action.to, from: action.from, total: action.total, current: action.current, prev_url: action.prev_url, next_url: action.next_url}}
			break;
		}		
		case "FETCH_FULL_CATEGORY_SUCCESS": {
			state = {...state, form: action.payload, status: 'fetch_category_success'}
			break;
		}
		case "DELETE_SUCCESS": {
			state = {...state, status: 'delete_success'}
			break;
		}
		case "UPDATE_RESOURCE": {
			state = {...state, status: 'updating'}
			break;
		}
		case "UPDATE_SUCCESS": {
			state = {...state, status: 'update_success', errors: null}
			break;
		}
		case "SUBMIT_RESOURCES": {
			state = {...state, status: 'submitting'}
			break;
		}
		case "SUBMIT_SUCCESS": {
			state = {...state, status: 'submit_success'}
			break;
		}
		case "SUBMIT_ERROR": {
			state = {...state, status: 'submit_error', errors: action.errors}
			break;
		}		
		case "CLEAR_STATUS": {
			state = {...state, status: null, errors: null, success: null, form: null}
		}
	}

	return state;
};
