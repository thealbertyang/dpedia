import axios from 'axios'
import Cookies from 'universal-cookie'
import {setMsg,clearMsg} from './msgActions'

export function clearStatus(){
	return function(dispatch){
		dispatch({type: 'CLEAR_STATUS'})
	} 
}

export function setFilter(categories){
	return function(dispatch){
		console.log('CATEGORIES', categories);
		dispatch({type: 'SET_RESULTS_FILTER', payload: categories})

		setTimeout(()=>{dispatch({type: 'SET_RESULTS_FILTER_SUCCESS'})}, 250)
	}
}

export function getResults(search, categories, first_load){
	return function(dispatch){
		dispatch({type: 'FETCH_RESULTS'});
		console.log('search', search);

		axios.get('/api/resources?search=true&'+((search == 'all' || search == '') ? 'all=true' : 'term='+search)+((categories && categories !== 'all')? '&categories=['+categories+']' : '&categories=all'))
		.then((response) => {

			let searchCount = 0;

			if(response.data){
				for(let i = 0; i < response.data.length; i++){
					if(response.data[i].data){
						searchCount += response.data[i].data.length;
					}
				}
			}

			console.log('first load', first_load);
			if(first_load == true){
				dispatch({type: 'FETCH_RESULTS_SUCCESS', payload: response.data, searchTerm: search, searchCount: searchCount })
			}
			else {
				setTimeout(()=>{dispatch({type: 'FETCH_RESULTS_SUCCESS', payload: response.data, searchTerm: search, searchCount: searchCount })}, 150);
			}
		})
		.catch((err) => { 
			console.log('error', err);
			dispatch({type: 'FETCH_RESULTS_ERROR', payload: null}) 
		})
	}
}

export function getResources(pageNumber){
	return function(dispatch){	
		const cookies = new Cookies();
		axios.get('/api/resources?token='+cookies.get('token')+(pageNumber ? '&page='+pageNumber : ''))
		.then((response) => {
			dispatch({type: 'FETCH_RESOURCES_SUCCESS', payload: pageNumber == 'all' ? response.data : response.data.data, to: response.data.to, from: response.data.from, total: response.data.total, current: response.data.current_page, prev_url: response.data.prev_page_url, next_url: response.data.next_page_url})
		})
		.catch((err) => { 
			dispatch({type: 'FETCH_RESOURCES_ERROR', payload: null}) 
		})
	}
}

export function update(values){
	return function(dispatch){
		dispatch({type: 'UPDATE_RESOURCE'});
		const cookies = new Cookies();
		

		axios.post('/api/resources/1', { ...values, '_method': 'PUT'}, { headers: { 'Content-Type': 'multipart/form-data', 'Authorization': "bearer" + cookies.get('token') } })
		.then((response) => { 
			console.log(response.data);

			switch(response.data.statusCode){
				case 200: {
					console.log('success');
					setTimeout(() => { 
						dispatch({type: 'UPDATE_SUCCESS'})
						dispatch(setMsg('success', 'update', response.data.message, 'EDIT'))
					} , 250);
					break;
				}
			}

		})
		.catch((error) => { 
			console.log(error.response);

			switch(error.response.status){
				case 422: {
					console.log('Validation error');
					dispatch({type: 'SUBMIT_ERROR', errors: error.response.data.errors});
					dispatch(setMsg('error', 'update', error.response.data.message, 'EDIT'))
					break;
				}
				case 409: {
					console.log('409 error');
					dispatch({type: 'SUBMIT_ERROR', errors: error.response.data.errors});

					break;
				}
			}
		})
	}
}

export function deleteResource(id){
	return function(dispatch){
		dispatch({type: 'DELETE_RESOURCE'});
		const cookies = new Cookies();

		axios.delete('/api/resources/'+id+'?token='+cookies.get('token'))
		.then((response) => { 
			console.log(response.data);

			switch(response.data.statusCode){
				case 200: {
					console.log('success');
					setTimeout(() => { 
						dispatch({type: 'DELETE_SUCCESS'})
						dispatch(getUsers())
					} , 250);
					break;
				}
			}

		})
		.catch((error) => { 
			console.log(error.response);

			switch(error.response.status){
				case 422: {
					console.log('Validation error');
					dispatch({type: 'SUBMIT_ERROR', errors: error.response.data.errors});
					break;
				}
				case 409: {
					console.log('409 error');
					dispatch({type: 'SUBMIT_ERROR', errors: error.response.data.errors});
					break;
				}
			}
		})
	}
}

export function submitForm(values){
	return function(dispatch){

		dispatch({type: 'SUBMIT_RESOURCES'});

		const cookies = new Cookies();
		axios.post('/api/resources?token='+cookies.get('token'), values)
		.then((response) => { 
			console.log(response.data);

			switch(response.data.statusCode){
				case 200: {
					setTimeout(() => { 
						dispatch({type: 'SUBMIT_SUCCESS'})
						dispatch(setMsg('success', 'submit', response.data.message, 'INDEX'))
					} , 250);
					break;
				}
			}

		})
		.catch((error) => { 
			console.log(error.response);

			switch(error.response.status){
				case 422: {
					console.log('Validation error');
					dispatch({type: 'SUBMIT_ERROR', errors: error.response.data.errors});
					dispatch(setMsg('error', 'submit', error.response.data.message, 'CREATE'))
					break;
				}
				case 409: {
					console.log('409 error');
					dispatch({type: 'SUBMIT_ERROR', errors: error.response.data.errors});
					dispatch(setMsg('error', 'update', error.response.data.message, 'CREATE'))
					break;
				}
			}
		})
	}
}
