import React from 'react';
import Info from './Info.js';

function TextInput (props){
	
	return (
		<div>
			
			<label htmlFor={props.id} >
				{props.label}
			</label><input 
				type="text" 

				name={props.name}

				value={props.value}
				
				className={props.className} 

				id={props.id} 

				placeholder={props.placeholder}

				required={props.required}

				maxLength={props.maxLength}

				className={props.className}

				onChange={(e)=>props.handleChange( e, props.uid )}

				onFocus={(e)=>props.handleFocus(e)}

				onBlur={(e)=>props.handleBlur(e)}/>
		</div>
	)
}

export default TextInput;

