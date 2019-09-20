import React from 'react';

function Select(props){
	
	return(
		<div >
			<label>
				{ props.label }
			</label>
			<select 
			id		 = { props.id }
			onChange = { (e) => props.handleChange( e, props.uid) }
			>
				{props.options.map((e,i)=>{
					return (
						<option key = {i}>
							{e}
						</option>
					)
				})}
			</select>
		</div>
	)
}

export default Select;