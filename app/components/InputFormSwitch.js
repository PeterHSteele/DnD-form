import React from 'react';

export default function InputFormSwitch({ children, value, handleChange }){
	return (
		<div className="card edit-pane">
			<label className="radio-label">
				<input type="radio" name="level" id="form-level" value="form" checked = { value === 'form'} onChange={ handleChange }/>
				Set form attributes
			</label>
			<label className="radio-label">
				<input type="radio" id="input-level" name="level" value="input" checked = { value === 'input'}  onChange={ handleChange }/>
				Make Inputs
			</label>
			{children}
		</div>
	)
}