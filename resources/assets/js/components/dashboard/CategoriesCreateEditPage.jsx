import React from 'react'
import Sidebar from '../../components/Sidebar'
import { connect } from "react-redux"
import store from "../../store"
import { getCategories, getTags, get, crudStore, update, clearStatus, setDefault } from '../../actions/categoriesActions'
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


let countest = 0;
const renderTagsField = ({ input, label, meta: { touched, error, onBlur, onChange, onRemove, loadOptions }, errors, children, options }) => {
	console.log(countest);
	console.log(options);
	console.log('touched',touched);
	console.log('input.val', input.value);
	countest++;

	//if it hasn't been touched then 
	//(countest <= 2) && (console.log('input val 0 filled',input.value)) && (input.value) && (input.value[0] = {'label': input.value && input.value[0].title, 'value': input.value && input.value[0].id}) && (console.log('input val 0 filled',input.value))
	if(input.value) { 
		input.value = input.value.map((result)=>{ if(result == null){ console.log('nulled')} console.log('result',result); console.log('result iv',input.value); return {'value': result.id, 'label': result.title }});
	}

	console.log('input map', input.value);
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
/*
				options={

						[{
						'value': 'test',
						'label' : 'test'
						},
						{
						'value': 'test2',
						'label' : 'test2'
						}]
					
					}
					*/
				options={options}
				onRemove={()=>{console.log('test2')}}
				 backspaceRemoves={true} deleteRemoves={true} searchable={true} clearable={true}
				//onChange={input.onChange} 
				//loadOptions={input.loadOptions} 
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
		categories: state.categories.categories,
		form: state.categories.form,
		status: state.categories.status,
		errors: state.categories.errors,
		msg: {
			status: state.msg.status,
			action: state.msg.action
		}
	}
})
export class CategoriesCreateEditPage extends React.Component { 
	constructor(props){
		super(props);	
		this.submit = this.submit.bind(this);
	}


	submit(values){	
		switch(this.props.type) {
			case 'CREATE': {
				console.log('create')
				console.log('values',values);
				this.props.dispatch(crudStore(values));
				break;
			}
			case 'EDIT': {
				console.log('edit')
				this.props.dispatch(update({...values, id: this.props.match.params.id }));
				break;
			}
		}
  	}

	componentWillMount(){
		this.props.type == "EDIT" && this.props.dispatch(get(this.props.match.params.id));
		
		this.props.dispatch(clearMsg());
		this.props.dispatch(clearStatus());
	}

	render(){
		console.log('props', this.props);
		if(this.props.status == 'submit_success'){
			this.props.dispatch(clearStatus());

			return (
				<Redirect to="/dashboard/categories" />
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
												<h1 className="title">Categories</h1>
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
													    		<h5>{this.props.type == "EDIT" && 'Editing' || this.props.type == "CREATE" && 'Creating'} Category</h5>
													    </div>
													    <div className="card-block">
															<div className="form-group row">
																<div className="col-sm-12">
													        		<Field name="title" component={renderTextField} type="text" label="Category Title" errors={this.props.errors && this.props.errors.title} />
													 			</div>
													 		</div>
													 		<div className="form-group row">
																<div className="col-sm-12">
													        		<Field name="slug" component={renderTextField} type="text" label="Page Slug" errors={this.props.errors && this.props.errors.slug} />
													 			</div>
													 		</div>
													    </div>
													    <div className="card-footer">
												        	<button type="submit" className="btn btn-primary">Save changes</button>
												        	<Link to='/dashboard/categories' className="btn btn-secondary">Close</Link>
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

CategoriesCreateEditPage = connect(store => ({ initialValues: store.categories.form}))(reduxForm({form: 'resources', enableReinitialize: true})(CategoriesCreateEditPage));
export default CategoriesCreateEditPage;