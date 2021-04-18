import React,{Component} from 'react';
import {toast } from "react-toastify";
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Checkbox from '@material-ui/core/Checkbox';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Fade from '@material-ui/core/Fade';
import Moment from 'react-moment';
import 'moment/locale/es';
import PropTypes from 'prop-types';
import {boolLikes} from '../../utils/likes';
import Picture from '../../presentation/Picture';
import ListComment from './ListComment';
import {
  addComment,
  showComment
} from '../../services/api';

class Article extends Component{
  constructor(props){
    super(props);
    this.state = {
      comment : '',
      loading : false,
      comments : [],
      menu : false
    }
  }

  handleComments = async()=>{
    try
    {

      let {status,data} = await showComment(this.props.item._id);
      if(status===200)
      {
        this.setState({
          comments : data
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

  handleChange = (event)=>{
    let {name,value} = event.target;
    this.setState({
      [name] : value
    })

  }

  handleKey = (event)=>{
    if(event.keyCode === 13)
    {
      this.addComment()
    }
  }

  addComment = async()=>{
    try
    {
      this.setState({
        loading : true
      })

      let {status,data} = await addComment(this.props.item._id,this.state.comment);
      if(status===201)
      {
        let newComment = {
          user :{
            displayName : this.props.displayName,
            avatar : this.props.avatar
          },
          text : this.state.comment
        }
        this.setState(previosState=>{
          return{
            comment : '',
            comments : previosState.comments.concat(newComment)
          }
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
  }


  handleMenu = ()=>{
    this.setState(previosState=>{
      return{
        menu : !previosState.menu
      }
    })
  }

  handleModalDelete = ()=>{
    let {index,item} = this.props;
    this.setState({
      menu : false
    },()=>{
      this.props.handleModalDelete(index,item._id);
    })

  }

  render(){
    let {
      index,
      item,
      userId,
      handleLike,
      handleDislike,
      avatar,
      color,
      displayName
    } = this.props;
    return(
      <Card className="ctn-pub" style={{borderTopColor:item.user.color}}>
        <Fade in={this.state.menu}>
          <ol className="menu">
            <li onClick = {this.handleModalDelete}>Eliminar</li>
          </ol>
        </Fade>
        <CardHeader
          style={{textTransform:'capitalize'}}
          avatar={
            <Picture 
              avatar = {item.user.avatar}
              color ={item.user.color}
              displayName={item.user.displayName}
            />
          }
          action={
            <Fade in={item.user._id == userId}>
              <IconButton 
                onClick = {this.handleMenu}
                aria-label="settings"         
              >
                <MoreVertIcon />
              </IconButton>
            </Fade>
          }
          title={item.user.displayName}
          subheader={
            <Moment fromNow unix>{item.date}</Moment>
          }
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {item.text}
          </Typography>
        </CardContent>
        <CardActions disableSpacing className="ctn-action">
          <div>
          <Checkbox 
            checked={boolLikes(item.likes,userId)} 
            onClick = {
              boolLikes(item.likes,userId) 
            ? 
              ()=>handleDislike(item._id,index) 
            :
              ()=>handleLike(item._id,index)
            } 
              icon={<FavoriteBorderIcon />} checkedIcon={<FavoriteIcon />} 
          />
          {item.likes.length>0
            ?
              <bold style={{color:'#f44336'}}>
                {item.likes.length} me gustas
              </bold>
            :
              <bold style={{color:'#c7c7c7'}}>
                0 me gusta
              </bold>
          }
          </div>
          <Button onClick={this.handleComments}>comentarios</Button>
        </CardActions>
        <Collapse in={true} timeout="auto" unmountOnExit>
          <CardContent>
            <ListComment 
              comments = {this.state.comments}
            />
          </CardContent>
        </Collapse>

        <div className="ctn-input-comment">
          <Picture
            avatar = {avatar}
            displayName = {displayName}
            color = {color}
          />  
          <input 
            name = "comment"
            type="text"
            placeholder ="Comenta que opinas"
            value = {this.state.comment}
            onChange = {this.handleChange}
            onKeyDown = {this.handleKey}
          />
        </div>

      
      </Card>
    )
  }
}

Article.propTypes = {
  index : PropTypes.number.isRequired,
  userId:PropTypes.string.isRequired,
  handleLike : PropTypes.func.isRequired,
  handleDislike : PropTypes.func.isRequired,
  item : PropTypes.shape({
    _id : PropTypes.string.isRequired,
    text : PropTypes.string.isRequired,
    date : PropTypes.number.isRequired,
    user : PropTypes.object,
    likes : PropTypes.array.isRequired
  })
}

export default Article;