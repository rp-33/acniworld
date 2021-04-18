import React,{Component,Fragment} from 'react';
import {connect} from 'react-redux';
import {toast } from "react-toastify";
import Article from './Article';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import CardAvatar from './CardAvatar';
import {
    findPublications,
    createPublication,
    likePublication,
	dislikePublication,
    deletePublication
} from '../../services/api';
import FileReader from '../../services/reader';
import {action_edit_avatar} from '../../actions/user';
import {action_edit} from '../../actions/avatar';
import Picture from '../../presentation/Picture';
import ModalDelete from './ModalDelete';
import './style.css';

class News extends Component{
    constructor(props){
        super(props);
        this.state = {
            publications : [],
            post : '',
            loading : false,
            delete : false,
            loadingDelete : false,
            index: null,
            _id : ''
        }
    }

    componentDidMount(){
        this._findPublications();
    }

    _findPublications = async ()=>{
        try
        {
            let {status,data} = await findPublications();
            if(status === 200)
            {
                this.setState({
                    publications : data
                })
            }
            else if(status === 204)
            {
                toast("No hay publicaciones",{ type: toast.TYPE.INFO});
            }
            else if(status === 500)
			{
                toast("Error",{ type: toast.TYPE.ERROR});
			}
			else
			{
                toast(data.error,{ type: toast.TYPE.WARNING});
			}
        }
        catch(err)
        {
            toast("Error",{ type: toast.TYPE.ERROR});
        }
    }

    handleChange = (event)=>{
        let {name,value} = event.target;
        this.setState({
            [name] : value
        })
    }

    handlePost = async()=>{
        try
        {
            this.setState({
                loading : true
            });
            let {status,data} = await createPublication(this.state.post);
            if(status === 201)
			{
                
                this.setState(previousState => {
                    return{
                        post : '',
                        publications : data.concat(previousState.publications)
                    }
                },()=>{
                    toast('Publicacion creada',{ type: toast.TYPE.SUCCESS});
                })
			}
			else if(status === 500)
			{
                toast("Error",{ type: toast.TYPE.ERROR});
			}
			else
			{
                toast(data.error,{ type: toast.TYPE.WARNING});
			}
        }
        catch(err)
        {
            toast("Error",{ type: toast.TYPE.ERROR});
        }
        finally
        {
            this.setState({
                loading : false
            })
        }
    }

    handleLike = async (_id,index)=>{
        try
        {
            let {status,data} = await likePublication(_id);
            if(status === 204)
            {
                this.setState(previoState =>{
                    return{
                        publications:[
                            ...previoState.publications.slice(0,index),// Copia el objeto antes de modificarlo
                            Object.assign({},previoState.publications[index], {
                                likes : previoState.publications[index].likes.concat(this.props.id)
                            }),
                            ...previoState.publications.slice(index + 1)
                        ]
                    }
                })
            }
            else if(status === 500)
			{
                toast("Error",{ type: toast.TYPE.ERROR});
			}
			else
			{
                toast(data.error,{ type: toast.TYPE.WARNING});
			}
        }
        catch(err)
        {
            toast("Error",{ type: toast.TYPE.ERROR});
        }
    }

    handleDislike = async (_id,index)=>{
        try
        {
            let {status,data} = await dislikePublication(_id);
            if(status === 204)
            {
                this.setState(previoState =>{
                    return{
                        publications:[
                            ...previoState.publications.slice(0,index),// Copia el objeto antes de modificarlo
                            Object.assign({},previoState.publications[index], {
                                likes : previoState.publications[index].likes.filter((item,i)=>{
                                    return this.props.id !== item
                                })
                            }),
                            ...previoState.publications.slice(index + 1)
                        ]
                    }

                })
            }
            else if(status === 500)
			{
                toast("Error",{ type: toast.TYPE.ERROR});
			}
			else
			{
                toast(data.error,{ type: toast.TYPE.WARNING});
			}
        }
        catch(err)
        {
            toast("Error",{ type: toast.TYPE.ERROR});
        }
    }

