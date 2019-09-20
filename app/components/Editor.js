import React, { useState } from 'react';
import RadioGroup from './expRadioGroup.js';
import SubmitButton from './SubmitButton.js';
import Info from './Info.js';
import TextInput from './TextInput.js';
import CheckBoxInput from './CheckBoxInput.js';
import EmailInput from './EmailInput.js';
import Select from './Select.js';

const types = [
	"text",
	"radio group",
	"checkbox",
	"email",
	'select'
];

const noDragging  = {
	handleDragEnd   : () => null,
	handleDragEnter : () => null, 
	handleDragOver  : () => null,
	handleDragLeave : () => null
}

function Editor(props){
	const dragged = useState('');
	const { fields } = props;

	let renderPreview = () => {
		//return props.preview ? <Preview {...props} /> : null ;
		return null;
	}

	let renderInfo = (name,type) => {
		return props.errors[name] && <Info message={props.errors[name]} type={type} /> 
	}

	let renderPlaceholderInput = ( type ) => type === 'text' || type === 'email';
	let renderOptionsInput = (type) => type === 'radio group' || type === 'select';

	

	return (
		
		<form className="inputs-editor">
				
				<h2>Input Attributes</h2>
				
				
				<RadioGroup 
					label		 = "What type of input should we make?"
					options		 = { types } 
					{...noDragging}
					name 		 = "type" 
					handleChange = { props.handleEditorChange } 
					checked		 = { fields.type } />
				{ renderInfo('type') }
				
				
					<TextInput 
						name 	 		= "name"
						id		 		= "name"
						handleChange 	= { (e)=>props.handleEditorChange(e) }
						value			= { fields.name } 
						label		 	= "Name"
						{...noDragging}
						placeholder 	= "e.g., 'zip_code' or 'first name'" 
						handleFocus 	= { () => null }
						handleBlur 		= { () => null } />
				{ renderInfo('name', 'error' ) }
			
				
				{ renderPlaceholderInput( fields.type ) &&
				<TextInput 
						name 	 		= "placeholder"
						id		 		= "placeholder"
						handleChange	= { props.handleEditorChange }
						value			= { fields.placeholder } 
						label		 	= "Placeholder"
						placeholder 	= "Example User Input"
						{...noDragging}
						required	 	= { false } 
						handleFocus 	= { () => null }
						handleBlur 		= { () => null }/> 
				}
				{ renderPlaceholderInput( fields.type) && renderInfo( 'placeholder', 'error' ) }
				
				
				<TextInput 
						name 	 		= "label"
						id		 		= "label"
						handleChange	= { props.handleEditorChange }
						value			= { fields.label } 
						label		 	= "Label"
						placeholder 	= "First Name"
						{...noDragging}
						required	 	= { false } 
						handleFocus 	= { props.handleInputFocus }
						handleBlur 		= { () => null }/>

				{ renderInfo( 'label', 'error' ) } 
				

				{ renderOptionsInput(fields.type) && 
				
				<TextInput
					name 		 = "options"
					id 			 = "radio_options"
					handleChange = { props.handleEditorChange }
					value 		 = { fields.options }
					{...noDragging}
					label 		 = "Button Values"
					placeholder  = "chocolate, strawberry, vanilla" 
					handleFocus  = { () => null }
					handleBlur 	 = { () => null }/>
					
				} 

				{ fields.type === 'radio group' && 
					renderInfo( 'options', 'error' )
				}

				<TextInput
					name 		 = "id"
					id 			 = "id"
					handleChange = { props.handleEditorChange }
					value 		 = { fields.id }
					label 		 = "Id Attribute"
					{...noDragging}
					placeholder  = "my-input-name" 
					handleFocus  = { props.handleInputFocus }
					handleBlur 	 = { () => null }/>
				
				
				<CheckBoxInput 
					label="Required"
					name="required"
					value="required"
					id="required"
					{...noDragging}
					handleChange = { (e) => props.handleEditorChange(e) }
					checked = { fields.required  }
					checkBoxClick={ props.handleCheckboxClick }/>
				
				<div>
					<input 
					style={{clear:'both	'}}
					type="submit" 
					id="genPreview" 
					value="Generate Input" 
					onClick = { (e) => props.generatePreview(e) } />
				</div>
			</form> 
		
	)
}	

export default Editor;