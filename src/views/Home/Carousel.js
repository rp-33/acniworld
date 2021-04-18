import React from 'react';
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import reunionImg from '../../assets/reunion.jpg';

const Carousel = ({})=>(

	<Slider>

		<div className="carousel">
			<img src={reunionImg} />
		</div>
		<div className="carousel">
			<img src={reunionImg} />
		</div>
		<div className="carousel">
			<img src={reunionImg} />
		</div>

	</Slider>
)

export default Carousel;