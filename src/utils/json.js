import capacitation1 from '../assets/capacitacion1.jpg';
import capacitation2 from '../assets/capacitacion2.jpg';
import capacitation3 from '../assets/capacitacion3.jpg';
import capacitation4 from '../assets/capacitacion1.jpg';
import article1 from '../assets/instagram1.jpg';
import article2 from '../assets/instagram2.jpg';
import article3 from '../assets/instagram3.jpg';
import article4 from '../assets/instagram3.jpg';


const capacitation = ()=>{
	return [
		{
			name : 'Desarrolla tu potencial',
			user : 'Ricardo Perez',
			date : '22 de agosto de 2019 ',
			image : capacitation1
		},
		{
			name : 'El paso para tu libertad financiera',
			user : 'Alberto Urdaneta',
			date : '1 de septiembre de 2019',
			image : capacitation2
		},
		{
			name : 'Los pasos para el exito',
			user : 'Mari Linarez',
			date : '2 de septiembre de 2019',
			image : capacitation3
		},
		{
			name : 'rapido y efectivo',
			user : 'Luis Marquez',
			date : '19 de diciembre de 2019',
			image : capacitation4
		}

	]

}

const article = ()=>{
	return[
		{
			name : 'Desarrolla tu potencial',
			user : 'Ricardo Perez',
			date : '1 de agosto de 2019 ',
			image : article1
		},
		{
			name : 'El paso para tu libertad financiera',
			user : 'Alberto Urdaneta',
			date : '1 de junio de 2019',
			image : article2
		},
		{
			name : 'Los pasos para el exito',
			user : 'Mari Linarez',
			date : '22 de mayo de 2019',
			image : article3
		},
		{
			name : 'rapido y efectivo',
			user : 'Luis Marquez',
			date : '19 de mayo de 2019',
			image : article4
		}
	]
}


export {capacitation,article}