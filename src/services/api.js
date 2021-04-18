import axios from 'axios';
import {getStoreUser} from './store';

const login = (email,password)=>{

	return axios({
		method:'post',
		url:'/app/login',
		data: {email,password}
	})
	.then((response)=>{return response})
	.catch((err)=>{return err.response})
}
const signup = (displayName,email,password,rol)=>{

	return axios({
		method:'post',
		url:'/app/signup',
		data: {
            displayName,
            email,
            password,
            rol
		}
	})
	.then((response)=>{return response})
	.catch((err)=>{return err.response})

}

const createBlog = (title,article,file,tags)=>{
	let formData = new FormData();
	formData.append('file',file);
	formData.append('title',title);
	formData.append('article',article);
	formData.append('tags',tags);
	return axios({
		method:'post',
		url : '/app/blog/create',
		data : formData,
		headers:{'content-type':'multipart/form-data','Authorization': "bearer " + getStoreUser().token}
	})
	.then((response)=>{return response})
	.catch((err)=>{return err.response})	
}

const findMyBlogs = ()=>{
	return axios({
		method : 'get',
		url : '/app/myBlogs/reed',
		headers: {'Authorization': "bearer " + getStoreUser().token}
	})
	.then((response)=>{return response})
	.catch((err)=>{return err.response})
}

const deleteBlog = (_id)=>{
	return axios({
		method : 'delete',
		url : '/app/blog/delete',
		params :{
			_id
		},
		headers: {'Authorization': "bearer " + getStoreUser().token}
	})
	.then((response)=>{return response})
	.catch((err)=>{return err.response})
}

const queryBlog = (_id)=>{
	return axios({
		method : 'get',
		url : '/app/blog/reed',
		params :{
			_id
		}
	})
	.then((response)=>{return response})
	.catch((err)=>{return err.response})
}

const createVideo = (title,video,file)=>{
	let formData = new FormData();
	formData.append('file',file);
	formData.append('title',title);
	formData.append('video',video);
	return axios({
		method:'post',
		url : '/app/video/create',
		data : formData,
		headers:{'content-type':'multipart/form-data','Authorization': "bearer " + getStoreUser().token}
	})
	.then((response)=>{return response})
	.catch((err)=>{return err.response})	
}

const findMyVideos = ()=>{
	return axios({
		method : 'get',
		url : '/app/myVideos/reed',
		headers: {'Authorization': "bearer " + getStoreUser().token}
	})
	.then((response)=>{return response})
	.catch((err)=>{return err.response})
}

const deleteVideo = (_id)=>{
	return axios({
		method : 'delete',
		url : '/app/video/delete',
		params :{
			_id
		},
		headers: {'Authorization': "bearer " + getStoreUser().token}
	})
	.then((response)=>{return response})
	.catch((err)=>{return err.response})
}

const createPublication = (text)=>{

	return axios({
		method:'post',
		url:'/app/publication/create',
		data: {
            text
		},
		headers: {'Authorization': "bearer " + getStoreUser().token}
	})
	.then((response)=>{return response})
	.catch((err)=>{return err.response})

}

const findPublications = ()=>{
	return axios({
		method : 'get',
		url : '/app/publications/reed',
		headers: {'Authorization': "bearer " + getStoreUser().token}
	})
	.then((response)=>{return response})
	.catch((err)=>{return err.response})
}

const likePublication = (_id)=>{
	return axios({
		method : 'put',
		url : '/app/publications/like',
		params :{
			_id
		},
		headers: {'Authorization': "bearer " + getStoreUser().token}
	})
	.then((response)=>{return response})
	.catch((err)=>{return err.response})
}


const dislikePublication = (_id)=>{
	return axios({
		method : 'put',
		url : '/app/publications/dislike',
		params :{
			_id
		},
		headers: {'Authorization': "bearer " + getStoreUser().token}
	})
	.then((response)=>{return response})
	.catch((err)=>{return err.response})
}

const totalBlog = ()=>{
	return axios({
		method : 'get',
		url : '/app/blog/total'
	})
	.then((response)=>{return response})
	.catch((err)=>{return err.response})
}

