import React , { useState } from 'react';
import Row from './Row.js';
import Editor from './Editor.js';
import FormEditor from './FormEditor.js';
import InputMaker from './InputMaker.js';
import '../css/style.css';
import RadioGroup from './expRadioGroup.js';
import SubmitButton from './SubmitButton.js';
import TextInput from './TextInput.js';
import CheckBoxInput from './CheckBoxInput.js';
import EmailInput from './EmailInput.js';
import InputFormSwitch from './InputFormSwitch.js';
import CardWithTitle from './CardWithTitle.js'
import Select from './Select.js';
import Dots from './Dots.js';

const textRequiredFields 		  = ['name','id','label','placeholder'];
const selectOrRadioRequiredFields = ['name','id','label','options'];
const checkBoxRequiredFields 	  = ['name','id','label'];

const handleBlur = () => null;

function lookupIndexByUid ( inputs, index, uid ) {
			let input = inputs[ index ];
			if ( input ){
				
				return input.uid === uid ? index : lookupIndexByUid( inputs, index+1 , uid );
			} else {
				
				return inputs.length;
			}
		}

function spliceInput( controls, dropped, dragEnter ){
	let input;
	const [ rowNum, col ] = search( dropped, controls, 0);
	if (controls[rowNum].length === 2) {
		input = controls[rowNum].splice( col, 1)[0];
		
	} else {

		input = controls[rowNum][0];
		controls.splice( rowNum, 1);
		if ( dragEnter > rowNum){
			dragEnter--;
		}					
	}
	
	return [input , dragEnter];
}

const search = ( val, arr, index) => {
 
  let rowUids = arr[index].map((e)=>e.uid);
  let column = rowUids.indexOf(val)
  if ( column > -1){
    return [index,column];
  } else {
    return search(val,arr,index+1)
  }
  
};

function addGeneratedProperties ( dropped, uid ) {

			dropped.uid 	  = uid;
			dropped.error 	  = false;
			dropped.className = 'control';
			dropped.value 	  = '';
		
	return dropped;
}

