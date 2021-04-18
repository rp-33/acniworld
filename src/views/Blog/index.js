import React,{Component,Fragment} from 'react';
import {toast } from "react-toastify";
import {connect} from 'react-redux';
import history from '../../routes/history';
import Avatar from '@material-ui/core/Avatar';
import Head from './Head';
import CardArticle from './CardArticle';
import Footer from '../../presentation/Footer/';
import Divider from '../../presentation/Divider';
import Tags from '../../presentation/Tags/';
import Sharing from '../../presentation/Sharing/';
import Login from '../../components/Login/';
import Signup from '../../components/Signup/';
import Image from '../../presentation/Image';
import {action_login} from '../../actions/user';
import {
    queryBlog,
    incrViewsBlog,
    randonBlogs
} from '../../services/api';
import img from '../../assets/nuestroproducto2.jpg';
import './style.css';

class Blog extends Component{
    constructor(props){
        super(props);
        this.state = {
            login : false,
            signup : false,
            id : this.props.location.pathname.split('/')[2],
            title : '',
            image : '',
            article : '',
            displayName : '',
            avatar : '',
            views : true,
            tags : [],
            blogs : []
        }


    }

    componentWillReceiveProps(nextProps){
        this.setState({
            id : this.props.location.pathname.split('/')[2]
        },()=>{
            this._findBlog(this.props.location.pathname.split('/')[2]); 
        })
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

    handleLogin = (bool)=>{
        this.setState({
            login : bool
        })
    }

    handleSignup = (bool)=>{
        this.setState({
            signup : bool
        })
    }

    handleAuth = (data)=>{
		this.props.handleLogin(data);
		history.push('/dashboard');
	}

    render(){
        return(
        <Fragment>
            <div className="blog">
                <Head 
                    handleLogin = {(bool)=>this.handleLogin(bool)}
                    handleSignup = {(bool)=>this.handleSignup(bool)}
                />
                <section className="container">
                    <h2>
                        {this.state.title}
                    </h2>
                    <div className="ctn-avatar">
                        <Avatar 
                            className="avatar"
                            alt="displayname" 
                            src={img} 
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
                        url = {window.location}
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

				<Login 
                    open = {this.state.login}
					handleClose = {(bool)=>this.handleLogin(bool)}				
					handleAuth = {(data)=>this.handleAuth(data)}
                />

                <Signup
                    open = {this.state.signup}
					handleClose = {(bool)=>this.handleSignup(bool)}
					handleAuth = {(data)=>this.handleAuth(data)}
                />

                <Footer />
            </div>
        </Fragment>
        )
    }
}

const mapDispatchToProps = dispatch =>{
	return{
		handleLogin(data){
			dispatch(action_login(data))
		}
	}
}

export default connect(null,mapDispatchToProps)(Blog);