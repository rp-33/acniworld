import React from 'react';
import {Link} from 'react-router-dom';
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

const Article = ({data,handlePage,page,total})=>{

	return(
		<div className="article">
			<Divider />
			<h2 style={{color: '#004b98'}}>ARTICULOS</h2>
			<Slider {...slider()}>
				{data.map((item,i)=>

					<div style={{margin:'0 10px'}}>
						<div style={{width:'95%',marginLeft:'2.5%'}}>
							<img alt="image" src={item.image} />
							<div className="badge"></div>
							<div style={{padding:'0 20px 20px 20px'}}>
								<h2 style={{color: '#004b98'}}>{item.title}</h2>
								<span style={{fontSize:'1.3em'}}>Por </span><span style={{fontWeight:'bold',fontSize:'1.3em'}}>{item.user.displayName}</span>
								<div style={{textAlign:'right',marginTop:10}}>
									<Link to= {`/blog/${item._id}`}>
										<Button 
										color="primary" 
										variant="outlined"

										>
										Leer mas 
										</Button>
									</Link>
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

Article.propTypes = {
	data : PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.string.isRequired,
			displayName: PropTypes.string.isRequired,
		  	image: PropTypes.string.isRequired,
		})
	),
	handlePage : PropTypes.func.isRequired,
	page  : PropTypes.number.isRequired,
	total : PropTypes.number.isRequired
}

export default Article