import React,{Component} from 'react';
import {toast } from "react-toastify";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Loading from '../../presentation/Loading';
import BarMessage from '../../presentation/BarMessage';
import {editPassword} from '../../services/api';
import './style.css';

class EditPassword extends Component{
    constructor(props){
        super(props);
        this.state = {
            error : '',
            loading : false,
            passwordOne : '',
            passwordTwo : ''
        }
    }

    handleChange = (event)=>{
        let {name,value} = event.target;
        this.setState({
            [name] : value
        })
    }

    handleSubmit = async (event)=>{
        try
        {
            event.preventDefault();
            let {passwordOne,passwordTwo} = this.state;
            if(passwordOne!==passwordTwo){
                this.setState({
                    error:'Las claves no coinciden'
                });

                return
            };
            this.setState({
                loading : true,
                error : ''
            });
            let {status,data} = await editPassword(passwordOne);
            if(status === 201)
			{
                this.setState({
                    passwordOne : '',
                    passwordTwo : ''
                },()=>{
                    toast(data.message,{ type: toast.TYPE.SUCCESS});
                })
			}
			else if(status === 500)
			{
                toast("Error",{ type: toast.TYPE.ERROR});
			}
			else
			{
                toast(data.error,{ type: toast.TYPE.WARNING});
			}
        }
        catch(err)
        {
            toast("Error",{ type: toast.TYPE.ERROR});
        }
        finally
        {
            this.setState({
                loading : false
            })
        }
    }

    render(){
        return(
            <div className="recover-password">
                <form onSubmit = {this.handleSubmit.bind(this)}>
					<h3>Editar contraseña</h3>
                    <BarMessage 
						title = {this.state.error}
					/>				
                    <TextField
                        required
                        id="standard-required"
                        margin="normal"
                        placeholder="Contraseña nueva"
                        type="password"
                        value = {this.state.passwordOne}
                        fullWidth 
                        name = "passwordOne"
                        onChange = {this.handleChange}
                    />
                    <TextField
                        required
                        id="standard-required"
                        margin="normal"
                        placeholder="Repita su contraseña"
                        type="password"
                        value = {this.state.passwordTwo}
                        fullWidth 
                        name = "passwordTwo"
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
        )
    }
}

export default EditPassword;