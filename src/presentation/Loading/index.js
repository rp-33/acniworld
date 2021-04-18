import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import './style.css';

const Loading = ()=>{
    return(
        <div className="ctn-loading">
            <CircularProgress 
                color="primary"
            />
		</div>
    )
}

export default Loading;