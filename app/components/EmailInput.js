import React from 'react';

//{props.renderIcon()}
//
function EmailInput (props){
	/*const style ={
					height: props.height || 'auto',
					color: props.color,
					fontSize: props.fontSize,
					background: props.focus ? white : vLight,
					borderTop: props.focus ? '1px solid '+blue : '1px solid '+vLight,
					borderRight: props.focus ? '1px solid '+blue : '1px solid '+vLight,
					borderBottom: props.focus ? '1px solid '+blue : '1px solid '+vLight,
				}

	let { background, height, borderBottom, borderRight, borderTop, boxSizing } = style, 
		labelStyle = {background: background,
					  height: height,
					  borderBottom: borderBottom,
					  borderTop: borderTop,
					  borderLeft: borderRight,
					  };

	const containerStyle = {
		border: props.focus ? '1 px solid '+blue : 'none'
	}*/

	return (
		<div>
			<label htmlFor={props.id}>
				
				{props.label}
			
			</label>
			<input 
				type="email" 

				name={props.name}

				value={props.value}
				
				className={props.className} 

				id={props.id} 

				placeholder={props.placeholder}

				required={props.required}

				title={props.title}

				onChange={(e)=>props.handleChange( e, props.uid)}

				onFocus={(e)=>props.handleFocus(e)}

				onBlur={(e)=>props.handleBlur(e)}/>
		</div>
	)
}

export default EmailInput;

