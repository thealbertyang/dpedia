import React from 'react'
import * as config from '../../../../config'

import { connect } from "react-redux"
import crudActions from '../../../../actions/crudActions'
import { clearMsg } from '../../../../actions/msgActions'
import { Form, Field, reduxForm, SubmissionError } from 'redux-form'
import { Redirect, Link, withRouter } from 'react-router-dom'

import { IndexCreateEditContainer } from '../IndexCreateEditContainer'
import { inputField, selectableBooleanField, textareaField, editorField, tagsField, checkboxGroup } from '../../../../components/Form'

let resourceCrudActions = new crudActions('USERS','users');

@connect((store) => {
	return {
		users: store.users.users,
		status: store.users.status,
		errors: store.users.errors,
	}
})
export class UsersCreateEditPage extends React.Component { 
	constructor(props){
		super(props);	
		this.submit = this.submit.bind(this);
		this.state = { page: 1, role: null };
	} 

	submit(values){	
		switch(this.props.type) {
			case 'CREATE': {
				console.log('create')
				this.props.dispatch(resourceCrudActions.create(values));
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
				this.props.dispatch(resourceCrudActions.update(values));
				break;
			}
		}
  	}

	componentWillMount(){
		console.log('test')
		this.props.type == "EDIT" && this.props.dispatch(resourceCrudActions.get(this.props.match.params.id));
		this.props.dispatch(clearMsg());
		this.props.dispatch(resourceCrudActions.clearStatus());
	}

	nextPage = () => {
    	this.setState({page: this.state.page + 1})
  	}

  	backPage = () => {
    	this.setState({page: this.state.page - 1})
  	}

	render(){
		console.log('PROPSSSSSS', this.state)
		if(this.props.status == 'submit_success'){
			this.props.dispatch(resourceCrudActions.clearStatus());

			return (
				<Redirect to={config.ADMIN.DIR+'/users'} />
			)
		}
			if(this.roleValue){ console.log('ROLE VALUE', this.roleValue, Object.getOwnPropertyDescriptor(this.roleValue, 'value')) }
		
		return (
			<IndexCreateEditContainer type={this.props.type} title="Users" matchUrl={this.props.match.url}>
			    <Form onSubmit={this.props.handleSubmit(this.submit)} className="form">
			    	{this.state.page == 1 && this.state.page !== 'expert' && <div className="row">
				    	<div className="col-12">
					    	<div className="card">
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
										    <Field name="role" hookValue={(value)=>{ console.log('hkv eval'); this.setState({ role: value.value }); }} component={selectableBooleanField} 
												    options={[{'value':'admin','label':'Administrator'},{'value':'member','label':'Member'},{'value':'expert','label':'Expert'}]} label="Role" errors={this.props.errors && this.props.errors.role}/>
										</div>
									</div>
							    </div>
							    <div className="card-footer">
							    	{this.state.role == 'expert' && <button className="btn btn-primary float-right" onClick={()=>this.nextPage()}>Next</button>}
						        	{this.state.role !== 'expert' && <button type="submit" className="btn btn-primary">Save changes</button>}
						        	{this.state.role !== 'expert' && <Link to={`${config.ADMIN.DIR}/users`} className="btn btn-secondary">Close</Link>}
								</div>
							</div>
						</div>
					</div>}
			    	{this.state.role == 'expert' && this.state.page == 2 && <div className="row">
				    	<div className="col-12">
					    	<div className="card">
							    <div className="card-header">
							    	<h5 className="heading">{this.props.type == "EDIT" && 'Editing' || this.props.type == "CREATE" && 'Creating'} User</h5>
							    </div>
							    <div className="card-body">
									<div className="form-group row">
										<div className="col-sm-6">
							        		<Field name="occupation" component={inputField} type="text" label="Occupation" placeholder="Occupation" errors={this.props.errors && this.props.errors.occupation} />
							 			</div>
										<div className="col-sm-6">
							        		<Field name="credentials" component={inputField} type="text" label="Credentials" placeholder="Credentials" errors={this.props.errors && this.props.errors.credentials} />
							 			</div>
							 		</div>
									<div className="form-group row">
										<div className="col-sm-12">
							        		<Field name="about" component={textareaField} type="text" label="About" placeholder="About" errors={this.props.errors && this.props.errors.about} />
							 			</div>
							 		</div>
									<div className="form-group row">
										<div className="col-sm-12">
							        		<Field name="highlights" component={textareaField} type="text" label="Highlights" placeholder="Highlights" errors={this.props.errors && this.props.errors.highlights} />
							 			</div>
							 		</div>
									<div className="form-group row">
										<div className="col-sm-12">
							        		<Field name="affiliations" component={inputField} type="text" label="Affiliations" placeholder="affiliations" errors={this.props.errors && this.props.errors.affiliations} />
							 			</div>
							 		</div>
									<div className="form-group row">
										<div className="col-sm-12">
							        		<Field name="personal_url" component={inputField} type="text" label="Personal URL" placeholder="Personal URL" errors={this.props.errors && this.props.errors.personal_url} />
							 			</div>
							 		</div>
						    	</div>
							    <div className="card-footer">
							    	<button className="btn btn-primary float-right" onClick={()=>this.backPage()}>Back</button>
						        	<button type="submit" className="btn btn-primary">Save changes</button>
						        	<Link to={`${config.ADMIN.DIR}/users`} className="btn btn-secondary">Close</Link>
								</div>
							</div>
						</div>
					</div>}
				</Form>
			</IndexCreateEditContainer>
		)
	}
}

export default UsersCreateEditPage = connect(store => {
	if(store.users.data){
		return {
			initialValues: { 
				...store.users.data, 
			},
		}
	}
	else {
		return {}
	}
})(withRouter(reduxForm({form: 'pageCrud', enableReinitialize: true})(UsersCreateEditPage)));