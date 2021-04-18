import React from 'react';
import Grid from '@material-ui/core/Grid';
import Divider from '../../presentation/Divider';
import image1 from '../../assets/nuestroproducto1.jpg';
import image2 from '../../assets/nuestroproducto2.jpg';

const Information = ({})=>(
	<div className="information">
		
		<Grid container spacing={2} className="ctn-grid">
			<Grid item xs={12} sm={6}>
				<Divider />
				<div style={{marginTop:'40px'}}>
					<h2 className="tex-sub-head">Nuestro producto</h2>
					<img alt="image" src={image1} />
					<div>
						<p> 
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ac urna sit amet est molestie fringilla. Suspendisse potenti. Sed lacinia erat purus, vitae rhoncus magna sodales ac. Proin nec enim a mi condimentum efficitur. Aenean pulvinar rutrum tincidunt. Fusce sed purus at turpis egestas sodales. Fusce vel fermentum turpis. Duis consectetur ullamcorper tortor, vitae mattis elit rutrum vitae.
						</p>
					</div>
				</div>
			</Grid>
			
			<Grid item xs={12} sm={6}>
				<Divider />
				<div style={{marginTop:'40px'}}>
					<h2 className="tex-sub-head">Nuestro centro</h2>
					<img alt="image" src={image2} />
					<div>					
						<p> 
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ac urna sit amet est molestie fringilla. Suspendisse potenti. Sed lacinia erat purus, vitae rhoncus magna sodales ac. Proin nec enim a mi condimentum efficitur. Aenean pulvinar rutrum tincidunt. Fusce sed purus at turpis egestas sodales. Fusce vel fermentum turpis. Duis consectetur ullamcorper tortor, vitae mattis elit rutrum vitae.
						</p>
					</div>
				</div>
			</Grid>
		</Grid>

	</div>
)



export default Information;