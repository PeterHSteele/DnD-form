import React from 'react';

function SubmitButton (props){
	return(
		<div>
		<input 
			type='submit' 
			className="submitButton"
			value={props.value} 
			role='submit' 
			onClick={ (e)=>props.handleClick(e) } />
		</div>
	)
}

export default SubmitButton;