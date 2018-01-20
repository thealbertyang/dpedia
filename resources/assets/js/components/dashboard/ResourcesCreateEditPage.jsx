import React from 'react'
import Sidebar from '../../components/Sidebar'
import { connect } from "react-redux"
import store from "../../store"
import { getCategories, getTags, getExperts, getResource, submitForm, update, clearStatus } from '../../actions/resourcesActions'
import { clearMsg } from '../../actions/msgActions'
import { Form, Field, reduxForm, SubmissionError } from 'redux-form'
import { Redirect, Link } from 'react-router-dom'
import { Messages } from '../../components/Messages'
import 'react-quill/dist/quill.snow.css'; // ES6
import ReactQuill, { Quill } from 'react-quill'; // ES6

import Select, {Creatable} from 'react-select';
import { ImageUpload } from '../ImageUpload'

// Be sure to include styles at some point, probably during your bootstrapping
import 'react-select/dist/react-select.css';

/*
let Block = Quill.import('blots/block');

class BlockquoteBlottest extends Block { }
BlockquoteBlottest.blotName = 'blockquotetest';
BlockquoteBlottest.tagName = 'blockquote';
Quill.register(BlockquoteBlottest);
*/

const renderTextField = ({ input, label, type, meta: { touched, error }, errors }) =>
<div className={errors ? 'has-danger' : ''}>
	<label>
	  {label}
	</label>
  	<input {...input} placeholder={label} type={type} className="form-control" />
	{errors && <small className="form-control-feedback">{errors}</small>}
	{touched && error &&
	<span>
		{error}
	</span>}
</div>

const renderSelectField = ({ input, label, meta: { touched, error }, errors, children }) => {

return (<div className={errors ? 'has-danger' : ''}>
	<label>
	  {label}
	</label>
  	<select {...input} placeholder={label} className="form-control" >
  		<option value="">Select a {label}</option>
  		{children}
  	</select>
	{errors && <small className="form-control-feedback">{errors}</small>}
	{touched && error &&
	<span>
		{error}
	</span>}
</div>)

}

const renderSelectableField = ({ input, label, meta: { touched, error }, errors, children, options }) => {

return (<div className={errors ? 'has-danger' : ''}>
	<label>
	  {label}
	</label>
	<Select
		{...input}
	  options={options}
	  placeholder={label}
	  onBlur={()=>{input.onBlur(input.value)}}
	/>
	{errors && <small className="form-control-feedback">{errors}</small>}
	{touched && error &&
	<span>
		{error}
	</span>}
</div>)

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

const FileInput = ({
  input: {
    value: value,
    onChange,
    onBlur,
    ...inputProps,
  },
  meta: omitMeta,
  ...props,
}) => {
    let reader = new FileReader();
    let file; 

    if(value instanceof File){
   	reader.readAsDataURL(value);


   	reader.onloadend = (function(upload) {
   		//console.log('file worked', upload.target.result)
   		
    	return function(e){
     		var data = upload.target.result;
     	}
   	})(value);
   	console.log(reader.onloadend);
   	file = reader.onloadend;


   }
   else {
   	file = '/'+value;
   }
    console.log('which one is it', file, returnFile( value, function(e) { return e.target.result }) );

	return (
		<div>
  <input
    onChange={adaptFileEventToValue(onChange)}
    onBlur={adaptFileEventToValue(onBlur)}
    type="file"
    {...inputProps}
    {...props}
  />
  	<img src={file} />
  </div>
	)

}

const renderUploaderField = ({ input, label, meta: { touched, error, onChange }, errors, children }) => {

return (<div className={errors ? 'has-danger' : ''}>
	<label>
	  {label}
	</label>
  	<ImageUpload {...input} 				
  					onChange={(e)=>{console.log('event', e); 
  					input.onChange(e);

				}} />
  	</div>)
}

const renderEditorField = ({ input, label, meta: { touched, error, onBlur }, errors, children }) => {

return (<div className={errors ? 'has-danger' : ''}>
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
	          ['bold', 'italic', 'underline','strike', 'blockquotetest'],
	          [{ 'color': [] }, { 'background': [] }],
	          [{ 'script': 'sub'}, { 'script': 'super' }],
	          [{ 'font': [] }],
	          [{ 'align': [] }],
	          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
	          ['link', 'image'],
	          ['clean']
	      ] }} />
	<textarea {...input} key="editor"
                className="quill-contents border_solid_top"
                ></textarea>{console.log(input.onChange.props)}
	{errors && <small className="form-control-feedback">{errors}</small>}
	{touched && error &&
	<span>
		{error}
	</span>}
</div>)

}


