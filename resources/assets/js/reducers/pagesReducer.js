const reducerName = "PAGES";

export default function pagesReducer(state = {
	busy: null,
	delete: null,
	pendingCreate: null,
	pendingUpdate: null,
	status: null,
	errors: null,
	data: null,
	records: null,
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
		case reducerName+"_SEARCH": {
			state = {...state, busy: true, status: 'searching_resource' }
			break;
		}
		case reducerName+"_SEARCH_SUCCESS": {
			console.log('success search')
			state = {...state, busy: false, status: 'search_resources_success', records: action.payload, results: {...state.results, to: action.to, from: action.from, total: action.total, current: action.current, prev_url: action.prev_url, next_url: action.next_url} }
			break;
		}
		case reducerName+"_SEARCH_ERROR": {
			console.log('what', reducerName);
			state = {...state, busy: false, status: 'search_resource_error' }
			break;
		}		
		case reducerName+"_FETCH": {
			state = {...state, busy: true, status: 'fetching_resource' }
			break;
		}
		case reducerName+"_FETCH_SUCCESS": {
			console.log('review fetch');

			state = {...state, busy: false, data: action.payload, status: 'fetch_resource_success'}
			break;
		}
		case reducerName+"_FETCH_ERROR": {
			console.log('what', reducerName);
			state = {...state, busy: false, status: 'fetch_resource_error' }
			break;
		}
		case reducerName+"_FETCH_ALL": {
			state = {...state, busy: true, status: 'fetching_resources'}
			break;
		}
		case reducerName+"_FETCH_ALL_SUCCESS": {
			console.log('reviews fetch');
			state = {...state, busy: false, status: 'fetch_resources_success', records: action.payload, results: {...state.results, to: action.to, from: action.from, total: action.total, current: action.current, prev_url: action.prev_url, next_url: action.next_url} }
			break;
		}
		case reducerName+"_FETCH_ALL_ERROR": {
			state = {...state, busy: false, status: 'fetch_resources_error' }
			break;
		}
		case reducerName+"_DELETE": {
			state = {...state, busy: true, delete: true, status: 'deleting'}
			break;
		}
		case reducerName+"_DELETE_SUCCESS": {
			state = {...state, busy: false, delete: false, status: 'delete_success'}
			break;
		}
		case reducerName+"_UPDATE": {
			state = {...state, busy: true, pendingUpdate: true, status: 'updating'}
			break;
		}
		case reducerName+"_UPDATE_SUCCESS": {
			state = {...state, busy: false, pendingUpdate: false, status: 'update_success', errors: null}
			break;
		}
		case reducerName+"_UPDATE_ERROR": {
			state = {...state, busy: false, pendingUpdate: false, status: 'update_error', errors: action.errors}
			break;
		}
		case reducerName+"_CREATE": {
			state = {...state, busy: true, pendingCreate: true, status: 'submitting'}
			break;
		}
		case reducerName+"_CREATE_SUCCESS": {
			console.log('create success');
			state = {...state, busy: false, pendingCreate: false, status: 'submit_success'}
			break;
		}
		case reducerName+"_CREATE_ERROR": {
			state = {...state, busy: false, pendingCreate: false, status: 'submit_error', errors: action.errors}
			break;
		}		
		case reducerName+"_CLEAR_STATUS": {
			if(typeof action.payload !== 'undefined'){
				state = {...state, [action.payload]: null}
			}
			else {
				state = {...state, status: null, errors: null, success: null, data: null}
			}
		}
	}

	return state;
};
