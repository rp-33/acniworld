import
{
	action_login,
	action_logout,
	action_signup,
	action_edit_avatar
} from '../actions/user';

import {
	getStoreUser,
	setStoreUser,
	deleteStore,
	editAvatar
} from '../services/store';

const user = {
	isAuthenticated : false,
	_id : '',
	token : '',
	displayName : '',
	email : '',
	avatar : '',
	rol : '',
	color : '',
}

const initialState = getStoreUser() || user;

export default (state = initialState, action) =>{

	switch (action.type){
		case action_login().type:
			setStoreUser(action.data);
			return action.data;
		case action_signup().type:
			setStoreUser(action.data);
			return action.data;
		case action_logout().type:
			deleteStore();
			return user;
		case action_edit_avatar().type:
			editAvatar(action.image);
			return Object.assign({}, state, {
                avatar : action.image
            })
		default :
			return state;
	}

}