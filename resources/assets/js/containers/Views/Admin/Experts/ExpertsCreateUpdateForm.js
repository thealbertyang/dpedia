import React from 'react'
import * as config from '../../../../config'

import { connect } from "react-redux"
import crudActions from '../../../../actions/crudActions'
import * as tagsActions from '../../../../actions/tagsActions'
import { clearMsg } from '../../../../actions/msgActions'
import { Form, Field, reduxForm, SubmissionError, formValueSelector } from 'redux-form'
import { Redirect, Link, withRouter } from 'react-router-dom'

import { IndexCreateEditContainer } from '../IndexCreateEditContainer'
import { textareaField, inputField, selectableField, editorField, tagsField, heroField, checkboxGroup } from '../../../../components/Form'

const tagsFormat = value => {
	if(!value){
		return '';
	} 
	else {
		return value.map((item)=> {
		  return { 'value': item.id, 'label': item.title }; })
	}
}

let resourceCrudActions = new crudActions('EXPERTS','experts');

@connect((store) => {
	return {
		data: store.experts.data,
		records: store.experts.records,
		status: store.experts.status,
		errors: store.experts.errors,
	}
})
class ExpertsCreateUpdateForm extends React.Component { 
	constructor(props){
		super(props);	
		this.state = { page: 1 };
	} 

	submit = (values) => {
		switch(this.props.type) {
			case 'CREATE': {	
				console.log('create', values);
				values = {
					occupation: values.occupation,
					credentials: values.credentials,
					about: values.about,
					highlights: values.highlights,
					affiliations: values.affiliations,
					personal_url: values.personal_url,
					first_name: values.first_name,
					last_name: values.last_name,
					email: values.email,
					password: values.password,
				};
				
				this.props.dispatch(resourceCrudActions.create(values));
				break;
			}
			case 'UPDATE': {
				values = {
					id: this.props.match.params.id,
					occupation: values.occupation,
					credentials: values.credentials,
					about: values.about,
					highlights: values.highlights,
					affiliations: values.affiliations,
					personal_url: values.personal_url,
					first_name: values.first_name,
					last_name: values.last_name,
					email: values.email,
					password: values.password,
				};
				console.log('edit', values)
				this.props.dispatch(resourceCrudActions.update(values));
			}
		}

  	}

	componentWillMount(){
		this.props.type == "UPDATE" && this.props.dispatch(resourceCrudActions.get(this.props.match.params.id))
		this.props.dispatch(clearMsg());
		this.props.dispatch(resourceCrudActions.clearStatus());
	}


	handleSubmit(values)
	{
		console.log('values', values);
	}

	nextPage = () => {
    	this.setState({page: this.state.page + 1})
  	}

  	backPage = () => {
    	this.setState({page: this.state.page - 1})
  	}

	render(){
		console.log(this.props);
		if(this.props.status == 'submit_success'){
			this.props.dispatch(resourceCrudActions.clearStatus());

			return (
				<Redirect to={config.ADMIN.DIR+'/pages'} />
			)
		}

		return (
		    <Form onSubmit={this.props.handleSubmit(this.submit)} className="form">
			    {this.state.page == 1 && <div className="row">
				    <div className="col-8">
					    <div className="card">
						    <div className="card-header">
						    	<h5 className="heading">{this.props.type == "UPDATE" && 'Editing' || this.props.type == "CREATE" && 'Creating'} {this.props.title}</h5>
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
										<Field name="highlights" component={editorField} label="Highlights" errors={this.props.errors && this.props.errors.highlights} />
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
								<button className="btn btn-primary float-right" onClick={()=>this.nextPage()}>Next</button>
							</div>
						</div>
					</div>
					{/*this.props.data &&
					<div className="col-4">
						<div className="card">
							<div className="card-header">
						    	<h5 className="heading">User Account</h5>
							</div>
						    <div className="card-body">
						    	<div className="row">
						    		<div className="col-12 d-flex flex-column align-items-center">
							    		<div className="avatar" style={{ background: 'url(/'+this.props.data.user.avatar_img+') center center / cover' }}>
							    		</div>
							    		<h5 className="heading">{this.props.data.user.first_name+' '+this.props.data.user.last_name}</h5>
							    		<p>{this.props.data.user.email}</p>
										<Link to={`${config.ADMIN.DIR}/users/${this.props.data.user.id}/edit`} className="btn btn-secondary">Edit</Link>
						    		</div>
						    	</div>
						    	
							</div>
						</div>
					</div>*/}
				</div>}
			    {this.state.page == 2 && <div className="row">
			    	<div className="col-8">
					    <div className="card">
						    <div className="card-header">
						    	<h5 className="heading">{this.props.type == "UPDATE" && 'Editing' || this.props.type == "CREATE" && 'Creating'} {this.props.title}</h5>
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
						    </div>
						    <div className="card-footer">
								<button className="btn btn-primary float-right" onClick={()=>this.backPage()}>Back</button>
								<button type="submit" className="btn btn-primary">Save changes</button>
					        	<Link to={`${config.ADMIN.DIR}/experts`} className="btn btn-secondary">Close</Link>
							</div>
						</div>
					</div>
				</div>}
				
			</Form>
		)
	}
}


export default ExpertsCreateUpdateForm = connect(store => {
	if(store.experts.data){
		return {
			initialValues: { 
				...store.experts.data, 
				tags: tagsFormat(store.experts.data.tags),
			},
		}
	}
	else {
		return {}
	}
})(withRouter(reduxForm({form: 'pageCrud', enableReinitialize: true})(ExpertsCreateUpdateForm)));