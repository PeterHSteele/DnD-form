import React from 'React';

function ExpRadioGroup(props){
	
	return(
		<div>

			<p className='radio-group-label'>{props.label}</p>
			<div 
			className='radio-options-wrap clearfix'>
			{props.options.map( (e,i) => {
				
				return (
					<label className='radio-label' key={props.options[i] } >
						<input 
						type	 = "radio" 
						name 	 = { props.name } 
						value	 = { props.options[i] } 
						checked  = { props.checked === props.options[i] } 
						onChange = { (e) => props.handleChange( e, props.uid ) }/>

					{props.options[i]}
					
					</label>
				)
			})}
			</div>
		</div>
	)
}

export default ExpRadioGroup;