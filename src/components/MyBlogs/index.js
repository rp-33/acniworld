import React,{Component} from 'react';
import {toast } from "react-toastify";
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Blog from './Blog';
import ModalDelete  from './ModalDelete';
import {
    findMyBlogs,
    deleteBlog
} from '../../services/api.js';
import './style.css';

class MyBlogs extends Component{
    constructor(props){
        super(props);
        this.state = {
            blogs : [],
            loading :  false,
            delete : false,
            _id : '',
            index : null
        }
    }

    componentDidMount(){
        this._findBlogs()
    }

    _findBlogs = async ()=>{
        try
        {
            let {status,data} = await findMyBlogs();
            if(status === 200)
            {
                this.setState({
                    blogs : data
                })
            }
            else if(status === 204)
            {
                toast("No hay blogs",{ type: toast.TYPE.INFO});
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
            let {status,data} = await deleteBlog(this.state._id);
            if(status === 204)
			{
                this.setState(prevState=>{
                    return{
                        blogs: prevState.blogs.filter((item,i)=>{
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

    render(){
        return(
            <div className="my-blog">
                <section className="container">
                    <div className="ctn-head-btn">
                        <h2>
                            Tus Blogs
                        </h2>
                        <div>
                            <Link to="cms/blog">
                                <Button 
                                variant="outlined" 
                                color="primary"
                                >
                                    nuevo blog
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <div className="ctn-blogs">
                        <Grid container spacing={3}>
                            {this.state.blogs.map((item,i)=>
                                <Grid 
                                    item 
                                    xs={12}
                                    sm={6}
                                    md={4}
                                >
                                    <Blog 
                                        index = {i}
                                        item = {item}
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
            </div>
        )
    }
}

export default MyBlogs;