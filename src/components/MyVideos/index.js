import React,{Component} from 'react';
import {toast } from "react-toastify";
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Video from './Video';
import ModalDelete  from './ModalDelete';
import ModalVideo from '../../presentation/ModalVideo/';
import {
    findMyVideos,
    deleteVideo
} from '../../services/api.js';
import './style.css';

class MySeminar extends Component{
    constructor(props){
        super(props);
        this.state = {
            videos : [],
            loading :  false,
            delete : false,
            _id : '',
            index : null,
            modalVideo : false,
            video : '',
            title : ''
        }
    }

    componentDidMount(){
        this._findVideos()
    }

    _findVideos = async ()=>{
        try
        {
            let {status,data} = await findMyVideos();
            if(status === 200)
            {
                this.setState({
                    videos : data
                })
            }
            else if(status === 204)
            {
                toast("No hay videos",{ type: toast.TYPE.INFO});
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

    handleModalDelete=(index,_id)=>{
        this.setState({
            index,
            _id,
            delete : true
        })
    }

    handleClose = ()=>{
        this.setState({
            delete:false
        })
    }

    handleDelete = async()=>{
        try
        {
            this.setState({
                loading : true
            });
            let {status,data} = await deleteVideo(this.state._id);
            if(status === 204)
			{
                this.setState(prevState=>{
                    return{
                        videos: prevState.videos.filter((item,i)=>{
                            return i !== prevState.index
                        })
                    }
                },()=>{
                    toast('Eliminado con exito',{ type: toast.TYPE.SUCCESS});
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
                loading : false,
                delete : false,
                _id : '',
                index : null
            })
        }
    }

    handleCloseVideo = ()=>{
        this.setState({
            modalVideo : false
        })
    }

    handleVideo = ({title,video})=>{
        this.setState({
            modalVideo : true,
            title,
            video
        })
    }

    render(){
        return(
            <div className="my-video">
                <section className="container">
                    <div className="ctn-head-btn">
                        <h2>
                            Tus Videos
                        </h2>
                        <div>
                            <Link to="cms/video">
                                <Button 
                                variant="outlined" 
                                color="primary"
                                >
                                    nuevo video
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <div className="ctn-video">
                        <Grid container spacing={3}>
                            {this.state.videos.map((item,i)=>
                                <Grid 
                                    item 
                                    xs={12}
                                    sm={6}
                                    md={4}
                                >
                                    <Video
                                        index = {i}
                                        item = {item}
                                        handleOpenVideo = {this.handleVideo}
                                        handleDelete = {this.handleModalDelete}
                                    />
                                </Grid> 
                            )}
                        </Grid>
   
                    </div>
                </section>                   
				{this.state.delete &&
					<ModalDelete
                        open = {this.state.delete}
						handleClose = {this.handleClose}
						handleDelete = {this.handleDelete}
						isLoading = {this.state.loading}
					/>
				}  
                {this.state.modalVideo &&
                    <ModalVideo 
					    open = {this.state.modalVideo}
					    video = {this.state.video}
					    title = {this.state.title}
					    handleClose = {()=>this.handleCloseVideo()}
                    />     
                }   
            </div>
        )
    }
}

export default MySeminar;