const showBlogHome = (page,limit)=>{
	return axios({
		method : 'get',
		url : '/app/blog/showBlogHome',
		params :{
			page,
			limit
		}
	})
	.then((response)=>{return response})
	.catch((err)=>{return err.response})
}

const totalVideo = ()=>{
	return axios({
		method : 'get',
		url : '/app/video/total'
	})
	.then((response)=>{return response})
	.catch((err)=>{return err.response})
}

const incrViewsBlog = (_id)=>{
	return axios({
		method : 'put',
		url : '/app/blog/incrView',
		params :{
			_id
		}
	})
	.then((response)=>{return response})
	.catch((err)=>{return err.response})
}

const tagsBlog = ()=>{
	return axios({
		method : 'get',
		url : '/app/blog/tags'
	})
	.then((response)=>{return response})
	.catch((err)=>{return err.response})
}

const showVideoHome = (page,limit)=>{
	return axios({
		method : 'get',
		url : '/app/video/showVideoHome',
		params :{
			page,
			limit
		}
	})
	.then((response)=>{return response})
	.catch((err)=>{return err.response})
}

const randonBlogs = (tags)=>{
	return axios({
		method : 'get',
		url : '/app/blog/randon',
		params :{
			tags
		}
	})
	.then((response)=>{return response})
	.catch((err)=>{return err.response})
}

const findAllBlogs = ()=>{
	return axios({
		method : 'get',
		url : '/app/blogs/reed',
		headers: {'Authorization': "bearer " + getStoreUser().token}
	})
	.then((response)=>{return response})
	.catch((err)=>{return err.response})
}

const findAllVideos = ()=>{
	return axios({
		method : 'get',
		url : '/app/videos/reed',
		headers: {'Authorization': "bearer " + getStoreUser().token}
	})
	.then((response)=>{return response})
	.catch((err)=>{return err.response})
}

const editAvatar = (file)=>{

	let formData = new FormData();
	formData.append('file',file);
	return axios({
		method:'put',
		url : '/app/edit/avatar',
		data : formData,
		headers:{'content-type':'multipart/form-data','Authorization': "bearer " + getStoreUser().token}
	})
	.then((response)=>{return response})
	.catch((err)=>{return err.response})

}

const editPassword = (password)=>{
	return axios({
		method : 'put',
		url : '/app/edit/password',
		params :{
			password
		},
		headers: {'Authorization': "bearer " + getStoreUser().token}
	})
	.then((response)=>{return response})
	.catch((err)=>{return err.response})
}

const addComment = (_id,text)=>{
	return axios({
		method : 'put',
		url : '/app/publications/addComment',
		params :{
			_id,
			text
		},
		headers: {'Authorization': "bearer " + getStoreUser().token}
	})
	.then((response)=>{return response})
	.catch((err)=>{return err.response})
}

const showComment = (_id)=>{
	return axios({
		method : 'get',
		url : '/app/publications/showComment',
		params :{
			_id
		},
		headers: {'Authorization': "bearer " + getStoreUser().token}
	})
	.then((response)=>{return response})
	.catch((err)=>{return err.response})
}

const deletePublication = (_id)=>{
	return axios({
		method : 'delete',
		url : '/app/publication/delete',
		params :{
			_id
		},
		headers: {'Authorization': "bearer " + getStoreUser().token}
	})
	.then((response)=>{return response})
	.catch((err)=>{return err.response})
}

export {
    login,
	signup,
	createBlog,
	findMyBlogs,
	deleteBlog,
	queryBlog,
	createVideo,
	findMyVideos,
	deleteVideo,
	createPublication,
	findPublications,
	likePublication,
	dislikePublication,
	totalBlog,
	showBlogHome,
	totalVideo,
	incrViewsBlog,
	tagsBlog,
	showVideoHome,
	randonBlogs,
	findAllBlogs,
	findAllVideos,
	editAvatar,
	editPassword,
	addComment,
	showComment,
	deletePublication
}