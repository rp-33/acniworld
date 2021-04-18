import React,{Component,Fragment} from 'react';
import Loading from './Loading/';
import PropTypes from 'prop-types';

class Image extends Component{
    constructor(props){
        super(props);
        this.state = {
            opacity : 0
        }
    }

    handleLoad = ()=>{
        this.setState({
            opacity : 1
        })
    }

    render(){
        let {src} = this.props;
        return(
            <Fragment>
                {
                    this.state.opacity === 0 &&
                    <Loading />
                }
                <img 
                    style = {{opacity:this.state.opacity,borderRadius:'3px'}}
                    src={src} 
                    alt="imagen" 
                    onLoad = {this.handleLoad}
                />
            </Fragment>
        )
    }
}

Image.propTypes = {
    src : PropTypes.string.isRequired
}

export default Image;