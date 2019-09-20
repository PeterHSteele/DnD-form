import React from 'react';

function InfoMessage(props){
	return (
		<div>
			<p className = {props.type}>
				{props.message}
			</p>
		</div>
	)	
}

export default InfoMessage;