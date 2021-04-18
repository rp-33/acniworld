import React from 'react'
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';
import CancelIcon from '@material-ui/icons/Cancel';
import PropTypes from 'prop-types';
import './style.css';

const ModalVideo = ({open,video,title,handleClose})=>{

    return(
        <Slide direction="up" in={open} mountOnEnter unmountOnExit>
            <div className="modal-video">
                <Paper className="ctn-modal">
                    <div className="icon-close" onClick ={()=>handleClose()}>
                        <CancelIcon fontSize="large"/>
                    </div>
                    <iframe 
                        className="ctn-video"
                        src={video}
                        frameborder="0"
                        allow="autoplay;
                        encrypted-media"
                        allowfullscreen
                    />
                    <div className="ctn-description">
                        <h2 style={{color:'#004b98'}}>{title}</h2>
                    </div>
                </Paper>
            </div>
        </Slide>
    )
    
}

ModalVideo.propTypes = {
    open : PropTypes.bool.isRequired,
    video : PropTypes.string.isRequired,
    title : PropTypes.string.isRequired,
    handleClose : PropTypes.func.isRequired
}


export default ModalVideo;