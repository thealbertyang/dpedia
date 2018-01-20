import axios from 'axios'
import Cookies from 'universal-cookie'
import {setMsg,clearMsg} from './msgActions'

export function clearStatus(){
	return function(dispatch){
		dispatch({type: 'CLEAR_STATUS'})
	}
}

export function getExperts(pageNumber){
	return function(dispatch){	
		const cookies = new Cookies();
		axios.get('/api/experts?token='+cookies.get('token')+(pageNumber ? '&page='+pageNumber : ''))
		.then((response) => {
			console.log(response.data);
			dispatch({type: 'FETCH_EXPERTS_SUCCESS', payload: response.data.data, to: response.data.to, from: response.data.from, total: response.data.total, current: response.data.current_page, prev_url: response.data.prev_page_url, next_url: response.data.next_page_url})
		})
		.catch((err) => { 
			dispatch({type: 'FETCH_EXPERTS_ERROR', payload: null}) 
		})
	}
}

export function getExpert(id){
	return function(dispatch){	
		dispatch({type: 'FETCH_EXPERTS'})
		const cookies = new Cookies();
		axios.get('/api/experts/'+id+'/?token='+cookies.get('token'))
		.then((response) => {
			console.log(response.data);
			dispatch({type: 'FETCH_EXPERT_SUCCESS', form: response.data })
		})
		.catch((err) => { 
			dispatch({type: 'FETCH_EXPERT_ERROR', form: null}) 
		})
	}
}

export function getResources(pageNumber){
	return function(dispatch){	
		const cookies = new Cookies();
		axios.get('/api/resources?token='+cookies.get('token')+(pageNumber ? '&page='+pageNumber : ''))
		.then((response) => {
			dispatch({type: 'FETCH_RESOURCES_SUCCESS', payload: response.data.data, to: response.data.to, from: response.data.from, total: response.data.total, current: response.data.current_page, prev_url: response.data.prev_page_url, next_url: response.data.next_page_url})
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

		let xhr = new XMLHttpRequest();
		xhr.open('POST','/api/experts/'+values.id, true);
		xhr.setRequestHeader('Authorization', 'Bearer ' + cookies.get('token'));

		let formData = new FormData();
		formData.append('_method', 'PATCH');

		Object.keys(values).map((key, index)=>{
			values[key] && formData.append(key, values[key]);
		});

		xhr.send(formData);
		xhr.onload = function (e) {
		  if (xhr.readyState === 4) {
		  	let response = JSON.parse(xhr.response);
		    switch(xhr.status) {
		    	case 200: {
		      		setTimeout(() => { 
						dispatch({type: 'UPDATE_SUCCESS'})
						dispatch(setMsg('success', 'update', response.message, 'EDIT'))
					} , 250);
					break;
				}
				case 422: {
					console.log('Validation error');
					dispatch({type: 'SUBMIT_ERROR', errors: response.errors});
					dispatch(setMsg('error', 'update', response.message, 'EDIT'))
					break;
				}
				case 409: {
					console.log('409 error');
					dispatch({type: 'SUBMIT_ERROR', errors: response.errors});
					break;
				}
				default: {
		      		console.error('error', xhr);
				}
		    } 
		  }
		};
	}
}

export function del(id){
	return function(dispatch){
		dispatch({type: 'DELETE_RESOURCE'});
		const cookies = new Cookies();

		axios.delete('/api/experts/'+id+'?token='+cookies.get('token'))
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

export function crudStore(values){
	return function(dispatch){

		dispatch({type: 'SUBMIT_RESOURCES'});
		const cookies = new Cookies();

		let xhr = new XMLHttpRequest();
		xhr.open('POST','/api/experts', true);
		xhr.setRequestHeader('Authorization', 'Bearer ' + cookies.get('token'));

		let formData = new FormData();
		Object.keys(values).map((key, index)=>{
			values[key] && formData.append(key, values[key]);
		});

		xhr.send(formData);
		xhr.onload = function (e) {
		  if (xhr.readyState === 4) {
		  	let response = JSON.parse(xhr.response);
		    switch(xhr.status) {
		    	case 200: {
		      		setTimeout(() => { 
						dispatch({type: 'SUBMIT_SUCCESS'})
						dispatch(setMsg('success', 'submit', response.message, 'INDEX'))
					} , 250);
					break;
				}
				case 422: {
					console.log('Validation error');
					dispatch({type: 'SUBMIT_ERROR', errors: response.errors});
					dispatch(setMsg('error', 'submit', response.message, 'CREATE'))
					break;
				}
				case 409: {
					console.log('409 error');
					dispatch({type: 'SUBMIT_ERROR', errors: response.errors});
					dispatch(setMsg('error', 'submit', response.message, 'CREATE'))
					break;
				}
				default: {
		      		console.error('error', xhr);
				}
		    } 
		  }
		};

		/*
		axios.post('/api/experts?token='+cookies.get('token'), values)
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
					dispatch(setMsg('error', 'submit', error.response.data.message, 'CREATE'))
					break;
				}
			}
		})*/
	}
}
