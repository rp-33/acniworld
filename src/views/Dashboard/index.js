import React,{Component} from 'react';
import {Route,Switch} from 'react-router-dom';
import history from '../../routes/history';
import {connect} from 'react-redux';
import HeadCoach from './HeadCoach';
import HeadStudent from './HeadStudent';
import Drawer from './Drawer';
import MyBlogs from '../../components/MyBlogs';
import News from '../../components/News';
import Cms from '../../components/Cms';
import CmsVideo from '../../components/CmsVideo';
import Blog from '../../components/Blog';
import MyVideos from '../../components/MyVideos';
import Blogs from '../../components/Blogs';
import Videos from '../../components/Videos';
import EditPassword from '../../components/EditPassword';
import NoMatch from '../../components/NoMatch';
import ModalAvatar from '../../presentation/ModalAvatar';
import {
    action_logout,
    action_edit_avatar
} from '../../actions/user';
import {action_edit} from '../../actions/avatar';
import FileReader from '../../services/reader';

class Dashboard extends Component{
    constructor(props){
        super(props);
        this.state = {
            drawer : false,
            menu : false,
            modalAvatar : false
        }
    }

    handleLogout = ()=>{
        this.props.handleLogout();
		history.push('/');
    }

    handleDrawer = (bool)=>{
        this.setState({
            drawer : bool
        })
    }

    handleMenu = (bool,route)=>{
        this.setState({
            menu : bool
        },()=>{
            history.push(route);   
        })
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

    render(){
        return(
            <div className="dashboard">
                {this.props.rol === 'coach'
                ?
                    <HeadCoach
                        openMenu ={this.state.menu}
                        handleDrawer = {this.handleDrawer}
                        handleMenu = {this.handleMenu}
                        handleLogout = {this.handleLogout}
                        avatar = {this.props.avatar}
                        displayName = {this.props.displayName}
                        color = {this.props.color}
                        handleAvatar ={this.handleAvatar}
                    />
                :
                    <HeadStudent
                        openMenu ={this.state.menu}
                        handleDrawer = {this.handleDrawer}
                        handleMenu = {this.handleMenu}
                        handleLogout = {this.handleLogout}
                        avatar = {this.props.avatar}
                        displayName = {this.props.displayName}
                        color = {this.props.color}
                        handleAvatar ={this.handleAvatar}
                    />
                }

                <Drawer 
                    open = {this.state.drawer}
					handleClose = {(bool)=>this.handleDrawer(bool)}
					handleLogout = {()=>this.handleLogout()}
                />

                <ModalAvatar
                    handleSuccess = {this.handleChangeAvatar}
                />

                <div className="ctn-dashboard">
                    <Switch>
					    <Route exact path="/dashboard" component={News}/>  
                        <Route path="/dashboard/myblogs" component={MyBlogs}/> 
                        <Route path="/dashboard/myvideos" component={MyVideos}/> 
                        <Route path="/dashboard/blog/:id" component={Blog}/> 
                        <Route path="/dashboard/cms/blog" component={Cms}/>  
                        <Route path="/dashboard/cms/video" component={CmsVideo}/> 
                        <Route path="/dashboard/blogs" component={Blogs}/>  
                        <Route path="/dashboard/videos" component={Videos}/>
                        <Route path="/dashboard/edit/password" component={EditPassword}/>  					
                        <Route component={NoMatch} />
				    </Switch>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state,props)=>{
    return{
        displayName : state.user.displayName,
        avatar : state.user.avatar,
        color : state.user.color,
        rol : state.user.rol
    }
}

const mapDispatchToProps = dispatch =>{
	return{
		handleLogout (){
			dispatch(action_logout())
        },
        handlModalAvatar(base64,file){
            dispatch(action_edit(base64,file))
        },
        handleChangeAvatar (image){
            dispatch(action_edit_avatar(image))
        }
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);