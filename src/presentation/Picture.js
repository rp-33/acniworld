import React,{Fragment} from 'react';
import Avatar from '@material-ui/core/Avatar';
import PropTypes from 'prop-types';
import {letter} from '../utils/avatar';

const Picture = ({avatar,displayName,color})=>{
    return(
        <Fragment>
            {
            avatar
            ?
              <Avatar
                alt="image" 
                src={avatar} 
              />
            :
              <Avatar 
                aria-label="recipe"
                style = {{backgroundColor:color}}
              >
                {letter(displayName)}
              </Avatar>
            }
        </Fragment>
    )
}

Picture.propTypes = {
    avatar : PropTypes.string.isRequired,
    color : PropTypes.string.isRequired,
    displayName : PropTypes.string.isRequired
}

export default Picture;