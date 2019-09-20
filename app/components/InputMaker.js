import React from 'react';

export default function InputMaker(props){
	return props.preview ? (
	 	<div draggable onDragStart={ (e) => props.handleDragStart(e) } className='control'>
			{ props.renderInput( props.fields ) }
		</div>
	) : null
}