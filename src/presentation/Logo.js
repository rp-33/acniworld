import React,{Fragment} from 'react';
import {Link} from 'react-router-dom';
import Hidden from '@material-ui/core/Hidden';
import PropTypes from 'prop-types';
import logo from '../assets/icon.png';

const Logo = ({url})=>{
    return(
        <Fragment>
            <Hidden smUp>
                <Link to={url}>
                    <img src={logo} width="25" height="22" />
                </Link>
            </Hidden>
            <Hidden xsDown>
                <Link to={url}>
                    <span className="text-icon">ACNI</span>
                    <img src={logo} width="25" height="22" />
                    <span className="text-icon">ORLD</span>
                </Link>
            </Hidden> 
            <span style={{display:'flex',flex:1}} />         
        </Fragment>
    )
}

Logo.defaultProps = {
    url : '/'
}

Logo.propTypes = {
    url : PropTypes.string.isRequired
}

export default Logo;