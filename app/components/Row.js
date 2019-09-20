import React from 'react';
import TextInput     		from './TextInput.js';
import CheckBoxInput 		from './CheckBoxInput.js';
import SubmitButton  		from './SubmitButton.js';
import TelInput 			from './TelInput.js';
import EmailInput 			from './EmailInput.js';
import Info					from './Info.js';
import Editor				from './Editor.js';
import RadioGroup			from './expRadioGroup.js';
import Select 				from './Select.js';

function Row(props){
  let style;

  let handleDrop = (e) => {
  	e.stopPropagation();
  	props.handleDrop(e)
  }
  
  if ( props.rowNumber === props.dragEnter ){
   // if ( props.controls.length < 2 ){
      switch (props.position){
        case 'left': style = { borderLeft:'1px solid red' };break;
        case 'bottom': style = { borderBottom:'1px solid red' } ;break;
        case 'right': style = { borderRight:'1px solid red' };break;
        default:style = { border: 'none' }
      }
   /*} else {
      style = { borderBottom: '1px solid red' }
    }*/
  } 

 let conditionalClass = props.controls.length === 2 ? ' half-width' : '';

  return (
    
    <div className='row'
      style={style}
      onDrop = { handleDrop }
      onDragEnter={ (e) => props.handleDragEnter( e, props.rowNumber)}
      onDragOver={ (e) => props.handleDragOver(e) }
      onDragLeave={ (e) => props.handleDragLeave(e) }>
      {props.controls.map((e,i)=>{
    	return(
      	
        			e.type === 'text' ?

					<div 
					className	= { e.className + conditionalClass } 
					draggable 
					onDragOver  = { props.handleDragOver }
					onDragStart = { (event) => props.handleDragStart(event , e.uid ) } 
					key			= { e.uid } >
						<TextInput
						dragEnter  	 	= { props.dragEnter === e.uid }
						uid		 	 	= { e.uid }
						label		 	= { e.label }
						name 		 	= { e.name }
						value		 	= { e.value }
						handleChange 	= { props.handleChange }
						handleFocus  	= { props.handleFocus }
						handleBlur   	= { props.handleBlur }
						{...props}
						placeholder  	= { e.placeholder } 
						id			 	= { e.id } 
						maxLength	 	= { e.maxLength }
						error		 	= { e.error }
						required	 	= { e.required } />

						
						{ e.error && <Info message={e.error} type="error" />}
					</div>
					: e.type === 'select' ?

					<div
					draggable 
					onDragStart = { (event) => props.handleDragStart(event , e.uid ) }
					key			= { e.uid } 
					className 	= { e.className + conditionalClass} >
						<Select 
						key			  = { e.uid }
						uid   		  = { e.uid }
						label		  = { e.label }
						name 		  = { e.name }
						value 		  = { e.value }
						options		  = { e.options }
						handleChange  = { props.handleChange }
						handleFocus   = { props.handleFocus }
						handleBlur    = { props.handleBlur }
						{...props}
						checked 	  = { e.value === true }
						className     = { e.className } 
						required	  = { e.required }
						id			  = { e.id }/>
						
					</div>

					
					: e.type === 'checkbox' ? 
					
					<div 
					draggable 
					onDragStart = { (event) => props.handleDragStart(event , e.uid ) }
					key			= { e.uid } 
					className 	= { e.className + conditionalClass }
					>
						<CheckBoxInput
						key			  = { e.uid }
						uid   		  = { e.uid }
						label		  = { e.label }
						name 		  = { e.name }
						value 		  = { e.value }
						handleChange  = { props.handleChange }
						handleFocus   = { props.handleFocus }
						handleBlur    = { props.handleBlur }
						{...props}
						checked 	  = { e.value === true }
						className     = { e.className } 
						required	  = { e.required }
						checkBoxClick = { props.checkboxClick }
						id			  = { e.id } />

						{ e.error && <Info message={e.error} type="error" />}	
					</div>

					: e.type === 'radio group' ?

					<div 
					draggable 
					className	={e.className} 
					onDragStart = { (event) => props.handleDragStart(event, e.uid) } 
					key			={ e.uid }>
						<RadioGroup
						dragEnter  	 	= { props.dragEnter === e.uid }
						uid		 	 	= { e.uid }
						label		 	= { e.label }
						name 		 	= { e.name }
						options			= { e.options }
						checked			= { e.value }
						handleChange 	= { props.handleChange }
						handleFocus  	= { props.handleFocus }
						handleBlur   	= { props.handleBlur }
						{...props}
						placeholder  	= { e.placeholder } 
						id			 	= { e.id } 
						error		 	= { e.error }
						required	 	= { e.required } />

						
						{ e.error && <Info message={e.error} type="error" />}
					</div>
					
					: e.type === 'email' ?

					<div 
					draggable 
					key 		= { e.uid } 
					className 	= {e.className}
					onDragStart = { (event) => props.handleDragStart(event , e.uid ) }>
						<EmailInput
						uid 		 = { e.uid }
						placeholder  = { e.placeholder }
						value 		 = { e.value }
						label 		 = { e.label }
						name 		 = { e.name }
						handleChange = { props.handleChange }
						handleFocus  = { props.handleFocus }
						handleBlur 	 = { props.handleBlur }
						{...props}
						required 	 = { e.required }
						id 			 = { e.id }
						title		 = { e.title } />
					</div> 

					: e.type === 'tel' ?

					<div 
					draggable 
					key			= { i } 
					className   = { e.className }
					onDragStart = { (event) => handleDragStart(event , e.uid ) }>
						<TelInput
						key			 = { i }
						handleChange = { props.handleChange }
						placeholder  = { e.placeholder }
						value 		 = { props[i].value }
						label		 = { e.label }
						name 		 = { e.name }
						handleChange = { props.handleChange }
						handleFocus  = { props.handleFocus }
						handleBlur   = { props.handleBlur }
						required	 = { e.required }
						id 			 = { e.id } 
						title		 = { e.title }/>

						
					</div>
					
					: e.type === 'submit' ?

					<div key= { i }>
						<SubmitButton
						key			= { i } 
						handleClick = { ()=>null }
						value 		= { e.value }
						id 			= { e.id } />
					</div> 
					
					: null
				
       	)
   	  })}
    </div> 
   
  )
}
	
export default Row;