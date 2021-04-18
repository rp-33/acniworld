import React from 'react';
import ArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import ArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Pagination from "material-ui-flat-pagination";
import Button from '@material-ui/core/Button';
import Slider from "react-slick";
import Divider from '../../presentation/Divider';
import {slider} from '../../utils/config';
import PropTypes from 'prop-types';

const theme = createMuiTheme();

const Capacitation = ({data,handlePage,page,total,handleSelectVideo})=>{

	return (
	<div className="capacitation">
		<Divider />
		<h2 style={{color: '#004b98'}}>CAPACITACIONES</h2>
			<Slider {...slider()}>
				{data.map((item,i)=>
		
				<div key = {item._id} style={{margin:'0 10px'}}>
					<div style={{width:'95%',marginLeft:'2.5%'}}>
						<img alt="image" src={item.image} />
						<div style={{paddingBottom:'20px'}}>
						<h3 style={{color: '#004b98'}}>{item.title}</h3>
						<span style={{fontSize:'1.3em'}}>Dictado por </span><span style={{fontWeight:'bold',fontSize:'1.3em'}}>{item.user.displayName}</span>
						<p style={{color:'#c7c7c7'}}> {item.date} </p>
						<div style={{textAlign:'right'}}>
							<Button onClick = {()=>handleSelectVideo(item)} color="primary">Ver capacitacion </Button>
						</div>
						</div>
					</div>
				</div>
			
				)}
			</Slider>

		<div className="breadcrumb">
			<div>			
				<MuiThemeProvider theme={theme}>
       				<CssBaseline />
        			<Pagination
					currentPageColor = "primary"
					otherPageColor = "default"
          			limit={4}
          			offset={page}
					total={total}
					nextPageLabel = {<ArrowRightIcon fontSize="large" />}
					previousPageLabel = {<ArrowLeftIcon fontSize="large" />}
					innerButtonCount = {1}
					onClick={(e, offset) => handlePage(offset)}
        			/>
      			</MuiThemeProvider>
			</div>
		</div>
	</div>

	)

}

Capacitation.propTypes = {
	handlePage : PropTypes.func.isRequired,
	page  : PropTypes.number.isRequired,
	total : PropTypes.number.isRequired,
	handleSelectVideo : PropTypes.func.isRequired
}


export default Capacitation