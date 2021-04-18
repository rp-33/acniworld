import React,{Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Loading from '../../presentation/Loading';
import BarMessage from '../../presentation/BarMessage';
import './style.css';

class Password extends Component{
	constructor(props){
		super(props);
		this.state = {
			email : '',
			error :'',
			loading : false
		}
	}

	handleChange = ()=>{

	}

	handleSubmit = ()=>{

	}

	render(){
		return(
			<div className="password">
				<div className="ctn-right">
					right
				</div>

                    	<div className="ctn-left">
                    		<form onSubmit = {this.handleSubmit.bind(this)}>
								<h3>Recuperar contraseña</h3>
                    			<BarMessage 
									title = {this.state.error}
								/>				       
                    			<TextField
                        			required
                        			id="standard-required"
                        			margin="normal"
                        			placeholder="Correo electronico"
                        			type="email"
                        			value = {this.state.email}
                        			fullWidth 
                        			name = "email"
                        			onChange = {this.handleChange}
                    			/>               
								<div className="ctn-btn">
									{this.state.loading
									?
										<Loading />
									:
                            			<Button 
                                			fullWidth 
                                			variant="contained" 
                                			color="primary"
                                			className="btn"
                                			type="submit"
                            			>
                                			Entrar
                            			</Button>
     								}
								</div>
							</form>
                    	</div>
			</div>
		)
	}
}

export default Password;