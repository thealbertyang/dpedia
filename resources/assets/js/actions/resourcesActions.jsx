import axios from 'axios'
import Cookies from 'universal-cookie'
import {setMsg,clearMsg} from './msgActions'

export function clearStatus(name){
	return function(dispatch){
		dispatch({type: 'CLEAR_STATUS', payload: name})
	}
} 

export function getExperts(pageNumber){
	return function(dispatch){	
		const cookies = new Cookies();
		axios.get('/api/experts?token='+cookies.get('token')+(pageNumber ? '&page='+pageNumber : ''))
		.then((response) => {
			console.log('experts response', response.data);
			let teststate = {};
			dispatch({type: 'FETCH_EXPERTS_SUCCESS', payload: response.data.data.map((result)=>{ return {...teststate, 'value': result.id, 'label': (result.first_name+' '+result.last_name) } })})
		
		})
		.catch((err) => { 
			dispatch({type: 'FETCH_EXPERTS_ERROR', payload: null}) 
		})
	}
}

export function getCategories(pageNumber){
	return function(dispatch){	
		const cookies = new Cookies();
		axios.get('/api/categories?token='+cookies.get('token')+(pageNumber ? '&page='+pageNumber : ''))
		.then((response) => {
			console.log(response.data);
			let teststate = {};

			dispatch({type: 'FETCH_CATEGORIES_SUCCESS', payload: response.data.map((result)=>{ return {...teststate, 'value': result.id, 'label': result.title } })})
		})
		.catch((err) => { 
			dispatch({type: 'FETCH_CATEGORIES_ERROR', payload: null}) 
		})
	}
}

export function getTags(pageNumber){
	return function(dispatch){	
		const cookies = new Cookies();
		axios.get('/api/tags?token='+cookies.get('token')+(pageNumber ? '&page='+pageNumber : ''))
		.then((response) => {
			console.log(response.data);
			let teststate = {};

			dispatch({type: 'FETCH_TAGS_SUCCESS', payload: response.data.map((result)=>{ return {...teststate, 'value': result.id, 'label': result.title } })})
		})
		.catch((err) => { 
			dispatch({type: 'FETCH_TAGS_ERROR', payload: null}) 
		})
	}
}

export function getSimilarResources(id){
	return function(dispatch){	
		dispatch({type: 'FETCH_SIMILAR_RESOURCES'})
		const cookies = new Cookies();
		axios.get('/api/resources/'+id+'/similar-resources/?token='+cookies.get('token'))
		.then((response) => {
			//response.data.quote = {'value': response.data.quote.id, 'label': response.data.quote.message };
			//console.log('response', response.data.quote);
			console.log('response', 'we logged it', response.data);
			dispatch({type: 'FETCH_SIMILAR_RESOURCES_SUCCESS', payload: {...response.data }})
		})
		.catch((err) => { 
			console.log('response er', err)
			dispatch({type: 'FETCH_SIMILAR_RESOURCES_ERROR', payload: null}) 
		})
	}
}

export function getRelatedResource(id){
	return function(dispatch){	
		dispatch({type: 'FETCH_RELATED_RESOURCE'})
		const cookies = new Cookies();
		axios.get('/api/resources/'+id+'/related-resource/?token='+cookies.get('token'))
		.then((response) => {
			//response.data.quote = {'value': response.data.quote.id, 'label': response.data.quote.message };
			//console.log('response', response.data.quote);
			console.log('response', 'we logged it', response.data);
			dispatch({type: 'FETCH_RELATED_RESOURCE_SUCCESS', payload: {...response.data }})
		})
		.catch((err) => { 
			console.log('response er', err)
			dispatch({type: 'FETCH_RELATED_RESOURCE_ERROR', payload: null}) 
		})
	}
}

export function getRelatedCategoryResources(id, category_id){
	return function(dispatch){	
		dispatch({type: 'FETCH_RELATED_CATEGORY_RESOURCES'})
		const cookies = new Cookies();
		axios.get('/api/resources/'+id+'/related-category-resources/'+category_id+'?token='+cookies.get('token'))
		.then((response) => {
			//response.data.quote = {'value': response.data.quote.id, 'label': response.data.quote.message };
			//console.log('response', response.data.quote);
			console.log('category response we trying this', 'we logged it', id, category_id, response.data);
			dispatch({type: 'FETCH_RELATED_CATEGORY_RESOURCES_SUCCESS', payload: {...response.data }})
		})
		.catch((err) => { 
			console.log('response er', err)
			dispatch({type: 'FETCH_RELATED_CATEGORY_RESOURCES_ERROR', payload: null}) 
		})
	}
}

export function getResource(id){
	return function(dispatch){	
		dispatch({type: 'FETCH_RESOURCE'})
		const cookies = new Cookies();
		axios.get('/api/resources/'+id+'/?token='+cookies.get('token'))
		.then((response) => {
			//response.data.quote = {'value': response.data.quote.id, 'label': response.data.quote.message };
			//console.log('response', response.data.quote);
			console.log('response', 'we logged it');
			dispatch({type: 'FETCH_RESOURCE_SUCCESS', form: {...response.data, quote: response.data.quote && response.data.quote.message }})
		})
		.catch((err) => { 
			console.log('response er', err)
			dispatch({type: 'FETCH_RESOURCE_ERROR', form: null}) 
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

		let xhr = new XMLHttpRequest();
		xhr.open('POST','/api/resources/'+values.id, true);
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
						dispatch(getResources())
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

		let xhr = new XMLHttpRequest();
		xhr.open('POST','/api/resources', true);
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
		})*/
	}
}
