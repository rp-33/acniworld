import React,{Component} from 'react';
import {toast } from "react-toastify";
import Avatar from '@material-ui/core/Avatar';
import CardArticle from './CardArticle';
import Divider from '../../presentation/Divider';
import Sharing from '../../presentation/Sharing/';
import Tags from '../../presentation/Tags/';
import {
    queryBlog,
    randonBlogs,
    incrViewsBlog
} from '../../services/api';
import Image from '../../presentation/Image';
import avatar from '../../assets/nuestroproducto2.jpg';
import './style.css';

class Blog extends Component{ 
    constructor(props){
        super(props);
        this.state = {
            id : this.props.match.params.id,
            title : '',
            image : '',
            article : '',
            displayName : '',
            avatar : '',
            tags : [],
            blogs : []
        }
        
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.id!==this.props.match.params.id){
            console.log('componentWillReceiveProps')
            this.setState({
                id : this.props.match.params.id
            },()=>{
                this._findBlog(this.props.match.params.id); 
            })
        }
    }


    componentDidMount(){
        this._findBlog(this.state.id);
    }

    _increaseViews = async (id)=>{
        try
        {
            let {status,data} = await incrViewsBlog(id);
            if(status === 500)
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

    _findBlog = async (id)=>{
        try
        {
            let {status,data} = await queryBlog(id);
            if(status === 200)
            {
                this.setState({
                    title : data.title,
                    image : data.image,
                    article : data.article,
                    displayName : data.user.displayName,
                    avatar : data.user.avatar,
                    tags : data.tags
                },()=>{
                    this._increaseViews(id);
                    this._randonBlogs(data.tags);
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

    _randonBlogs = async(tags)=>{
        try
        {
            let {status,data} = await randonBlogs(tags);
            if(status === 200)
            {
               this.setState({
                   blogs:data
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


    render(){
        return(
            <div className="blog">
                <section className="container">
                    <h2>
                        {this.state.title}
                    </h2>
                    <div className="ctn-avatar">
                        <Avatar 
                            className="avatar"
                            alt="image" 
                            src={this.state.avatar ? this.state.avatar : avatar} 
                        />
                        <div>
                            <p style={{fontWeight:'bold'}}>{this.state.displayName}</p>
                        </div>
                    </div>
                    <div className="ctn-img">
                        <Image src={this.state.image} />
                    </div>
                    <article style={{marginBottom:40}}>
                        {this.state.article}
                    </article>

                    <Sharing 
                        url = "https://www.flaticon.es/"
                        title = "acniworld"
                    />


                    <div className="ctn-tags">
                        {this.state.tags.map((item,i)=>
                            <Tags 
                                key = {item}
                                index = {i}
                                title = {item}
                                color = '#c7c7c7'
                                select = {false}
                                handleSelect = {()=>null}
                            />
                        )}
                    </div>

                    <Divider />

                    {this.state.blogs.map((item,i)=>
                        <CardArticle
                            key = {item._id}
                            item = {item}
                        />
                    )}

                </section>
            </div>
        )
    }
}


export default Blog;