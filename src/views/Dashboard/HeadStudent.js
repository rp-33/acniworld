import React from 'react';
import {Link} from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import BlogIcon from '@material-ui/icons/Subtitles';
import MovieIcon from '@material-ui/icons/Movie';
import MenuIcon from '@material-ui/icons/Menu';
import Tooltip from '@material-ui/core/Tooltip';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Hidden from '@material-ui/core/Hidden';
import Avatar from '@material-ui/core/Avatar';
import PropTypes from 'prop-types';
import {letter} from '../../utils/avatar';
import Logo from '../../presentation/Logo';

const HeadStudent = ({handleDrawer,openMenu,handleMenu,handleLogout,displayName,avatar,color,handleAvatar})=>{

    return(
      <AppBar position="fixed" className="head">
        <Toolbar> 
          <Logo 
            url = "/dashboard"
          />
          <Link to="/dashboard/blogs">
            <Tooltip title="blog" aria-label="blog">
                <IconButton aria-label="blog" color="primary">
      				<BlogIcon />
      			</IconButton>
            </Tooltip>
          </Link>
          <Link to="/dashboard/videos">
            <Tooltip title="seminario" aria-label="seminario">
                <IconButton aria-label="seminario" color="primary">
        		    <MovieIcon />
      		    </IconButton>
            </Tooltip>
          </Link>
            <Hidden smUp>
              <IconButton>
              <label htmlFor="contained-button-file">
                <input
        					accept="image/*"
        					id="contained-button-file"
        					required
        					type="file"
        					name ="file"
                  style={{ display: 'none'}}
                  onChange = {(event)=>handleAvatar(event)}
      				  />
                <Tooltip title="avatar" aria-label="opciones">
                {
                  avatar
                  ?
                    <Avatar
                       alt="image" 
                       src={avatar} 
                       style={{width:23,height:23,fontSize:14}}
                    />
                  :
                    <Avatar 
                      aria-label="recipe"
                      style = {{backgroundColor:color,width:23,height:23,fontSize:14}}
                    >
                      {letter(displayName)}
                    </Avatar>
                }
                </Tooltip>
              </label>
              </IconButton>
              <Tooltip title="opciones" aria-label="opciones">
                <IconButton 
                  aria-label="menu" 
                  color="primary"
                  onClick = {()=>handleDrawer(true)}
                >
        			    <MenuIcon />
      			    </IconButton>
              </Tooltip>
            </Hidden>
            <Hidden xsDown>
              <Tooltip title="opciones" aria-label="opciones">
                <IconButton 
                  aria-label="menu" 
                  color="primary"
                  onClick = {()=>handleMenu(true)}
                >
        			    <MenuIcon />
      			    </IconButton>
              </Tooltip>
            </Hidden>
            <Menu
              getContentAnchorEl={null}
              anchorEl={null}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              id="simple-menu"
              keepMounted
              open={Boolean(openMenu)}
              onClose={()=>handleMenu(false)}
            >
              <MenuItem 
                onClick={()=>handleMenu(false,'/dashboard/edit/password')}
              >
                Editar Contraseña
                </MenuItem>
              <MenuItem onClick = {()=>handleLogout()}>Salir</MenuItem>
            </Menu>
          </Toolbar>          
      </AppBar>
    )
}

HeadStudent.propTypes = {
  handleDrawer : PropTypes.func.isRequired,
  openMenu : PropTypes.bool.isRequired,
  handleMenu : PropTypes.func.isRequired,
  handleLogout : PropTypes.func.isRequired,
  displayName : PropTypes.string.isRequired,
  avatar : PropTypes.string.isRequired,
  color : PropTypes.string.isRequired
}

export default HeadStudent;