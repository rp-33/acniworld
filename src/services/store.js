const getStoreUser = ()=>{
	const storage = JSON.parse(localStorage.getItem('user'));
	return storage;
}

const setStoreUser = (data)=>{
	window.localStorage.setItem('user', JSON.stringify(data));
}

const deleteStore = ()=>{
	window.localStorage.clear();
}

const editAvatar = (image)=>{
	const data = JSON.parse(localStorage.getItem('user'));
	data.avatar = image;
	window.localStorage.setItem('user', JSON.stringify(data));

}

export {
	getStoreUser,
	setStoreUser,
	deleteStore,
	editAvatar
}