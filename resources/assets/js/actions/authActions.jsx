import Cookies from 'universal-cookie';
import axios from 'axios'


export function clearStatus(status){
	return function(dispatch){
		dispatch({type: 'CLEAR_STATUS'});
	} 
}

export function checkToken(){ 
	return function(dispatch){
		const cookies = new Cookies();
		dispatch({type: 'AUTH_TOKEN'}); 
		console.log('token checking', cookies.get('token'))
		axios.get('/api/user?token='+cookies.get('token'))
		.then((response) => { 
			dispatch({type: 'AUTH_TOKEN_SUCCESS', username: response.data.username, role: response.data.role && response.data.role.value }); 
		})
		.catch((err) => { 
			dispatch({type: 'AUTH_TOKEN_ERROR'}) 
		})
	} 
}

export function login(username, password){
	return function(dispatch){
		const cookies = new Cookies();
		dispatch({type: 'AUTH_USER'}); 
		console.log('tried to login whaaat', username, password);
		axios.post('/api/login', { email: username, password: password }) 
		.then((response) => { 
			cookies.set('token', response.data.token);
			console.log(response.data);
			dispatch({type: 'AUTH_USER_SUCCESS', username: username, role: response.data.role && response.data.role.value }) 
		})
		.catch((error) => { 
			console.log('GOT AUTH ERROR', error)
			dispatch({type: 'AUTH_USER_ERROR'}) 
		})
	}
}

export function logout(){
	return function(dispatch){
		const cookies = new Cookies();
		cookies.remove('token', { path: '/' });
		dispatch({
			type: 'LOGOUT_USER'
		});
	}
}