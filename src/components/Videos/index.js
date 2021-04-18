import React,{Component} from 'react';
import {toast } from "react-toastify";
import Grid from '@material-ui/core/Grid';
import Video from './Video';
import ModalVideo from '../../presentation/ModalVideo/';
import {
    findAllVideos
} from '../../services/api.js';
import './style.css';

class Videos extends Component{
    constructor(props){
        super(props);
        this.state = {
            videos : [],
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
            let {status,data} = await findAllVideos();
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

    handleClose = ()=>{
        this.setState({
            delete:false
        })
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
            <div className="videos">
                <section className="container">
                    <div className="ctn-head-btn">
                        <h2>
                            Videos
                        </h2>
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
                                        item = {item}
                                        handleOpenVideo = {this.handleVideo}
                                    />
                                </Grid> 
                            )}
                        </Grid>
   
                    </div>
                </section>                   
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

export default Videos;