const action_login = (data)=>{
	return {
		type :'LOGIN',
		data
	}
}

const action_signup = (data)=>{
	return {
		type :'SIGNUP',
		data
	}
}

const action_logout = ()=>{
	return {
		type : 'LOGOUT'
	}
}

const action_edit_avatar = (image)=>{
	return {
		type :'CHANGE_AVATAR',
		image
	}
}

export {
	action_login,
	action_logout,
	action_signup,
	action_edit_avatar
}