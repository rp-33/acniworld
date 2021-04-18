import React from 'react';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Image from '../../presentation/Image';
import PropTypes from 'prop-types';

const Video = ({item,handleOpenVideo})=>{
    return(
        <div className="video-card">
            <div className="ctn-image" onClick = {()=>handleOpenVideo(item)}>
                <Image src = {item.image} />
            </div>
            <div className="ctn-title">
                <span>{item.title}</span>
            </div>
            <div className="ctn-btn">
                <Tooltip title="Eliminar" aria-label="ver">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick = {()=>handleOpenVideo(item)}
                    >
        			  Ver
      			    </Button>
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
    handleOpenVideo : PropTypes.func.isRequired
}

export default Video;