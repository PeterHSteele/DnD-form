import React from 'react';

function CheckBoxInput (props){
	
	/*let uid;
	if (props.uid > -1){
		uid = props.uid;
	} else {
		uid = null;
	}*/
	//console.log(props.uid)
	return (
		<div className='check-component-wrapper'>
			<label htmlFor={props.id}>
				{props.label}
			</label>

			<div className="check-wrap clearfix">
			<input 
			type="checkbox" 
			id={props.id}
			name={props.name} 
			onChange={ (e) => props.handleChange( e, props.uid) }
			checked={props.checked}/>
			
				<div 
				onClick={ (e) => props.checkBoxClick( e, props.uid, props.name) } 
				className='checkbox'/>
			</div>
			
		</div>
	)
}

export default CheckBoxInput;