import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import Image from '../../presentation/Image';
import PropTypes from 'prop-types';

const Video = ({item,index,handleDelete,handleOpenVideo})=>{
    return(
        <div className="video-card">
            <div className="ctn-image" onClick = {()=>handleOpenVideo(item)}>
                <Image src = {item.image} />
            </div>
            <div className="ctn-title">
                <span>{item.title}</span>
            </div>
            <div className="ctn-btn">
                <Tooltip title="Eliminar" aria-label="eliminar">
                    <IconButton 
                        aria-label="eliminar"
                        onClick = {()=>handleDelete(index,item._id)}
                    >
        			  <DeleteIcon />
      			    </IconButton>
                </Tooltip>
            </div>
        </div>
    )
}

Video.propTypes = {
    item : PropTypes.shape({
        _id : PropTypes.string.isRequired,
        title : PropTypes.string,
        image : PropTypes.string,
        visits : PropTypes.number
    }),
    index : PropTypes.number.isRequired,
    handleDelete : PropTypes.func.isRequired,
    handleOpenVideo : PropTypes.func.isRequired
}

export default Video;