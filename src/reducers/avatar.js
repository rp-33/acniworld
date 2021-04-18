import
{
    action_modal,
    action_edit
} from '../actions/avatar';

const initialState = {
    open : false,
    base64 : '',
    file : {}
}

export default (state = initialState, action) =>{

	switch (action.type){
		case action_modal().type:
			return Object.assign({}, state, {
                open : !state.open
            })
		case action_edit().type:
			return Object.assign({}, state, {
                base64 : action.base64,
                file : action.file,
                open : true
            })
		default :
			return state;
	}

}