function ReactForm(props){

	const [ inputs, updateVal ] = useState( initialState );

	let handleChange = (e,uid) => {
		
		const type = e.target.type, 
			  val  = e.target.value, 
			  name = e.target.name;	

		let [ row, col ] = search( uid, inputs.controls, 0 )
		
		
		let input = Object.assign(
			{},
			inputs.controls[row][col],
			{value: type === 'checkbox' ? !inputs.controls[row][col].value : val}
		);

		let controls = [...inputs.controls]
		controls[row][col] = input;

		updateVal( prevState => {
			return {...prevState, controls:controls}
		})
	}

	let handleEditorChange = ( e ) => {

		function genLabel(str){
			return str.split(/[_\s-]/).map(e=>e.charAt(0).toUpperCase()+e.slice(1)).join(" ")
		}

		function genId(str){
			return str.split(/[_\s]/).join("-")
		}
		
		const { type, value, name } = e.target;
		let editor = {...inputs.editor},
		focused = inputs.focused;

		editor[name] = type === 'checkbox' ? ! inputs.editor[name] : value;
		if (name === 'name'){
			
			editor.id = focused.indexOf('id') > -1 ? inputs.editor.id : genId( value ); 

			editor.label=focused.indexOf('label') > -1 ? inputs.editor.label : genLabel(value);
		}
		
		updateVal( prevState => {
			return {...prevState,
				editor:editor,
				editorErrors:{},
				preview:false
			}
		})

	}

	const handleEditViewChange = (e) => {
		const { value } = e.target;
		updateVal( prevState => {
			return { ...prevState, editView: value }
		})
	}

	const handleFormEditorChange = (e) => {
		const { name, value } = e.target;
		let formAttrEditor = {...inputs.formAttrEditor}
		formAttrEditor[name] = value;
		updateVal( prevState => {
			return { ...prevState, formAttrEditor: formAttrEditor }
		})
	}

	const handleDragOver = (e) => {
	   e.preventDefault();
	   
	      const x = e.clientX,
	            y = e.clientY,
	            rectX = e.currentTarget.getBoundingClientRect().x,
	            width = e.currentTarget.getBoundingClientRect().width;
	      const percent =  ( x - rectX ) / width;
	      let position;
	      if (percent < .2 ){
	        position = 'left';
	      } else if ( percent < .8 ){
	        position = 'bottom';
	      } else {
	        position = 'right';
	      }
	    
	      updateVal({
	        ...inputs,
	        position: position
	      })
	    
	  }

	let handleDrop = ( e ) => {
		e.preventDefault();
		let dragEnter  = inputs.dragEnter,
			position   = inputs.position,
			dropped    = inputs.dragged,
			controls   = [...inputs.controls],
			flattened  = controls.reduce( (a,b) => a.concat(b), []),
			newControl = typeof dropped === 'object',
			input,
			coords,
			row;
		
		if ( newControl ){
			input = addGeneratedProperties( dropped, flattened.length);
		}

		if ( ! newControl ){
			
			[ input, dragEnter ] = spliceInput( controls, dropped, dragEnter)

		}
		if ( ! controls[dragEnter] ){
			controls.splice(dragEnter, 0, [input] );
		} else if ( controls[dragEnter] && controls[dragEnter].length > 1 || position === 'bottom' ){
			controls.splice( dragEnter + 1, 0, [input] );
		} else {
			row = position === 'left' ?
			[ input, controls[dragEnter][0] ]:
			[ controls[dragEnter][0], input ];

			controls.splice( dragEnter, 1, row);
		}
		updateVal({
			...inputs,
			controls: controls,
			editor: newEditor,
			preview: false,
			position:undefined,
			focused:[],
		})

	}

	const handleFormDrop = (e) => {
		let	dropped 	= inputs.dragged,
			controls	= [...inputs.controls],
			flattened   = controls.reduce( (a,b) => a.concat(b),[]),
			newControl  = typeof dropped === 'object';
		
		if ( newControl ){
			dropped = addGeneratedProperties( dropped, flattened.length );
		} else {
			dropped = spliceInput( controls, dropped )[0];
		}

		controls.push( [dropped] );

		updateVal({
			...inputs,
			controls: controls,
			editor: newEditor,
			preview: false,
			position:undefined,
			focused:[],
		})
	}

	let handleFocus = (e) => {
		let focused = inputs.focused;
		focused.push( e.target.name );

		updateVal({
			...inputs,
			focused: focused,
		})
	}

	let handleEditPreview = (e, name) => {
		const editPreview = inputs.editPreview ? false : name ;
		updateVal({
				...inputs,
				editPreview: editPreview
			})
	}

	let generatePreview = (e) => {
		
		let checkFields = ( arr ) => {
			let missing = [];
			for ( let i = 0; i < arr.length; i++){
				if ( ! fields[arr[i]] ){
					missing.push(arr[i])
				}
			}
			return missing;
		}		

		e.preventDefault();
		function genLabel(str){
			return str.split('_').map(e=>e.charAt(0).toUpperCase()+e.slice(1)).join(" ")
		}

		let fields = inputs.editor,
			errors = {},
			preview = true,
			missingFields;

		if ( ! fields.type ){
			errors['type'] = 'Required Field';
			preview = false;
		} else {
			switch (fields.type){
				case 'select':      missingFields = checkFields( selectOrRadioRequiredFields );break;
				case 'radio group': missingFields = checkFields( selectOrRadioRequiredFields );break;
				case 'text': 		missingFields = checkFields( textRequiredFields );break;
				case 'email': 		missingFields = checkFields( textRequiredFields );break;
				case 'checkbox': 	missingFields = checkFields( checkBoxRequiredFields );break;
				default: 			missingFields = [];
			}

			if ( missingFields.length ){
				preview = false;
				missingFields.forEach((e) => errors[e] = 'Required Field');
			}
		}

		updateVal( prevState => {
			return{
				...inputs,
				preview: preview,
				editorErrors: errors,
			}
		})
	}

	let validateTel = ( input ) => {
		return input.slice(input.length-1).match(/[0-9]|^(?![\s\S])/);
	}

	let editorCheckboxClick = ( e, uid, name ) => {
		//console.log('inputs.editor.name: ',name)
		updateVal({
			...inputs,
			editor:{
				...inputs.editor,
				[name]:!inputs.editor[name]
			}
		})
	}

	let checkboxClick = ( e, uid ) => {
		//console.log('inputs.editor.name: ',name)

		//let index = lookupIndexByUid( inputs.controls, 0, uid);
		let [ row, col ] = search( uid, inputs.controls , 0)
		
		let input = Object.assign(
			{},
			inputs.controls[row][col],
			{value: !inputs.controls[row][col].value}
		);

		let controls = [...inputs.controls];
		controls[row][col] = input;


		updateVal({
			...inputs,
			controls: controls
		})
	}

	let handleDragStart = ( e , uid ) => {
		let dragged, controls = [...inputs.controls],index;
		
		if ( uid > -1 ){
			dragged = uid;
		} else { 
			dragged = inputs.editor;
		}
			
		updateVal({
			...inputs,
			dragged: dragged,
		})
		
	}

	let handleDragLeave = ( e ) => {
		e.preventDefault();
	}

	let handleDragEnter = ( e, row ) => {
		e.preventDefault();
		updateVal( prevState => {
			return { ...inputs, dragEnter: row };
		} );
	}

	let handleSubmit = function(e) {
		e.preventDefault();
		let data={},url=props.action,options;
		for (let prop in inputs){
			data[prop] = inputs[prop]['value'];
		}
		options={
			method:props.method,
			mode:'cors',
			headers:{
				'Content-Type':'application/json'
			},
			body:JSON.stringify( data )
		}
		fetch(url,options)
			.then( response => response.json() )
			.then( json => console.log( json ) )
			.catch( error => console.log( error ))

	}

	let renderInput = ( fields ) => {
		
		const dragEvents =  {
			handleDragEnter : handleDragEnter, 
			handleDragOver  : handleDragOver,
			handleDragLeave : handleDragLeave 
		}

		const focusEvents = {
			handleFocus : () => null,
			handleBlur : () => null
		}

		if (fields.options && typeof fields.options === 'string'){
			
			fields.options = fields.options.split(',');
			
		}

		return fields.type === 'text' ?
			   <TextInput {...fields} {...dragEvents} {...focusEvents} />:
			   fields.type === 'radio group'?
			   <RadioGroup {...fields} {...dragEvents} {...focusEvents} />:
			   fields.type === 'email'?
			   <EmailInput {...fields} {...dragEvents} {...focusEvents} />:
			   fields.type === 'checkbox' ? 
			   <CheckBoxInput {...fields} {...dragEvents} {...focusEvents} />:
			   fields.type === 'select' ?
			   <Select {...fields} {...dragEvents} {...focusEvents} />:
			   null;

	}

	const dragEvents = {
		handleDragEnter: handleDragEnter.bind(this), 
		handleDragLeave: handleDragLeave.bind(this), 
		handleDragOver: handleDragOver.bind(this), 
		handleDrop,
		handleDragStart
	}

	const inputHandlers = {
		handleChange,
		handleFocus,
		handleBlur,
		checkboxClick
	}

	console.log('editview', inputs.editView);
	
	return (
		<div className='container' >
			<InputFormSwitch
			handleChange = { handleEditViewChange }
			value 		 = { inputs.editView }
			>
				{inputs.editView === 'input' &&
				<Editor 
					handleDragStart={ handleDragStart.bind(this) }
					handleEditorChange={ handleEditorChange.bind(this) }
					preview = { inputs.preview }
					fields = { inputs.editor }
					handleCheckboxClick = { editorCheckboxClick } 
					generatePreview = { generatePreview.bind(this) } 
					errors = { inputs.editorErrors }
					editPreview = { inputs.editPreview }
					handleEditPreview = { handleEditPreview.bind(this) }
					handleInputFocus = { handleFocus.bind(this) }
					handleDragLeave = { handleDragLeave.bind(this) }
					handleDragOver	= { handleDragOver.bind(this) }
					handleDragEnter = { handleDragEnter.bind(this) }
					handleDrop = {handleDrop.bind(this) } />
				}

				{inputs.editView === 'form' &&
				<FormEditor 
				values 		 = { inputs.formAttrEditor } 
				handleChange = { handleFormEditorChange }/>
				}
			</InputFormSwitch>
			<CardWithTitle 
			className = 'react-form'
			title 	  = { inputs.formAttrEditor.title || 'Your title here' }>
				<form  
				onDragOver = { (e) => handleDragOver(e) }
				onDrop 	   = { handleFormDrop }>
				
				{	
					
					inputs.controls.map( (e,i) => {
						return	(
							<Row 
								controls  = { e } 
								key		  = { i } 
								{...dragEvents}
								{...inputHandlers}
								dragEnter = { inputs.dragEnter }
								position  = { inputs.position }
								rowNumber = { i } /> 
						)
					})

				}
				</form>	
			</CardWithTitle>

			{ inputs.editView === 'input' &&
			<CardWithTitle 
			title="Your New Input" 
			className="input-maker">
				<InputMaker 
				preview				= { inputs.preview }
				fields 				= { inputs.editor }
				renderInput 		= { renderInput } 
				handleDragStart		= { handleDragStart } 
				handleChange  		= { handleFormEditorChange } />
				{ !inputs.preview && <Dots /> }
			</CardWithTitle>
			}

		</div>
	)
}

export default ReactForm;

const controls = [
		[{
			id:'attending',
			label:'Attending',
			uid:0,
			className:'check control',
			type:'checkbox',
			name:'attending',
			required:true,
			maxLength:30,
			value:'',
			error:false
		}],
		[{
			id:'mars',
			uid:1,
			label:'I\'m from Mars',
			className:'check control',
			type:'checkbox',
			name:'mars',
			required:true,
			maxLength:30,
			value:'',
			error:false
		}],
	]
/*
controls.map( (e,i) => {
		return {...e,uid:i}
	}),

*/

	const newEditor = {
		name:'',
		type:'',
		required:false,
		placeholder:'',
		options:'',
		label:'',
		id:'',
	}

	const newFormAttrEditor = {
		title:'',
		action:'',
		method:''
	}

let initialState = {
	editView:'input',
	title:'React Form',
	dragged: null,
	dragEnter:undefined,
	controls: [],
	editor:newEditor,
	formAttrEditor:newFormAttrEditor,
	editorErrors:{

	},
	preview:false,
	editPreview:false,
	focused:[],
	position:undefined
}