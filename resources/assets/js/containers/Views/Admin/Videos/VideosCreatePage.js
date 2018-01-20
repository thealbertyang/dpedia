import React from 'react'
import * as config from '../../../../config'

import { connect } from "react-redux"
import * as usersActions from '../../../../actions/usersActions'
import { clearMsg } from '../../../../actions/msgActions'
import { Form, Field, reduxForm, SubmissionError } from 'redux-form'
import { Redirect, Link } from 'react-router-dom'

import { IndexCreateEditContainer } from '../IndexCreateEditContainer'
import { inputField, selectableField, editorField, tagsField, checkboxGroup } from '../../../../components/Form'

@connect((store) => {
	return {
		users: store.users.users,
		status: store.users.status,
		errors: store.users.errors,
	}
})
export class VideosCreateEditPage extends React.Component { 
	constructor(props){
		super(props);	
		this.submit = this.submit.bind(this);
	} 

	submit(values){	
		switch(this.props.type) {
			case 'CREATE': {
				console.log('create')
				this.props.dispatch(usersActions.crudCreate({...values}));
				break;
			}
			case 'EDIT': {
				console.log('edit', values)
				values = {
					id: this.props.match.params.id,
					first_name: values.first_name,
					last_name: values.last_name,
					email: values.email,
					password: values.password,
					role: JSON.stringify(values.role),
				};
				this.props.dispatch(usersActions.crudUpdate(values));
				break;
			}
		}
  	}

	componentWillMount(){
		console.log('test')
		this.props.type == "EDIT" && this.props.dispatch(usersActions.crudGet(this.props.match.params.id));
		this.props.dispatch(clearMsg());
		this.props.dispatch(usersActions.clearStatus());
	}

	render(){
		if(this.props.status == 'submit_success'){
			this.props.dispatch(usersActions.clearStatus());

			return (
				<Redirect to="/dashboard/users" />
			)
		}
		
		return (
			<IndexCreateEditContainer type={this.props.type} title="Users" matchUrl={this.props.match.url}>
			    <Form onSubmit={this.props.handleSubmit(this.submit)} className="form card">
				    <div className="card-header">
				    	<h5 className="heading">{this.props.type == "EDIT" && 'Editing' || this.props.type == "CREATE" && 'Creating'} User</h5>
				    </div>
				    <div className="card-body">
						<div className="form-group row">
							<div className="col-sm-6">
				        		<Field name="first_name" component={inputField} type="text" label="First Name" errors={this.props.errors && this.props.errors.first_name} />
				 			</div>
				 			<div className="col-sm-6">
				        		<Field name="last_name" component={inputField} type="text" label="Last Name" errors={this.props.errors && this.props.errors.last_name} />
				 			</div>
				 		</div>
				 		<div className="form-group row">
						  	<div className="col-sm-12">
						  		<Field name="email" component={inputField} type="email" label="Email" errors={this.props.errors && this.props.errors.email} />
						  	</div>
						</div>
						<div className="form-group row">
						  	<div className="col-sm-12">
						  		<Field name="password" component={inputField} type="password" label="Password" errors={this.props.errors && this.props.errors.password} />
						  	</div>
						</div>
						<div className="form-group row">
							<div className="col-sm-12">
							    <Field name="role" component={selectableField} 
									    options={[{'value':'administrator','label':'Administrator'},{'value':'member','label':'Member'},{'value':'expert','label':'Expert'}]} label="Role" />
							</div>
						</div>
				    </div>
				    <div className="card-footer">
			        	<button type="submit" className="btn btn-primary">Save changes</button>
			        	<Link to={`${config.ADMIN.DIR}/users`} className="btn btn-secondary">Close</Link>
					</div>
				</Form>
			</IndexCreateEditContainer>
		)
	}
}

VideosCreateEditPage = connect(store => ({ initialValues: store.users.data}))(reduxForm({form: 'users', enableReinitialize: true})(VideosCreateEditPage));
export default VideosCreateEditPage;