const renderTagsField = ({ input, label, meta: { touched, error, onBlur, onChange, onRemove, loadOptions }, errors, children, options }) => {


	//Only map if not undefined
	input.value = Object.keys(input.value).map((tag)=>{ //console.log(input.value[tag]); 
		return {'value': input.value[tag].id ? input.value[tag].id : input.value[tag].value, 'label': input.value[tag].title ? input.value[tag].title : input.value[tag].label } } );


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
													        

@connect((state) => {
	return {
		resources: state.resources.resources,
		form: state.resources.form,
		tags: state.resources.data,
		categories: state.resources.categories,
		experts: state.resources.experts,
		status: state.resources.status,
		errors: state.resources.errors,
		msg: {
			status: state.msg.status,
			action: state.msg.action
		}
	}
})
export class ResourcesCreateEditPage extends React.Component { 
	constructor(props){
		super(props);	
		this.submit = this.submit.bind(this);
	}


	submit(values){	
		switch(this.props.type) {
			case 'CREATE': {
				console.log('create')
				//console.log('values',values);

				let tags = Object.keys(values.tags).map((key)=>{ 
					console.log(values.tags[key]); 
					if(typeof values.tags[key].value == 'undefined'){ 
						return values.tags[key].id
						
					} else { 
						return values.tags[key].value 
					}
				} );

				if(values.category_id && typeof values.category_id.value !== 'undefined'){ values.category_id = values.category_id.value; }
				if(values.expert_id && typeof values.expert_id.value !== 'undefined'){ values.expert_id = values.expert_id.value; }
				if(values.status && typeof values.status.value !== 'undefined'){ values.status = values.status.value; }
				if(values.sponsored && typeof values.sponsored.value !== 'undefined'){ values.sponsored = values.sponsored.value; }

				this.props.dispatch(submitForm({...values, tags: JSON.stringify(tags) }));
				break;
			}
			case 'EDIT': {
				console.log('edit', values)
				//console.log('values tag',values.tags)
				let tags = Object.keys(values.tags).map((key)=>{ 
					console.log(values.tags[key]); 
					if(typeof values.tags[key].value == 'undefined'){ 
						return values.tags[key].id
						
					} else { 
						return values.tags[key].value 
					}
				} );

				if(values.category_id && typeof values.category_id.value !== 'undefined'){ values.category_id = values.category_id.value; }
				if(values.expert_id && typeof values.expert_id.value !== 'undefined'){ values.expert_id = values.expert_id.value; }
				if(values.status && typeof values.status.value !== 'undefined'){ values.status = values.status.value; }
				if(values.sponsored && typeof values.sponsored.value !== 'undefined'){ values.sponsored = values.sponsored.value; }

				this.props.dispatch(update({...values, id: this.props.match.params.id, tags: JSON.stringify(tags)  }));
				break;
			}
		}
  	}

	componentWillMount(){
		this.props.type == "EDIT" && this.props.dispatch(getResource(this.props.match.params.id));
		this.props.dispatch(getCategories());
		this.props.dispatch(getExperts());
		this.props.dispatch(getTags());
		this.props.dispatch(clearMsg());
		this.props.dispatch(clearStatus());
	
	}

	render(){
		//console.log('props',this.props);
		if(this.props.status == 'submit_success'){
			this.props.dispatch(clearStatus());

			return (
				<Redirect to="/dashboard/resources" />
			)
		}
		
		return (
			<div className="screen container-fluid">
			      	<div className="screen__container row">
				        <Sidebar/>

				        <main className="col-sm-9 ml-sm-auto col-md-10 p-0 main" role="main">
								<div className="page-header">
									<div className="container">
										<div className="row">
											<div className="col-6 header__title">
												<h1 className="title">Resources</h1> </div>
											<div className="col-6 header__actions text-right">
												{this.props.form && this.props.form.category && <a href={window.location.protocol+'//'+window.location.hostname+'/resources/'+this.props.form.category.slug+'/'+this.props.form.slug} style={{}}>{this.props.form.slug}</a>}
											</div>
										</div>
									</div>
								</div>
								{(this.props.msg.status == 'success' || this.props.msg.status == 'error') && (this.props.msg.action == 'update') &&
								<Messages type={this.props.type} />
								}
								<div className="page-body p-5">
									<div className="container">
										<Form onSubmit={this.props.handleSubmit(this.submit)} className="form row" encType="multipart/form-data" method="POST">
										    	<div className="col-md-8">
										    		<div className="card">
													    <div className="card-header">
													    	<h6>{this.props.type == "EDIT" && 'Editing' || this.props.type == "CREATE" && 'Creating'} Resource</h6>
													    </div>
													    <div className="card-block">
															<div className="form-group row">
																<div className="col-sm-12">
													        		<Field name="title" component={renderTextField} type="text" label="Resource Title" errors={this.props.errors && this.props.errors.title} />
													 			</div>
													 		</div>
													 		<div className="form-group row">
																<div className="col-sm-12">
													        		<Field name="slug" component={renderTextField} type="text" label="Page Slug" errors={this.props.errors && this.props.errors.slug} />
													 			</div>
													 		</div>
													 		<div className="form-group row">
																<div className="col-sm-12">
															        <Field name="category_id" component={renderSelectableField} options={this.props.categories} label="Resource Type" />
															    </div>
															</div>
													 		<div className="form-group row">
													 			<div className="col-sm-12">
																	<Field name="description" component={renderEditorField} type="text" label="Description (Excerpt)" errors={this.props.errors && this.props.errors.description} />
															  	</div>
													 		</div>
													 		<div className="form-group row">
															  	<div className="col-sm-12">
																	<Field name="body" component={renderEditorField} type="text" label="Body" errors={this.props.errors && this.props.errors.body} />
															  	</div>
															</div>
															<div className="form-group row">
															  	<div className="col-sm-12">
															  		<Field name="url" component={renderTextField} type="text" label="URL" errors={this.props.errors && this.props.errors.url} />
															  	</div>
															</div>
															<div className="form-group row">
															  	<div className="col-sm-6">
															  		<Field name="ios_url" component={renderTextField} type="text" label="iOS URL" errors={this.props.errors && this.props.errors.ios_url} />
															  	</div>
															  	<div className="col-sm-6">
															  		<Field name="google_url" component={renderTextField} type="text" label="Google Play URL" errors={this.props.errors && this.props.errors.google_url} />
															  	</div>
															</div>
															<div className="form-group row">
															  	<div className="col-sm-6">
															  		<Field name="ios_rating" component={renderTextField} type="text" label="iOS Rating" errors={this.props.errors && this.props.errors.ios_url} />
															  	</div>
															  	<div className="col-sm-6">
															  		<Field name="google_rating" component={renderTextField} type="text" label="Google Rating" errors={this.props.errors && this.props.errors.google_url} />
															  	</div>
															</div>
															
															<div className="form-group row">
															  	<div className="col-sm-6">
															  		<label>
															  			Icon Upload
															  		</label>
																	<Field name="icon_img" component={FileInput} label="Icon Image" />
																</div>
															  	<div className="col-sm-6">
															  		<label>
															  			Header Upload
															  		</label>
																	<Field name="header_img" id="header_img" component={FileInput} label="Header Image" />
																</div>
															</div>
																															
													    </div>
													</div>

												</div>
												<div className="col-md-4">
													<div className="card">
														<div className="card-header">
													    	<h6>Save Changes</h6>
													    </div>
													    <div className="card-block">
													    	<div className="form-group row">
																<div className="col-sm-12">
																    <Field name="status" component={renderSelectableField} 
																    options={[{'value':'draft','label':'Draft'},{'value':'published','label':'Published'}]} label="Status" errors={this.props.errors && this.props.errors.status}/>
																</div>
															</div>
															<div className="form-group row">
																<div className="col-sm-12">
																  	<Field name="tags" component={renderTagsField} type="text" label="Tags" options={this.props.tags} errors={this.props.errors && this.props.errors.tags} />
																</div>
															</div>
															<div className="form-group row">
																<div className="col-sm-12">
																    <Field name="sponsored" component={renderSelectableField} 
																    options={[{'value':1,'label':'Yes'},{'value':0,'label':'No'}]} label="Sponsored" errors={this.props.errors && this.props.errors.sponsored}/>
																</div>
															</div>
														</div>
													    <div className="card-footer">
												        	<button type="submit" className="btn btn-primary">Save changes</button>
												        	<Link to='/dashboard/resources' className="btn btn-secondary">Close</Link>
														</div>
													</div>
													<div className="card">
														<div className="card-header">
													    	<h6>Expert</h6>
													    </div>
													    <div className="card-block">
															<div className="form-group row">
															  	<div className="col-sm-12">
															        <Field name="expert_id" component={renderSelectableField} options={this.props.experts} label="Expert" />
																</div>
															</div>
															<div className="form-group row">
															  	<div className="col-sm-12">
															  		<Field name="quote" component={renderTextField} type="text" label="Quote" errors={this.props.errors && this.props.errors.quote} />
															  	</div>
															</div>
														</div>
													</div>
											</div>
										</Form>

									</div>
								</div>
				        </main>
			        </div>
			</div>
		)
	}
}

ResourcesCreateEditPage = connect(store => ({ initialValues: store.resources.form}))(reduxForm({form: 'resources', enableReinitialize: true})(ResourcesCreateEditPage));
export default ResourcesCreateEditPage;