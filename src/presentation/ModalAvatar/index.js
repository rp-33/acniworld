import React,{Component} from 'react';
import {connect} from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import CancelIcon from '@material-ui/icons/Cancel';
import Loading from '../Loading/';
import BarMessage from '../BarMessage';
import {
    action_modal
} from '../../actions/avatar';
import {editAvatar} from '../../services/api';
import './style.css';

class ModalAvatar extends Component{
    constructor(props){
        super(props);
        this.state = {
            loading :false,
            error : ''
        }
    }

    handleClose = ()=>{
        this.props.handleClose();
    }

    handleSubmit = async()=>{
        try
		{

			this.setState({
				loading:true,
				error:''
            });

			let {status,data} = await editAvatar(this.props.file);
			if(status === 201)
			{
                this.props.handleClose();
                this.props.handleSuccess(data.image);
			}
			else if(status === 500)
			{
				this.setState({
                    error :'Error en el servidor'
                })
            }
            else if(status === 404)
			{
				this.setState({
                    error :'Ruta no encontrada'
                })
			}
			else
			{
				this.setState({
					error : data.error 
				})	
			}
		}
		catch(e)
		{
			this.setState({
                error :'Error'
            })
		}
		finally
		{
			this.setState({
				loading:false
			})
		}
    }

    render(){
        let {open,base64} = this.props;
        return(
            <Slide direction="up" in={open} mountOnEnter unmountOnExit>
         		<div className="modal-avatar">
         			<Paper className="ctn-modal">
                        <div 
                            onClick = {this.handleClose}
                            className="icon-close"
                        >
                            <CancelIcon fontSize="large"/>
                        </div>
                        <div className="ctn-title">
                            <h3>Foto de perfil</h3>
                        </div>
                        <BarMessage 
                            title = {this.state.error}
                        />
                        <div className="ctn-avatar">
                            <img 
                                src = {base64}
                                alt = "avatar"
                            />
                        </div>
                        {!this.state.loading
                        ?
                            <Button 
                                onClick = {this.handleSubmit}
                                fullWidth 
                                variant="contained" 
                                color="primary"
                                className="btn"
                            >
                                Guardar
                            </Button>
                        :
                            <Loading />
                        }
                    </Paper>
                </div>
            </Slide>
        )
    }
}


const mapStateToProps = (state,props)=>{
    return{
        open : state.avatar.open,
        base64 : state.avatar.base64,
        file : state.avatar.file
    }
}

const mapDispatchToProps = dispatch =>{
	return{
		handleClose (){
			dispatch(action_modal())
        }
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(ModalAvatar);