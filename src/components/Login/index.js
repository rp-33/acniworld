import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import Loading from '../../presentation/Loading/';
import BarMessage from '../../presentation/BarMessage';
import {login} from '../../services/api';
import './style.css';

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            email : '',
            password : '',
            loading : false,
            error : ''
        }
    }

    handleClose = (bool)=>{
        this.props.handleClose(bool)
    }

    handleChange = (event)=>{
        let {value,name} = event.target;
        this.setState({
            [name]: value
        })
    }

    handleSubmit = async (event)=>{
        try
		{
			event.preventDefault();
			
			this.setState({
				loading:true,
				error:''
			});
			let {email,password} = this.state;

			let {status,data} = await login(email,password);
			if(status === 200)
			{
                this.props.handleAuth(data)
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
                error :'Error en el servidor'
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
        let {open} = this.props;
        return(
            <Slide direction="up" in={open} mountOnEnter unmountOnExit>
                <div className="login">
                    <Paper className="form-control">
                        <IconButton 
                            aria-label="delete"
                            className="icon-close" 
                            onClick = {()=>this.handleClose(false)}
                        >
                            <CloseIcon 
                                fontSize="size"
                                color="primary"
                            />
                    	</IconButton>
         				<h3 className="title">
                            Inicia sesión con tu correo
                        </h3>
                        <BarMessage 
                            title = {this.state.error}
                        />
                        <form onSubmit ={(event)=>this.handleSubmit(event)}>
                            <TextField
                                required
                                id="standard-required"
                                margin="normal"
                                placeholder="Correo electronico"
                                type="email"
                                fullWidth 
                                name = "email"
                                onChange = {(event)=>this.handleChange(event)}
                            />
                             <TextField
                                required
                                id="standard-required"
                                margin="normal"
                                placeholder="Contraseña"
                                type="password"
                                fullWidth 
                                name = "password"
                                onChange = {(event)=>this.handleChange(event)}
                            />
                            {!this.state.loading
                            ?
                                <Button 
                                fullWidth 
                                variant="contained" 
                                color="primary"
                                className="btn"
                                type="submit"
                                >
                                    Entrar
                                </Button>
                            :
                                <Loading />
                            }
                        </form>

                        <Link to="/password" className="password-remember">
                            Olvide mi contraseña
                        </Link>
                           				
                    </Paper>
                </div>
            </Slide>
        )
    }
}

Login.propTypes = {
    open : PropTypes.bool.isRequired,
    handleClose : PropTypes.func.isRequired,
    handleAuth : PropTypes.func.isRequired
}

export default Login;