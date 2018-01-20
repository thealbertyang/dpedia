export default function searchReducer(state = {
	loaded: false,
	results: null,
	preview_results: null,
	filter: null, 
	status: null,
	filter_status: null,
	searchTerm: null,
	searchCount: null
}, action) {
	switch(action.type) {
		case "SET_RESULTS_FILTER": {
			state = {...state, filter: action.payload, filter_status: 'set_results_filter'}
			break;
		}		
		case "SET_RESULTS_FILTER_SUCCESS": {
			state = {...state, filter_status: 'set_results_filter_success'}
			break;
		}
		case "FETCH_RESULTS": {
			state = {...state, status: 'fetching_results' }
			break;
		}
		case "FETCH_RESULTS_SUCCESS": {
			console.log('action payload', action.payload);
			state = {...state, results: action.payload, searchTerm: action.searchTerm, searchCount: action.searchCount, status: 'fetch_results_success'}
			break;
		}
		case "FETCH_RESULTS_ERROR": {
			state = {...state, status: 'fetch_results_error' }
			break;
		}
		case "FETCH_PREVIEW_RESULTS": {
			state = {...state, status: 'fetching_preview_results' }
			break;
		}
		case "FETCH_PREVIEW_RESULTS_SUCCESS": {
			state = {...state, preview_results: action.payload, status: 'fetch_preview_results_success'}
			break;
		}
		case "FETCH_PREVIEW_RESULTS_ERROR": {
			state = {...state, status: 'fetch_preview_results_error' }
			break;
		}
		case "CLEAR_STATUS": {
			state = {...state, status: null, errors: null, success: null, form: null}
			break;
		}
	}

	return state;
};
