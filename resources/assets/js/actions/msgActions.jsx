import axios from 'axios'
import Cookies from 'universal-cookie'

export function setMsg(status, action, message, page){
	return function(dispatch){	
		dispatch({type: 'SET_MSG', status: status, action: action, message: message, page: page })
	}
}

export function clearMsg(){
	return function(dispatch){	
		dispatch({type: 'CLEAR_MSG'})
	}
}


