import axios from 'axios'
import Cookies from 'universal-cookie'
import { setMsg,clearMsg } from './msgActions'

const actionName = 'TAGS';
const apiName = 'tags';

export function clearStatus(name){
	return function(dispatch){
		dispatch({type: actionName+'_CLEAR_STATUS', payload: name})
	}
} 

export function crudGet(id){
	return function(dispatch){	
		dispatch({type: actionName+'_FETCH'})
		const cookies = new Cookies();
		axios.get('/api/'+apiName+'/'+id+'?token='+cookies.get('token'))
		.then((response) => {
			dispatch({type: actionName+'_FETCH_SUCCESS', payload: response.data})
		})
		.catch((err) => { 
			dispatch({type: actionName+'_FETCH_ERROR', payload: null}) 
		})
	}
}

export function crudGetAll(pageNumber){
	return function(dispatch){	
		dispatch({type: actionName+'_FETCH_ALL'});
		const cookies = new Cookies();
		axios.get('/api/'+apiName+'?token='+cookies.get('token')+(pageNumber ? '&page='+pageNumber : ''))
		.then((response) => {
			dispatch({type: actionName+'_FETCH_ALL_SUCCESS', payload: pageNumber == 'all' ? response.data : response.data.data, to: response.data.to, from: response.data.from, total: response.data.total, current: response.data.current_page, prev_url: response.data.prev_page_url, next_url: response.data.next_page_url})
		})
		.catch((err) => { 
			dispatch({type: actionName+'_FETCH_ALL_ERROR', payload: null}) 
		})
	}
}
function objectToArray(obj){
	return Object.keys(obj).map((key)=>[Number(key), obj[key]]);
}

export function crudUpdate(values){
	return function(dispatch){
		dispatch({type: actionName+'_UPDATE'});
		const cookies = new Cookies();

		let xhr = new XMLHttpRequest();
		xhr.open('POST','/api/'+apiName+'/'+values.id, true);
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
						dispatch({type: actionName+'_UPDATE_SUCCESS'})
						dispatch(setMsg('success', 'update', response.message, 'EDIT'))
					} , 250);
					break;
				}
				case 422: {
					dispatch({type: actionName+'_UPDATE_ERROR', errors: response.errors});
					dispatch(setMsg('error', 'update', response.message, 'EDIT'))
					break;
				}
				case 409: {
					dispatch({type: actionName+'_UPDATE_ERROR', errors: response.errors});
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

export function crudDelete(id){
	return function(dispatch){
		dispatch({type: actionName+'_DELETE'});
		const cookies = new Cookies();
		axios.delete('/api/'+apiName+'/'+id+'?token='+cookies.get('token'))
		.then((response) => { 
			switch(response.data.statusCode){
				case 200: {
					setTimeout(() => { 
						dispatch({type: actionName+'_DELETE_SUCCESS'})
						dispatch(crudGetAll())
					} , 250);
					break;
				}
			}

		})
		.catch((error) => { 
			console.log(error.response);

			switch(error.response.status){
				case 422: {
					dispatch({type: actionName+'_DELETE_ERROR', errors: error.response.data.errors});
					break;
				}
				case 409: {
					dispatch({type: actionName+'_DELETE_ERROR', errors: error.response.data.errors});
					break;
				}
			}
		})
	}
}

export function crudCreate(values){
	return function(dispatch){
		dispatch({type: actionName+'_CREATE'});
		const cookies = new Cookies();

		let xhr = new XMLHttpRequest();
		xhr.open('POST','/api/'+apiName+'', true);
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
						dispatch({type: actionName+'_CREATE_SUCCESS'})
						dispatch(setMsg('success', 'submit', response.message, 'INDEX'))
					} , 250);
					break;
				}
				case 422: {
					dispatch({type: actionName+'_CREATE_ERROR', errors: response.errors});
					dispatch(setMsg('error', 'submit', response.message, 'CREATE'))
					break;
				}
				case 409: {
					dispatch({type: actionName+'_CREATE_ERROR', errors: response.errors});
					dispatch(setMsg('error', 'submit', response.message, 'CREATE'))
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
