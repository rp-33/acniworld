import React,{Fragment} from 'react';
import Hidden from '@material-ui/core/Hidden';

const Divider = ({})=>{
	return(
		<Fragment>
		<Hidden xsDown>
			<div style={styles.dividerXs}>
				<div style={styles.dividerLeft}></div>
			</div>
		</Hidden>
		<Hidden smUp>
			<div style={styles.divider}>
				<div style={styles.dividerLeft}></div>
			</div>
		</Hidden>
		</Fragment>

	)
}

const styles = {
	divider: {
		width:'100%',
		height:'2px',
		backgroundColor:'#004b98',
		position:'relative'
	},
	dividerXs: {
		width:'45%',
		height:'2px',
		backgroundColor:'#004b98',
		position:'relative'
	},
	dividerLeft:{
		width:'50px',
		height:'7px',
		backgroundColor:'#004b98',
		position:'absolute',
		top:'-6px'
	}
	
}

export default Divider;