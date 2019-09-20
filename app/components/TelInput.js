import React from 'react';

function TelInput (props){
	
	return (
		<div>
			<label htmlFor={props.id}>
				
				{props.label}
			
			</label>
			<input 
				type="tel" 

				name={props.name}

				value={props.value}
				
				className={props.className} 

				id={props.id} 

				placeholder={props.placeholder}

				required={props.required}

				pattern={props.pattern || "[0-9]{3}-[0-9]{3}-[0-9]{4}"}

				title={props.title}

				onChange={(e)=>props.handleChange(e)}

				onFocus={(e)=>props.handleFocus(e)}

				onBlur={(e)=>props.handleBlur(e)}/>

			{ props.error && props.renderError() }
		
		</div>
	)
}

export default TelInput;

