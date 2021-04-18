import React,{Component, Fragment} from 'react';
import {connect} from 'react-redux';
import history from '../../routes/history';
import {toast } from "react-toastify";
import Head from './Head';
import Carousel from './Carousel';
import Information from './Information';
import Capacitation from './Capacitation';
import Article from './Article';
import Footer from '../../presentation/Footer/';
import ModalVideo from '../../presentation/ModalVideo/';
import Login from '../../components/Login/';
import Signup from '../../components/Signup/';
import {action_login} from '../../actions/user';
import {
	totalBlog,
	showBlogHome,
	totalVideo,
	showVideoHome
} from '../../services/api';
import './style.css';

class Home extends Component{
	constructor(props){
		super(props);
		this.state = {
			blogs : [],
			videos : [],
			login : false,
			signup: false,
			modal : false,
			pageBlog : 0,
			pageVideo : 0,
			totalBlog : 0,
			totalVideo : 0,
			video : '',
			title : '',
			description : 'este articulo esta',

		}	
	}

	componentDidMount(){
		this._totalBlog();
		this._totalVideo();
	}

	_totalBlog = async()=>{
		try
        {
            let {status,data} = await totalBlog();
            if(status === 200)
            {
                this.setState({
					totalBlog : data.total
				},()=>{
					this._findBlog(this.state.pageBlog)
				})
            }
            else if(status === 204)
            {

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


	_totalVideo = async()=>{
		try
        {
            let {status,data} = await totalVideo();
            if(status === 200)
            {
                this.setState({
					totalVideo : data.total
				},()=>{
					this._findVideo(this.state.pageVideo)
				})
            }
            else if(status === 204)
            {

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

	_findBlog = async(page)=>{
		try
        {
            let {status,data} = await showBlogHome(page,4);
            if(status === 200)
            {
                this.setState({
					blogs : data
				})
            }
            else if(status === 204)
            {

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

	_findVideo = async(page)=>{
		try
        {
            let {status,data} = await showVideoHome(page,4);
            if(status === 200)
            {
                this.setState({
					videos : data
				})
            }
            else if(status === 204)
            {
				
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

	handleCloseVideo = ()=>{
		this.setState({
			modal : false
		})
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

	handlePaginationBlog = (offset)=>{
		this.setState({
			pageBlog : offset
		},()=>{
			this._findBlog( offset,4)
		})
	}

	handlePaginationVideo = (offset)=>{
		this.setState({
			pageVideo : offset
		},()=>{
			this._findVideo(offset,4)
		})
	}

	handleSelectVideo = ({video,title})=>{
		this.setState({
			modal : true,
			video : video,
			title : title
		})
	}

	render(){
		return(
		<Fragment>
			<div className="home">
				<Head 
                    handleLogin = {(bool)=>this.handleLogin(bool)}
                    handleSignup = {(bool)=>this.handleSignup(bool)}
                />
				
				<Carousel />

				<Capacitation 
					data = {this.state.videos}
					handlePage = {this.handlePaginationVideo}
					page = {this.state.pageVideo}
					total = {this.state.totalVideo}
					handleSelectVideo = {this.handleSelectVideo}
				/>

				<Information />
							
				<Article 
					data = {this.state.blogs}
					handlePage = {this.handlePaginationBlog}
					page = {this.state.pageBlog}
					total = {this.state.totalBlog}
				/>

				<Footer />

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

				<ModalVideo 
					open = {this.state.modal}
					video = {this.state.video}
					title = {this.state.title}
					description = {this.state.description}
					handleClose = {()=>this.handleCloseVideo()}
				/>
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

export default connect(null,mapDispatchToProps)(Home);