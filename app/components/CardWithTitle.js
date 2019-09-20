import React from 'react';
const CARD = 'card';

export default function CardWithTitle({ title, children, className }){
	return(
		<div className={ CARD + ' ' + className }>
			<h2>{ title }</h2>
			{ children }
		</div>
	)
}