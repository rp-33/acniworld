import React,{Component} from 'react';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import Loading from '../../presentation/Loading/';
import BarMessage from '../../presentation/BarMessage';
import {signup} from '../../services/api';
import './style.css';

class Signup extends Component{
    constructor(props){
        super(props);
        this.state = {
            email : '',
            password : '',
            displayName : '',
            loading : false,
            rol : 0,
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
            let {displayName,email,password,rol} = this.state;
            
            let roles = (rol === 0) ? 'estudiante' : 'coach'; 

            let {status,data} = await signup(displayName,email,password,roles);

			if(status === 201)
			{
                this.props.handleAuth(data)
            }
            else if(status === 204)
			{
				this.setState({
                    error :'Correo ya existe'
                })
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
    
    handleChangeRol = (event,value)=>{
        this.setState({
            rol : value
        })
    }

    render(){
        let {open} = this.props;
        return(
            <Slide direction="up" in={open} mountOnEnter unmountOnExit>
                <div className="signup">
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
                            {
                                this.state.rol===0
                            ?   
                                <h3 className="title">
                                    Inscribete y comienza aprender
                                </h3>
                            :  
                                <h3 className="title">
                                    Ven y enseña con nosotros
                                </h3>
                            }

                            <BarMessage 
                                title = {this.state.error}
                            />

                        <Tabs
                            value={this.state.rol}
                            onChange={(event,value)=>this.handleChangeRol(event,value)}
                            indicatorColor="primary"
                            textColor="primary"
                            centered
                        >
                            <Tab label="Estudiante" />
                            <Tab label="Coach" />
                        </Tabs>
                        
                        <form onSubmit ={(event)=>this.handleSubmit(event)}>
                        <TextField
                                required
                                id="standard-required"
                                margin="normal"
                                placeholder="Nombre y Apellido"
                                type="text"
                                fullWidth 
                                name = "displayName"
                                onChange = {(event)=>this.handleChange(event)}
                            />
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
                                minLength={5}
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
                                    Registrarme
                                </Button>
                            :
                                <Loading />
                            }
                        </form>
		
                    </Paper>
                </div>
            </Slide>
        )
    }
}

Signup.propTypes = {
    open : PropTypes.bool.isRequired,
    handleClose : PropTypes.func.isRequired,
    handleAuth : PropTypes.func.isRequired
}

export default Signup;