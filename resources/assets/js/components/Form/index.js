import React from 'react';
import Select, {Creatable} from 'react-select';
import 'react-quill/dist/quill.snow.css'; // ES6
import ReactQuill, { Quill } from 'react-quill'; // ES6
import PlaylistField from './PlaylistField';
import SelectableField from './SelectableField';
import SelectableBooleanField from './SelectableBooleanField';
import HeroField from './HeroField';

export const textareaField = ({ input, label, meta: { touched, error }, errors, children, options, placeholder }) => 
<div className='form-group'>
	<label>
	  {label}
	</label>
	<textarea {...input} placeholder={placeholder} className={`form-control ${errors && 'is-invalid'}`}>
	</textarea>
	{errors && <small className={errors && 'invalid-feedback'}>{errors}</small>}
	{touched && error &&
	<span>
		{error}
	</span>}
</div> 

export const inputField = ({ input, label, type, meta: { touched, error }, errors, placeholder }) =>
<div className='form-group'>
	<label>
	  {label}
	</label>
  	<input {...input} placeholder={placeholder} type={type} className={`form-control ${errors && 'is-invalid'}`} />
	{errors && <small className={errors && 'invalid-feedback'}>{errors}</small>}
	{touched && error &&
	<span>
		{error}
	</span>}
</div>

export const checkboxGroup = ({ label, required, name, options,  input, meta, errors}) => {
	return (
	<div className='form-group'>
	{label && (<label>
	  {label}
	</label>)}
	{ options.map((option, index) => (
        <div className="form-check" key={index}>
          <label className="form-check-label">
            <input type="checkbox"
            		className="form-check-input"
                   name={`${name}[${index}]`}
                   value={option.value}
                   checked={input.value.indexOf(option.value) !== -1}
                   onChange={event => {
                     const newValue = [...input.value];
                     if(event.target.checked) {
                       newValue.push(option.value);
                     } else {
                       newValue.splice(newValue.indexOf(option.value), 1);
                     }

                     return input.onChange(newValue);
                   }}/>
            {option.label}
          </label>
        </div>))
      }
      </div>
      )
}


export const selectableField = (props) => {

	//input.value = input.onChange(input.value);
	return (
		<SelectableField {...props} />
	)
}

export const selectableBooleanField = (props) => {

	//input.value = input.onChange(input.value);
	return (
		<SelectableBooleanField {...props} />
	)
}

export const editorField = ({ input, label, meta: { touched, error, onBlur }, errors, children }) => 
<div className={errors ? 'has-danger' : ''}>
	<label>
	  {label}
	</label>
  	<ReactQuill 
	{...input}

	onBlur={()=>{
	    input.onBlur(input.value)
	}}

	formats={[
	  'header', 'font', 'size',
	  'bold', 'italic', 'underline', 'strike', 'blockquotetest',
	  'list', 'bullet', 'indent',
	  'link', 'image', 'color',
	]} 
	modules={ { toolbar: [
	          [{ 'header': [1, 2, false] }],
	          ['bold', 'italic', 'underline','strike', 'blockquote'],
	          [{ 'color': [] }, { 'background': [] }],
	          [{ 'script': 'sub'}, { 'script': 'super' }],
	          [{ 'font': [] }],
	          [{ 'align': [] }],
	          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
	          ['link', 'image'],
	          ['clean']
	      ] }} />
	{/*<textarea {...input} key="editor" className="quill-contents border_solid_top"></textarea>*/}
	{errors && <small className={errors && 'invalid-feedback'}>{errors}</small>}
	{touched && error &&
	<span>
		{error}
	</span>}
</div>



export const tagsField = ({ input, label, meta: { touched, error, onBlur, onChange, onRemove, loadOptions }, errors, children, options }) => {
	//Only map if not undefined
	input.value = Object.keys(input.value).map((tag)=>{ 
		return {'value': input.value[tag].id ? input.value[tag].id : input.value[tag].value, 'label': input.value[tag].title ? input.value[tag].title : input.value[tag].label, create: (typeof input.value[tag].value == 'number' ? false : true) } } );


	return (
		<div className={errors ? 'has-danger' : ''}>
			<label>
			  {label}
			</label>
			<Creatable multi={true}
				onChange={(e)=>{
					input.onChange(e); 
					//console.log('event', e); 
				}}
				onBlur={()=>{input.onBlur([...input.value])}}
				value={input.value}
				options={options}
				backspaceRemoves={true} 
				deleteRemoves={true} 
				searchable={true} 
				clearable={true}
				/>
				{errors && <small className="form-control-feedback">{errors}</small>}
				{touched && error &&
				<span>
					{error}
				</span>}
		</div>
	)
}

export const playlistField = ({ input, options, label, type, ...props }) => {
	console.log('input', input);

	return (
		<div className='form-group row'>
			<PlaylistField onChange={(e)=>input.onChange(e)} value={input.value} type={type} options={options} name={input.name} {...props} />
		</div>
	)
}

export const heroField = ({ input, options, label, type, ...props }) => {
	console.log('input', input);

	return (
		<div className='form-group row'>
			<HeroField onChange={(e)=>input.onChange(e)} value={input.value} type={type} options={options} name={input.name} {...props} />
		</div>
	)
}

const adaptFileEventToValue = delegate =>
  e => delegate(e.target.files[0])

const returnFile = (file, callback) => {
	if(file instanceof File){
	var reader = new FileReader();
	reader.onload = callback;
	reader.readAsDataURL(file);

	return reader.result;
}
}


export const imageUploadField = ({ input: { value: value, onChange, onBlur, ...inputProps}, meta: omitMeta, ...props}) => {
    let reader = new FileReader();
    let file; 

    if(value instanceof File){


   	reader.onloadend = (function(upload) {
   		console.log('file worked', upload)
   		
    	return upload;
   	})(value);
   	reader.readAsDataURL(value);

   	console.log('reader', reader, 'reader result', reader.result, 'reader.onloadend', reader.onloadend);
   	file = reader.result;


   }
   else {
   	file = '/'+value;
   }
    console.log('which one is it', file);

	return (
		<div className="row">
			<div className="col-12">
				<input
				onChange={adaptFileEventToValue(onChange)}
				onBlur={adaptFileEventToValue(onBlur)}
				type="file"
				{...inputProps}
				{...props}
				/>
				<img src={file} className="full-width" />
  			</div>
  		</div>
	)

}