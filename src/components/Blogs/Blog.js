import React from 'react';
import {Link} from 'react-router-dom';
import Image from '../../presentation/Image';
import PropTypes from 'prop-types';

const Blog = ({item})=>{
    return(
        <div className="blog-card">
            <div className="ctn-image">
                <Image src = {item.image} />
            </div>
            <div className="ctn-title">
                <Link to={`/dashboard/blog/${item._id}`}>{item.title}</Link>
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
    })
}

export default Blog;