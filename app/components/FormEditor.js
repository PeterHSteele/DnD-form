import React from 'react';

export default function FormEditor({ values, handleChange }){
	return (
		
			<form className="form-editor">
				<h2>Form Attributes</h2>
				<div>
					<label htmlFor='edit-form-title'>Title</label>
					<input 
					placeholder = 'Mailing List Signup'
					name   	 	= "title"
					type 	 	= "text" 
					value 	 	= { values.title } 
					onChange 	= { handleChange }
					id		 	= 'edit-form-title' />
				</div>
				<div>
					<label htmlFor='edit-form-action'>Action</label>
					<input 	 
					name 	 	= "action"
					type 	 	= "text" 
					placeholder = 'http://myurl.com'
					value 	 	= { values.action } 
					onChange 	= { handleChange }
					id		 	= 'edit-form-action' />
				</div>
				<div>
					<label>Method</label>
					<div className = 'radio-options-wrap'>
						<label className="radio-label">
							<input 
							onChange = { handleChange }
							name 	 = "method"
							type	 = "radio" 
							value 	 = "post" 
							checked = { values.method === 'post' } 
							id		 = 'edit-form-method-post' />
							Post
						</label>
						<label className="radio-label">
							<input
							onChange = { handleChange }
							name 	 = "method"
							type	 = "radio" 
							value 	 = "get" 
							checked = { values.method === 'get'}
							id		 = 'edit-form-method-get' />
							Get
						</label>
					</div>
				</div>
			</form>
		
	)
}