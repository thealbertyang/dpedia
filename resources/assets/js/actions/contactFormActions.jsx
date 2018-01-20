import axios from 'axios'

export function clearStatus(){
	return function(dispatch){
		dispatch({type: 'CLEAR_STATUS'});
	}
}

export function submitForm(values, type){ 
	return function(dispatch){

		dispatch({type: 'SUBMIT_FORM'});

		axios.post('/api/form/contact/'+type, {...values})
		.then((response) => { 
			console.log(response.data);

			switch(response.data.statusCode){
				case 200: {
					console.log('success');
					setTimeout(() => { dispatch({type: 'SUBMIT_FORM_SUCCESS'}) } , 250);
					break;
				}
			}

		})
		.catch((error) => { 
			console.log(error.response);

			switch(error.response.status){
				case 422: {
					console.log('Validation error');
					dispatch({type: 'SUBMIT_FORM_ERROR', errors: error.response.data.errors});
					break;
				}
				case 409: {
					console.log('409 error');
					dispatch({type: 'SUBMIT_FORM_ERROR', errors: error.response.data.errors});
					break;
				}
			}
		})
	}
}