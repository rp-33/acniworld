import React,{Component} from 'react';
import {toast } from "react-toastify";
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import CloseIcon from '@material-ui/icons/Close';
import Loading from '../../presentation/Loading';
import FileReader from '../../services/reader';
import {createVideo} from '../../services/api.js';
import img from '../../assets/upload-file.jpg';
import './style.css';

class CmsVideo extends Component{
    constructor(props){
        super(props);
        this.state = {
            video : '',
            title : '',
            file : {},
            base64 : '',
            loading : false
        }
    }
   
	handleImage =(event)=>{
		var file = event.target.files[0];
		FileReader(file)
		.then((base64)=>{
			this.setState({
				base64,
				file
			})
		})
	}

    handleDeleteImg = ()=>{
        this.setState({
            file : {},
            base64 : ''
        })
    }

    handleChange = (event)=>{
        let {name,value} = event.target;
        this.setState({
            [name] : value
        })
    }

    validate(title,video,file){
        if(title && video && file) return false;
        return true;
    }

    handleSubmit = async()=>{
        try
        {
            let {title,video,file} = this.state;
            this.setState({
                loading : true
            });
            let {status,data} = await createVideo(title,video,file);
            if(status === 201)
			{
                this.setState({
                    title : '',
                    video: '',
                    base64 : '',
                    file : {}
                },()=>{
                    toast(data.message,{ type: toast.TYPE.SUCCESS});
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

    render(){
        return(
            <div className="cms-video">
                <section className="container">
                    <div className="ctn-input">
                        <input 
                            className="input-title"
                            placeholder="Titulo"
                            name="title"
                            value={this.state.title}
                            onChange = {this.handleChange}
                        />
                         <input 
                            className="input-video"
                            placeholder="Url youtube embebido"
                            name="video"
                            value={this.state.video}
                            onChange = {this.handleChange}
                        />
                        <input
        					accept="image/*"
        					id="contained-button-file"
        					required
        					type="file"
        					name ="file"
        					style={{ display: 'none'}}
        					onChange = {this.handleImage}
      					/>
                        <div className="ctn-img">   
                            {this.state.base64
                            ?
                                <div className="article">
                                    <img
                                    src={this.state.base64} 
                                    alt="image"
                                    />
                                    <IconButton 
                                        aria-label="delete"
                                        className="icon-close" 
                                        onClick = {this.handleDeleteImg}
                                    >
                                        <CloseIcon 
                                        fontSize="medium"
                                        color="secondary"
                                        />
                    	            </IconButton>
                                </div>
                            :
                                <label htmlFor="contained-button-file">
                                    <img 
                                        className="upload"
                                        src={img} 
                                        alt="image" 
                                    />
                                </label>
                            }
                        </div>
                    </div>
                    {this.state.loading
                    ?
                        <Loading />
                    :
                        <Fab
                        variant="extended"
                        size="small"
                        color="primary"
                        aria-label="add"
                        disabled ={this.validate(this.state.title,this.state.video,this.state.base64)}
                        onClick = {this.handleSubmit}
                        >
                            Guardar
                        </Fab>
                    }
                </section>    
            </div>
        )
    }
}

export default CmsVideo;