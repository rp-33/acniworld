import React,{Component} from 'react';
import {toast } from "react-toastify";
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import CloseIcon from '@material-ui/icons/Close';
import Loading from '../../presentation/Loading/';
import Tags from '../../presentation/Tags/';
import FileReader from '../../services/reader';
import {
    createBlog,
    tagsBlog
} from '../../services/api.js';
import img from '../../assets/upload-file.jpg';
import './style.css';

class Cms extends Component{
    constructor(props){
        super(props);
        this.state = {
            rows: 1,
			minRows: 5,
            maxRows: 20,
            article : '',
            title : '',
            file : {},
            base64 : '',
            tags : [],
            loading : false
        }
    }

    componentDidMount(){
        this._findTags();
    }

    _findTags = async ()=>{
        try
        {
            let {status,data} = await tagsBlog();
            if(status === 200)
            {
                this.setState({
                    tags : data
                })
            }
            else if(status === 204)
            {
                toast("No hay tags",{ type: toast.TYPE.INFO});
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

    _checketTag = (tags)=>{
        let array = [];
        for(let i=0;i<tags.length;i++){
            if(tags[i].select)
            {
                array.push(tags[i].title)
            }
        }
        return array;
    }


    handleDescription = (event)=>{
        const textareaLineHeight = 24;
		const { minRows, maxRows } = this.state;
		
		const previousRows = event.target.rows;
  	    event.target.rows = minRows; 
		
		const currentRows = (event.target.scrollHeight / textareaLineHeight);
    
        if (currentRows === previousRows) {
    	    event.target.rows = currentRows;
        }
		
		if (currentRows >= maxRows) {
			event.target.rows = maxRows;
			event.target.scrollTop = event.target.scrollHeight;
		}
    
  	    this.setState({
    	    article: event.target.value,
            rows: currentRows < maxRows ? currentRows : maxRows,
        });
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

    handleTitle = (event)=>{
        let {name,value} = event.target;
        this.setState({
            [name] : value
        })
    }

    validate(title,article,file,tags){
        if(title && article && file && this._checketTag(tags).length>0) return false;
        return true;
    }

    handleSubmit = async()=>{
        try
        {
            let {title,article,file,tags} = this.state;
            this.setState({
                loading : true
            });
            let {status,data} = await createBlog(title,article,file,this._checketTag(tags));
            if(status === 201)
			{
                this.setState({
                    rows: 1,
                    title : '',
                    article : '',
                    base64 : '',
                    file : {},
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

    handleSelectTag = (index,select)=>{
        this.setState(previosState=>{
            return{
                tags : [
                    ...previosState.tags.slice(0,index),// Copia el objeto antes de modificarlo
                    Object.assign({}, previosState.tags[index], {
                        select : !select
                    }),
                    ...previosState.tags.slice(index + 1)
                ]
            }
        })
    }

    render(){
        return(
            <div className="cms">
                <section className="container">
                    <div className="ctn-input">
                        <input 
                            className="input-title"
                            placeholder="Titulo"
                            name="title"
                            value={this.state.title}
                            onChange = {this.handleTitle}
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
                        <textarea
				            rows={this.state.rows}
				            value={this.state.article}
				            placeholder='Escribe tu articulo'
				            onChange={this.handleDescription}
			            />
                    </div>
                    
                    <div className="ctn-tags">
                        {this.state.tags.map((item,i)=>
                            <Tags 
                                key = {item._id}
                                index = {i}
                                title = {item.title}
                                color = {item.color}
                                select = {item.select}
                                handleSelect = {this.handleSelectTag}
                            />
                        )}

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
                        disabled ={this.validate(this.state.title,this.state.article,this.state.base64,this.state.tags)}
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

export default Cms;