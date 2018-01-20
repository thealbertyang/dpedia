import axios from 'axios'
import Cookies from 'universal-cookie'
import { setMsg,clearMsg } from './msgActions'

export default class crudActions { 
	constructor(actionName, apiName){
		this.actionName = actionName;
		this.apiName = apiName;
	}

	test() {
		console.log("hi");
		return "hi";
	}

	getRelated = (id) =>
	{
		return (dispatch) =>
		{
			let pageNumber = null;
			dispatch({type: this.actionName+'_FETCH_RELATED'})
			const cookies = new Cookies();
			axios.get('/api/'+this.apiName+'/'+id+'/related?token='+cookies.get('token'))
			.then((response) => {
				console.log('hiyah');
				dispatch({type: this.actionName+'_FETCH_RELATED_SUCCESS', payload: response.data})
			
			})
			.catch((err) => { 
				console.log('error', err);
				dispatch({type: this.actionName+'_FETCH_RELATED_ERROR', payload: null}) 
			})
		}
	}

	search = (term, filter = null) =>
	{
		return (dispatch) =>
		{
			let pageNumber = null;
			dispatch({type: this.actionName+'_SEARCH'})
			const cookies = new Cookies();
			axios.get('/api/'+this.apiName+'/search/'+term+(filter ? '/'+filter : '')+'?token='+cookies.get('token'))
			.then((response) => {
				console.log('hiyah');
				dispatch({type: this.actionName+'_SEARCH_SUCCESS', payload: pageNumber == 'all' ? response.data : response.data.data, to: response.data.to, from: response.data.from, total: response.data.total, current: response.data.current_page, prev_url: response.data.prev_page_url, next_url: response.data.next_page_url})
			
			})
			.catch((err) => { 
				console.log('error', err);
				dispatch({type: this.actionName+'_SEARCH_ERROR', payload: null}) 
			})
		}
	}

	get = (id) =>
	{
		return (dispatch) => {	
			dispatch({type: this.actionName+'_FETCH'})
			const cookies = new Cookies();
			axios.get('/api/'+this.apiName+'/'+id+'?token='+cookies.get('token'))
			.then((response) => {
				dispatch({type: this.actionName+'_FETCH_SUCCESS', payload: response.data})
			})
			.catch((err) => { 
				console.log('error', err);
				dispatch({type: this.actionName+'_FETCH_ERROR', payload: null}) 
			})
		}
	}

	getAll = (pageNumber) => 
	{
		return (dispatch) => {	
			dispatch({type: this.actionName+'_FETCH_ALL'});
			const cookies = new Cookies();
			axios.get('/api/'+this.apiName+'?token='+cookies.get('token')+(pageNumber ? '&page='+pageNumber : ''))
			.then((response) => {
				dispatch({type: this.actionName+'_FETCH_ALL_SUCCESS', payload: pageNumber == 'all' ? response.data : response.data.data, to: response.data.to, from: response.data.from, total: response.data.total, current: response.data.current_page, prev_url: response.data.prev_page_url, next_url: response.data.next_page_url})
			})
			.catch((err) => { 
				dispatch({type: this.actionName+'_FETCH_ALL_ERROR', payload: null}) 
			})
		}
	}

	create = (values) => {
		return (dispatch) => {
			dispatch({type: this.actionName+'_CREATE'});
			const cookies = new Cookies();

			let xhr = new XMLHttpRequest();
			xhr.open('POST','/api/'+this.apiName+'', true);
			xhr.setRequestHeader('Authorization', 'Bearer ' + cookies.get('token'));

			let formData = new FormData();
			Object.keys(values).map((key, index)=>{
				values[key] && formData.append(key, values[key]);
			});

			xhr.send(formData);
			xhr.onload = (e) => {
			  if (xhr.readyState === 4) {
			  	let response = JSON.parse(xhr.response);
			    switch(xhr.status) {
			    	case 200: {
			      		setTimeout(() => { 
							dispatch({type: this.actionName+'_CREATE_SUCCESS'})
							dispatch(setMsg('success', 'submit', response.message, 'INDEX'))
						} , 250);
						break;
					}
					case 422: {
						dispatch({type: this.actionName+'_CREATE_ERROR', errors: response.errors});
						dispatch(setMsg('error', 'submit', response.message, 'CREATE'))
						break;
					}
					case 409: {
						dispatch({type: this.actionName+'_CREATE_ERROR', errors: response.errors});
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

	delete = (id) => {
		return (dispatch) => {
			dispatch({type: this.actionName+'_DELETE'});
			const cookies = new Cookies();
			axios.delete('/api/'+this.apiName+'/'+id+'?token='+cookies.get('token'))
			.then((response) => { 
				switch(response.data.statusCode){
					case 200: {
						setTimeout(() => { 
							dispatch({type: this.actionName+'_DELETE_SUCCESS'})
							dispatch(this.getAll())
						} , 250);
						break;
					}
				}

			})
			.catch((error) => { 
				console.log(error.response);

				switch(error.response.status){
					case 422: {
						dispatch({type: this.actionName+'_DELETE_ERROR', errors: error.response.data.errors});
						break;
					}
					case 409: {
						dispatch({type: this.actionName+'_DELETE_ERROR', errors: error.response.data.errors});
						break;
					}
				}
			})
		}
	}

	update = (values) => {
		return (dispatch) => {
			dispatch({type: this.actionName+'_UPDATE'});
			const cookies = new Cookies();

			let xhr = new XMLHttpRequest();
			xhr.open('POST','/api/'+this.apiName+'/'+values.id, true);
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
							dispatch({type: this.actionName+'_UPDATE_SUCCESS'})
							dispatch(setMsg('success', 'update', response.message, 'UPDATE'))
						} , 250);
						break;
					}
					case 422: {
						dispatch({type: this.actionName+'_UPDATE_ERROR', errors: response.errors});
						dispatch(setMsg('error', 'update', response.message, 'UPDATE'))
						break;
					}
					case 409: {
						dispatch({type: this.actionName+'_UPDATE_ERROR', errors: response.errors});
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

	clearStatus = (name) => {
		return (dispatch) => {
			dispatch({type: this.actionName+'_CLEAR_STATUS', payload: name})
		}
	}
}

export function search(term)
{
	return function(dispatch)
	{
		let pageNumber = null;
		dispatch({type: actionName+'_SEARCH'})
		const cookies = new Cookies();
		axios.get('/api/'+apiName+'/search/'+term+'?token='+cookies.get('token'))
		.then((response) => {
			dispatch({type: actionName+'_SEARCH_SUCCESS', payload: pageNumber == 'all' ? response.data : response.data.data, to: response.data.to, from: response.data.from, total: response.data.total, current: response.data.current_page, prev_url: response.data.prev_page_url, next_url: response.data.next_page_url})
		
		})
		.catch((err) => { 
			console.log('error', err);
			dispatch({type: actionName+'_SEARCH_ERROR', payload: null}) 
		})
	}
}

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
			console.log('error', err);
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
						dispatch(setMsg('success', 'update', response.message, 'UPDATE'))
					} , 250);
					break;
				}
				case 422: {
					dispatch({type: actionName+'_UPDATE_ERROR', errors: response.errors});
					dispatch(setMsg('error', 'update', response.message, 'UPDATE'))
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
