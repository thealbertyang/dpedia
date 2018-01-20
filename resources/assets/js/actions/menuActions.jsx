export function menuActivate($pathname){
	return {
		type: 'MENU_ACTIVATE',
		payload: $pathname
	}

}
