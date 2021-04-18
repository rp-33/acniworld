import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import LoginIcon from '@material-ui/icons/PermIdentity';
import RegisterIcon from '@material-ui/icons/Keyboard';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Logo from '../../presentation/Logo';

const Head = ({handleLogin,handleSignup})=>{

    return(
      <AppBar position="static" className="head">
          <Toolbar> 
            <Logo />
            <Hidden smUp>
              <IconButton 
                aria-label="signup"
                color="primary" 
                onClick = {()=>handleSignup(true)}
                style={{marginRight:15}}
              >
                <RegisterIcon />
              </IconButton>
              <IconButton 
                aria-label="signup"
                color="primary" 
                onClick = {()=>handleLogin(true)}
              >
                <LoginIcon/>
              </IconButton>
            </Hidden> 
            <Hidden xsDown>
              <Button 
                onClick = {()=>handleSignup(true)}
                style={{marginRight:20}}
              >
                REGISTRATE
              </Button>
              <Button 
                variant="contained" 
                color="primary"
                onClick = {()=>handleLogin(true)}
              >
                ENTRAR
              </Button>
            </Hidden>   
          </Toolbar>
              
      </AppBar>
    )
}

Head.propTypes = {
  handleLogin : PropTypes.func.isRequired,
  handleSignup : PropTypes.func.isRequired
}

export default Head;