export default function contactFormReducer(state = {
	status: null,
	errors: null
}, action) {
	switch(action.type) {
		case "SUBMIT_FORM": {
			state = {...state, status: 'submitting_form'}
			break;
		}	
		case "SUBMIT_FORM_SUCCESS": {
			state = {...state, status: 'submit_form_success', errors: null}
			break;
		}	
		case "SUBMIT_FORM_ERROR": {
			state = {...state, errors: action.errors, status: 'submit_form_error'}
			break;
		}
		case "CLEAR_STATUS": {
			state = {...state, status: null, errors: null, success: null, form: null}
		}
	}

	return state;
};