    handleAvatar = (event)=>{
        var file = event.target.files[0];
		FileReader(file)
		.then((base64)=>{
            this.props.handlModalAvatar(base64,file)
		})
    }

    handleChangeAvatar = (image)=>{
        this.props.handleChangeAvatar(image)
    }

    handleCloseDelete = ()=>{
        this.setState(previousState=>{
            return{
                delete : !previousState.delete
            }
        })
    }

    handleOpenDelete = (index,_id)=>{
        this.setState(previousState=>{
            return{
                delete : !previousState.delete,
                index : index,
                _id : _id
            }
        })
    }

    handleDelete = async()=>{
       try
        {
            this.setState({
                loadingDelete :true
            });
            let {status,data} = await deletePublication(this.state._id);
            if(status === 204)
            {
               this.setState(previousState=>{
                    return{
                        publications: previousState.publications.filter((item,i)=>{
                            return i !== previousState.index
                        })
                    }
               })
            }
            else if(status === 500)
            {
                toast("Error",{ type: toast.TYPE.ERROR});
            }
            else
            {
                toast(data.error,{ type: toast.TYPE.WARNING});
            }
        }
        catch(err)
        {
            toast("Error",{ type: toast.TYPE.ERROR});
        }
        finally
        {
            this.setState({
                delete : false,
                loadingDelete : false
            })
        }

    }

    render(){
        return(
        <Fragment>
        <div className="news">
            <Grid container spacing={2}>
                <Hidden xsDown>
                    <Grid 
                    item 
                    xs = {12}
                    sm = {4}
                    md = {3}
                    >       
                        <CardAvatar 
                            avatar = {this.props.avatar}
                            color={this.props.color}
                            displayName = {this.props.displayName}      
                            handleAvatar ={this.handleAvatar}
                        />  
                    </Grid>
                </Hidden>
                <Grid 
                    item
                    xs={12}
                    sm = {8}
                    md = {9}
                >
                <section className="container">
                    <div className="ctn-post">
                        <Picture
                            avatar = {this.props.avatar }
                            displayName = {this.props.displayName}
                            color = {this.props.color}
                        />                        
                        <textarea 
                            placeholder="Escribe un comentario"
                            className="ctn-input" 
                            name ="post"
                            value={this.state.post}
                            onChange = {this.handleChange}
                        />
                    </div>
                    <div className="ctn-btn">
                        {this.state.loading
                        ?
                            <bold>PUBLICANDO...</bold>
                        :                        
                            <Fab
                            variant="extended"
                            size="medium"
                            color="primary"
                            aria-label="sent"
                            disabled = {!this.state.post}
                            onClick = {this.handlePost}
                            >
                            Publicar
                            </Fab>
                        }
                    </div>

                    {this.state.publications.map((item,i)=>
                        <Article 
                            key = {item._id}
                            index = {i}
                            userId = {this.props.id}
                            item = {item}
                            avatar = {this.props.avatar}
                            color = {this.props.color}
                            displayName = {this.props.displayName}
                            handleLike = {this.handleLike}
                            handleDislike = {this.handleDislike}
                            handleModalDelete = {this.handleOpenDelete}
                        />
                    )}
                    
                </section>
                </Grid>
            </Grid>
        </div>
            {this.state.delete &&
                <ModalDelete
                    open = {this.state.delete}
                    handleClose = {this.handleCloseDelete}
                    handleDelete = {this.handleDelete}
                    isLoading = {this.state.loadingDelete}
                />
            }  
        </Fragment>
        )
    }
}

const mapStateToProps = (state,props)=>{
    return{
        id : state.user._id,
        email : state.user.email,
        displayName : state.user.displayName,
        avatar : state.user.avatar,
        color : state.user.color
    }
}


const mapDispatchToProps = dispatch =>{
	return{
        handlModalAvatar(base64,file){
            dispatch(action_edit(base64,file))
        },
        handleChangeAvatar (image){
            dispatch(action_edit_avatar(image))
        }
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(News);