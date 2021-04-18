import React from 'react';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import {letter} from '../../utils/avatar';
import PropTypes from 'prop-types';

const CardAvatar = ({avatar,color,displayName,handleAvatar})=>{
    return(
        <Card className="card-avatar">
            <Tooltip title="Editar avatar" aria-label="opciones">
            <div>    
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
        			<EditIcon className="icon" color="primary"/>   
                    {avatar 
                    ?
                        <Avatar
                        className="avatar"
                        alt="image" 
                        src={avatar} 
                        />
                    :
                        <Avatar 
                        className="avatar"
                        aria-label="avatar"
                        style = {{backgroundColor:color}}
                        >
                            {letter(displayName)}
                        </Avatar>
                    }
                </label>
            </div>
            </Tooltip>
            <p>{displayName}</p>  
        </Card>
    )
}

CardAvatar.propTypes = {
    avatar: PropTypes.string.isRequired,
    color : PropTypes.string.isRequired,
    displayName : PropTypes.string.isRequired,
    handleAvatar : PropTypes.func.isRequired
}

export default CardAvatar