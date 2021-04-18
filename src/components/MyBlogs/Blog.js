import React from 'react';
import {Link} from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import Image from '../../presentation/Image';
import PropTypes from 'prop-types';

const Blog = ({item,index,handleDelete})=>{
    return(
        <div className="blog-card">
            <div className="ctn-image">
                <span>
                    {item.visits} vistas
                </span>
                <Image src = {item.image} />
            </div>
            <div className="ctn-title">
                <Link to={`/dashboard/blog/${item._id}`}>{item.title}</Link>
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

Blog.propTypes = {
    item : PropTypes.shape({
        _id : PropTypes.string.isRequired,
        title : PropTypes.string,
        image : PropTypes.string,
        visits : PropTypes.number
    }),
    index : PropTypes.number.isRequired,
    handleDelete : PropTypes.func.isRequired
}

export default Blog;