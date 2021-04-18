import React,{Fragment} from 'react';
import Picture from '../../presentation/Picture';

const ListComment = ({comments})=>{
    return(
        <Fragment>
            {comments.map((item,i)=>
            <section key={i} className="ctn-comment">
                <Picture
                  avatar = {item.user.avatar}
                  displayName = {item.user.displayName}
                  color = {item.user.color}
                />  
                <section>    
                  <p>{item.user.displayName}</p>
                  <article>{item.text}</article>
                </section>
            </section>
            )}
        </Fragment>
    )
}

export default ListComment;