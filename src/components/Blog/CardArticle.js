import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

const CardArticle = ({item})=>{
    return(
        <div className="cardArticle">
            <div className="ctn-title">
                <Link to= {`/dashboard/blog/${item._id}`}>
                    {item.title}
                </Link>
            </div>
            <div className="ctn-image">
                <img src={item.image} alt="image" />
            </div>
        </div>
    )
}

CardArticle.propTypes = {
    item : PropTypes.shape({
        _id : PropTypes.string,
        image : PropTypes.string,
        title : PropTypes.string
    })
}

export default CardArticle