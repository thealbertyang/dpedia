import React from 'react'
import Sidebar from '../../components/Sidebar'
import { connect } from "react-redux"
import store from "../../store"
import { getExpert, crudStore, update, clearStatus, setDefault } from '../../actions/expertsActions'
import { clearMsg } from '../../actions/msgActions'
import { Form, Field, reduxForm, SubmissionError } from 'redux-form'
import { Redirect, Link } from 'react-router-dom'
import { Messages } from '../../components/Messages'
import 'react-quill/dist/quill.snow.css'; // ES6
import ReactQuill, { Quill } from 'react-quill'; // ES6

import Select, {Creatable} from 'react-select';

// Be sure to include styles at some point, probably during your bootstrapping
import 'react-select/dist/react-select.css';



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

//input.value = !input.value ? children[0].props.value : input.value;

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

const renderEditorField = ({ input, label, meta: { touched, error, onBlur }, errors, children }) => {

//input.value = !input.value ? children[0].props.value : input.value;

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
	{errors && <small className="form-control-feedback">{errors}</small>}
	{touched && error &&
	<span>
		{error}
	</span>}
</div>)

}


const renderTagsField = ({ input, label, meta: { touched, error, onBlur, onChange, onRemove, loadOptions }, errors, children, options }) => {

	//console.log(JSON.stringify(['Web MD', 'Hospital']))
	//console.log(input.value)
	//input.value && console.log(JSON.parse(input.value));

	if(input.value){
		if(!(input.value instanceof Object)){
			input.value = JSON.parse(input.value);
		}
		input.value = Object.keys(input.value).map((key, tag)=>{ console.log(input.value[tag]);
			console.log(key);
			return { 'value': key, 'label': input.value[tag].label ? input.value[tag].label : input.value[tag] };
		});
	}

	//Only map if not undefined
	//input.value = Object.keys(input.value).map((tag)=>{ console.log(input.value[tag]); 
		//return {'value': input.value[tag].id ? input.value[tag].id : input.value[tag].value, 'label': input.value[tag].title ? input.value[tag].title : input.value[tag].label } } );


	return (
		<div className={errors ? 'has-danger' : ''}>
			<label>
			  {label}
			</label>
			<Creatable multi={true}
				onChange={(e)=>{
					input.onChange(e); 
					console.log('event', e); 
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

@connect((state) => {
	return {
		experts: state.experts.experts,
		form: state.experts.form,
		status: state.experts.status,
		errors: state.experts.errors,
		msg: {
			status: state.msg.status,
			action: state.msg.action
		}
	}
})
export class ExpertsCreateEditPage extends React.Component { 
	constructor(props){
		super(props);	
		this.submit = this.submit.bind(this);
	}


	submit(values){	
		switch(this.props.type) {
			case 'CREATE': {
				console.log('create')
				console.log('values',values);

				let affiliations = Object.keys(values.affiliations).map((key, index)=>{ 
					{ 
						return values.affiliations[key].label 
					}
				});
				this.props.dispatch(crudStore({...values, affiliations: JSON.stringify(affiliations) }));
				break;
			}
			case 'EDIT': {
				console.log('edit', values)
				let affiliations = Object.keys(values.affiliations).map((key, index)=>{ 
					{ 
						return values.affiliations[key].label 
					}
				});

				this.props.dispatch(update({...values, id: this.props.match.params.id, affiliations: JSON.stringify(affiliations)  }));
				break;
			}
		}
  	}

	componentWillMount(){
		this.props.type == "EDIT" && this.props.dispatch(getExpert(this.props.match.params.id));
		console.log('pulling params id',this.props.match.params.id)
		this.props.dispatch(clearMsg());
		this.props.dispatch(clearStatus());
	}

	componentDidMount(){
		console.log('props', this.props);
	}

	render(){
		
		if(this.props.status == 'submit_success'){
			this.props.dispatch(clearStatus());

			return (
				<Redirect to="/dashboard/experts" />
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
												<h1 className="title">Experts</h1>
											</div>
										</div>
									</div>
								</div>
								{(this.props.msg.status == 'success' || this.props.msg.status == 'error') && (this.props.msg.action == 'update') &&
								<Messages type={this.props.type} />
								}
								<div className="page-body p-5">
									<div className="container">
										<Form onSubmit={this.props.handleSubmit(this.submit)} className="form row">
										    	<div className="col-md-12">
										    		<div className="card">
													    <div className="card-header">
													    		<h5>{this.props.type == "EDIT" && 'Editing' || this.props.type == "CREATE" && 'Creating'} Expert</h5>
													    </div>
												    <div className="card-block">
														<div className="form-group row">
														  	<div className="col-sm-6">
														  		<Field name="first_name" component={renderTextField} type="text" label="First Name" errors={this.props.errors && this.props.errors.first_name} />
														  	</div>
														  	<div className="col-sm-6">
														  		<Field name="last_name" component={renderTextField} type="text" label="Last Name" errors={this.props.errors && this.props.errors.last_name} />
														  	</div>
														</div>
														<div className="form-group row">
														  	<div className="col-sm-12">
														  		<Field name="credentials" component={renderTextField} type="text" label="Credentials" errors={this.props.errors && this.props.errors.credentials} />
														  	</div>
														</div>
														<div className="form-group row">
														  	<div className="col-sm-12">
														  		<Field name="affiliations" component={renderTagsField} type="text" label="Affiliations" errors={this.props.errors && this.props.errors.affiliations} />
														  	</div>
														</div>
														<div className="form-group row">
														  	<div className="col-sm-12">
														  		<label>
															  		Avatar Upload
															  	</label>
																<Field name="avatar_img" component={FileInput} label="Avatar" />
															</div>
														</div>
														<div className="form-group row">
														  	<div className="col-sm-12">
														  		<Field name="personal_url" component={renderTextField} type="text" label="Personal Website URL" errors={this.props.errors && this.props.errors.personal_url} />
														  	</div>
														</div>
														<div className="form-group row">
														  	<div className="col-sm-4">
														  		<Field name="address" component={renderTextField} type="text" label="Address" errors={this.props.errors && this.props.errors.address} />
														  	</div>
														  	<div className="col-sm-3">
														  		<Field name="city" component={renderTextField} type="text" label="City" errors={this.props.errors && this.props.errors.city} />
														  	</div>
														  	<div className="col-sm-2">
														  		<Field name="state" component={renderTextField} type="text" label="State" errors={this.props.errors && this.props.errors.state} />
														  	</div>
														  	<div className="col-sm-3">
														  		<Field name="zip" component={renderTextField} type="text" label="Zip" errors={this.props.errors && this.props.errors.zip} />
														  	</div>
														</div>
														<div className="form-group row">
														  	<div className="col-sm-12">
														  		<Field name="email" component={renderTextField} type="text" label="Email" errors={this.props.errors && this.props.errors.email} />
														  	</div>
														</div>
													</div>
													    <div className="card-footer">
												        	<button type="submit" className="btn btn-primary">Save changes</button>
												        	<Link to='/dashboard/experts' className="btn btn-secondary">Close</Link>
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

ExpertsCreateEditPage = connect(store => ({ initialValues: store.experts.form}))(reduxForm({form: 'resources', enableReinitialize: true})(ExpertsCreateEditPage));
export default ExpertsCreateEditPage;