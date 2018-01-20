import React from 'react'
import * as config from '../../../../config'

import { connect } from "react-redux"
import crudActions from '../../../../actions/crudActions'
import * as tagsActions from '../../../../actions/tagsActions'
import { clearMsg } from '../../../../actions/msgActions'
import { Form, Field, reduxForm, SubmissionError } from 'redux-form'
import { Redirect, Link, withRouter } from 'react-router-dom'

import { IndexCreateEditContainer } from '../IndexCreateEditContainer'
import { imageUploadField, inputField, selectableBooleanField, selectableField, editorField, tagsField, checkboxGroup, textareaField } from '../../../../components/Form'

const tagsFormat = value => {
	if(!value){
		return '';
	} 
	else {
		return value.map((item)=> {
		  return { 'value': item.id, 'label': item.title }; })
	}
}

let resourceCrudActions = new crudActions('REVIEWS_CATEGORIES','reviews_categories');

@connect((store) => {
	return {
		data: store.reviews_categories.data,
		records: store.reviews_categories.records,
		status: store.reviews_categories.status,
		errors: store.reviews_categories.errors,
		tags: store.tags
	}
})
class ReviewsCategoriesCreateUpdateForm extends React.Component { 
	constructor(props){
		super(props);	
	} 


	submit = (values) => {
		switch(this.props.type) {
			case 'CREATE': {	
				console.log('create', values);
				values = {
					title: values.title,
					slug: values.slug,
					description: values.description,
				};
				
				this.props.dispatch(resourceCrudActions.create(values));
				break;
			}
			case 'UPDATE': {
				values = {
					id: this.props.match.params.id,
					title: values.title,
					slug: values.slug,
					description: values.description,
				};
				console.log('edit', values)
				this.props.dispatch(resourceCrudActions.update(values));
			}
		}

  	}

	componentWillMount(){
		this.props.type == "UPDATE" && this.props.dispatch(resourceCrudActions.get(this.props.match.params.id))
		this.props.dispatch(tagsActions.crudGetAll('all'));
		this.props.dispatch(clearMsg());
		this.props.dispatch(resourceCrudActions.clearStatus());
	}

	handleSubmit(values)
	{
		console.log('values', values);
	}

	render(){
			console.log('poeppers', this.props);

		if(this.props.status == 'submit_success'){
			this.props.dispatch(resourceCrudActions.clearStatus());

			return (
				<Redirect to={config.ADMIN.DIR+'/reviews-categories'} />
			)
		}
		
		return (
		    <Form onSubmit={this.props.handleSubmit(this.submit)} className="form row">
			    <div className="col-12">
				    <div className="card">
					    <div className="card-header">
					    	<h5 className="heading">{this.props.type == "UPDATE" && 'Editing' || this.props.type == "CREATE" && 'Creating'} {this.props.title}</h5>
					    </div>
					    <div className="card-body">
							<div className="form-group row">
								<div className="col-sm-12">
					        		<Field name="title" component={inputField} type="text" label="Title" placeholder="Title" errors={this.props.errors && this.props.errors.title} />
					 			</div>
					 		</div>
					 		<div className="form-group row">
							  	<div className="col-sm-12">
							  		<Field name="slug" component={inputField} type="text" label="Slug" placeholder="Slug" errors={this.props.errors && this.props.errors.slug} />
							  	</div>
							</div>
							<div className="form-group row">
							  	<div className="col-sm-12">
									<Field name="description" component={textareaField} label="Description" errors={this.props.errors && this.props.errors.description} />
							  	</div>
							</div>
					    </div>
					    <div className="card-footer">
							<button type="submit" className="btn btn-primary">Save changes</button>
				        	<Link to={`${config.ADMIN.DIR}/reviews-categories`} className="btn btn-secondary">Close</Link>
						</div>
					</div>
				</div>
			</Form>
		)
	}
}

export default ReviewsCategoriesCreateUpdateForm = connect(store => {
	if(store.reviews_categories.data){
		return {
			initialValues: { 
				...store.reviews_categories.data, 
				tags: tagsFormat(store.reviews_categories.data.tags),
				pages: store.reviews_categories.data.pages && JSON.parse(store.reviews_categories.data.pages),
			}
		}
	}
	else {
		return {}
	}
})(withRouter(reduxForm({form: 'users', enableReinitialize: true})(ReviewsCategoriesCreateUpdateForm)));