import React from 'react';
import {
    FacebookShareButton,
    TwitterShareButton,
    FacebookIcon,
    TwitterIcon
} from 'react-share';
import PropTypes from 'prop-types';
import './style.css'

const Sharing = ({url,title})=>{
    return(
        <div className="sharing">
        <div className="ctn-btn">
           <FacebookShareButton url={url} quote={title} >
               <FacebookIcon size={40} round={true} />
               </FacebookShareButton> 
        </div>
        <div className="ctn-btn">
            <TwitterShareButton url={url} quote={title} >
                <TwitterIcon size={40} round={true} />
            </TwitterShareButton>
        </div>
    </div>
    )
}

Sharing.defaultProps = {
    url : "http://acniworld.com",
    title : "Acniworld"
}

Sharing.propTypes = {
    url : PropTypes.string.isRequired,
    title : PropTypes.string.isRequired
}

export default Sharing;