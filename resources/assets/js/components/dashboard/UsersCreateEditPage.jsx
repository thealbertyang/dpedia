import React from 'react'
import Sidebar from '../../components/Sidebar'
import { connect } from "react-redux"
import store from "../../store"
import { getUser, submitForm, updateUser, clearStatus } from '../../actions/usersActions'
import { clearMsg } from '../../actions/msgActions'
import { Form, Field, reduxForm, SubmissionError } from 'redux-form'
import { Redirect, Link } from 'react-router-dom'
import { Messages } from '../../components/Messages'
import Select from 'react-select';

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

const renderField = ({ input, label, type, meta: { touched, error }, errors }) =>
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

@connect((state) => {
	return {
		users: state.users.users,
		status: state.users.status,
		errors: state.users.errors,
		msg: {
			status: state.msg.status,
			action: state.msg.action
		}
	}
})
export class UsersCreateEditPage extends React.Component { 
	constructor(props){
		super(props);	
		this.submit = this.submit.bind(this);
	} 

	submit(values){	
		switch(this.props.type) {
			case 'CREATE': {
				console.log('create')
				this.props.dispatch(submitForm({...values}));
				break;
			}
			case 'EDIT': {
				console.log('edit')
				this.props.dispatch(updateUser({...values, id: this.props.match.params.id}));
				break;
			}
		}
  	}

	componentWillMount(){
		console.log('test')
		this.props.type == "EDIT" && this.props.dispatch(getUser(this.props.match.params.id));
		this.props.dispatch(clearMsg());
		this.props.dispatch(clearStatus());
	}

	render(){
		if(this.props.status == 'submit_success'){
			this.props.dispatch(clearStatus());

			return (
				<Redirect to="/dashboard/users" />
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
											<div className="col-6 header__title"><h1 className="title">Users</h1></div>
										</div>
									</div>
								</div>
								{(this.props.msg.status == 'success' || this.props.msg.status == 'error') && (this.props.msg.action == 'update') &&
								<Messages type={this.props.type} />
								}
								<div className="page-body p-5">
									<div className="container">
										<div className="row">
										    <Form onSubmit={this.props.handleSubmit(this.submit)} className="form card col-md-12">
											    <div className="card-header">
											    	<h5>{this.props.type == "EDIT" && 'Editing' || this.props.type == "CREATE" && 'Creating'} User</h5>
											    </div>
											    <div className="card-block">
													<div className="form-group row">
														<div className="col-sm-6">
											        		<Field name="first_name" component={renderField} type="text" label="First Name" errors={this.props.errors && this.props.errors.first_name} />
											 			</div>
											 			<div className="col-sm-6">
											        		<Field name="last_name" component={renderField} type="text" label="Last Name" errors={this.props.errors && this.props.errors.last_name} />
											 			</div>
											 		</div>
											 		<div className="form-group row">
													  	<div className="col-sm-12">
													  		<Field name="email" component={renderField} type="email" label="Email" errors={this.props.errors && this.props.errors.email} />
													  	</div>
													</div>
													<div className="form-group row">
													  	<div className="col-sm-12">
													  		<Field name="password" component={renderField} type="password" label="Password" errors={this.props.errors && this.props.errors.password} />
													  	</div>
													</div>
													<div className="form-group row">
														<div className="col-sm-12">
														    <Field name="role" component={renderSelectableField} 
																    options={[{'value':'administrator','label':'Administrator'},{'value':'member','label':'Member'}]} label="Role" />
														</div>
													</div>
											    </div>
											    <div className="card-footer">
										        	<button type="submit" className="btn btn-primary">Save changes</button>
										        	<Link to='/dashboard/users' className="btn btn-secondary">Close</Link>
												</div>
											</Form>
										</div>
									</div>
								</div>
				        </main>
			        </div>
			</div>
		)
	}
}

UsersCreateEditPage = connect(store => ({ initialValues: store.users.form}))(reduxForm({form: 'users', enableReinitialize: true})(UsersCreateEditPage));
export default UsersCreateEditPage;