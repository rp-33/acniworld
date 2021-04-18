import React from 'react';
import DoneIcon from '@material-ui/icons/Done';
import PropTypes from 'prop-types';
import './style.css';

const Tags = ({index,title,color,select,handleSelect})=>{
    return(
        <span
            onClick = {()=>handleSelect(index,select)}
            className="tags" 
            style={{backgroundColor:color || '#c7c7c7'}}
        >   {select &&
                <DoneIcon className="icon"/>
            }
            <bold>
                {title}
            </bold>
        </span>
    )
}

Tags.defaultProps = {
    title : 'tags',
    select : false
}

Tags.propTypes = {
    index : PropTypes.number.isRequired,
    title : PropTypes.string.isRequired,
    color : PropTypes.string.isRequired,
    select : PropTypes.bool,
    handleSelect : PropTypes.func
}

export default Tags;