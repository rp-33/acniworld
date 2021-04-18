import React from 'react';
import Grid from '@material-ui/core/Grid';
import LocalPhoneIcon from '@material-ui/icons/LocalPhone';
import PlaceIcon from '@material-ui/icons/Place';
import EmailIcon from '@material-ui/icons/Email';
import logo from '../../assets/logo.png';
import './style.css';

const Footer = ({})=>(
	<div className="footer">
		<Grid container spacing={2}>
			<Grid item xs={12} sm={3}>
				<div style={{textAlign:'center',marginTop:'20px'}}>
					<img src={logo} alt="logo" style={{width:'80%'}} />
					<p style={{textAlign:'left'}}>	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ac urna sit amet est molestie fringilla. Suspendisse potenti. Sed lacinia erat purus, vitae rhonc.</p>
				</div>
			</Grid>

			<Grid item xs={12} sm={3}>
				<h3>Contacto</h3>
				<div className="ctn-item">
					<PlaceIcon style={{marginRight:10}} />
					<span>Edificio el marichal, entre av8 transversal y avenida 11, quinta #12 Chacao Caracas</span>
				</div>
				<div className="ctn-item">
					<LocalPhoneIcon style={{marginTop:10,marginRight:10}} />
					<div>
						<p>0212-2566359</p>
						<p>0414-6983656</p>
					</div>
				</div>
				<div className="ctn-item">
					<EmailIcon style={{marginRight:10}} />
					<span>contact@acniworld.com</span>
				</div>
			</Grid>
			<Grid item xs={12} sm={3}>
				<h3>Redes sociales</h3>
				<p>facebook/acniworld</p>
				<p>@acniworld</p>
			</Grid>
			<Grid item xs={12} sm={3}>
				<h3>Informacion</h3>
				<p>Terminos y condiciones</p>
				<p>Politicas de privacidad</p>
			</Grid>
		</Grid>
	</div>
)

export default Footer;