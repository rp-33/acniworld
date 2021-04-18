const action_modal = (bool)=>{
	return {
        type :'MODAL_AVATAR',
        bool
	}
}

const action_edit = (base64,file)=>{
    return{
        type : 'EDIT_AVATAR',
        base64,
        file
    }
}

export {
    action_modal,
    action_edit
}