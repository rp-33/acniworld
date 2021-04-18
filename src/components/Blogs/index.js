import React,{Component} from 'react';
import {toast } from "react-toastify";
import Grid from '@material-ui/core/Grid';
import Blog from './Blog';
import {
    findAllBlogs
} from '../../services/api.js';
import './style.css';

class MyBlogs extends Component{
    constructor(props){
        super(props);
        this.state = {
            blogs : []
        }
    }

    componentDidMount(){
        this._findBlogs()
    }

    _findBlogs = async ()=>{
        try
        {
            let {status,data} = await findAllBlogs();
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

    render(){
        return(
            <div className="my-blog">
                <section className="container">
                    <div className="ctn-head">
                        <h2>
                            Blogs
                        </h2>
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
                                        item = {item}
                                    />
                                </Grid> 
                            )}
                        </Grid>
                    </div>
                </section>                           
            </div>
        )
    }
}

export default MyBlogs;