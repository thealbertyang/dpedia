import React from 'react'
import * as config from '../../../../config'

import { connect } from "react-redux"
import * as reviewsActions from '../../../../actions/reviewsActions'
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

let resourceCrudActions = new crudActions('REVIEWS','reviews');
let reviewsCategoriesCrudActions = new crudActions('REVIEWS_CATEGORIES','reviews_categories');

@connect((store) => {
	return {
		data: store.reviews.data,
		records: store.reviews.records,
		status: store.reviews.status,
		errors: store.reviews.errors,
		tags: store.tags,
		reviews_categories: store.reviews_categories,
	}
})
class ReviewsCreateUpdateForm extends React.Component { 
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
					body: values.body,
					sponsored:  JSON.stringify(values.sponsored),
					tags: JSON.stringify(values.tags),
					pages: JSON.stringify(values.pages),
					status: values.status.value,
					header_img: values.header_img,
					icon_img: values.icon_img,
					url: values.url,
					ios_url: values.ios_url,
					google_url: values.google_url,
					ios_rating: values.ios_rating,
					google_rating: values.google_rating,
					reviews_category_id: JSON.stringify(values.reviews_category_id),
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
					body: values.body,
					sponsored:  JSON.stringify(values.sponsored),
					tags: JSON.stringify(values.tags),
					pages: JSON.stringify(values.pages),
					status: values.status.value,
					header_img: values.header_img,
					icon_img: values.icon_img,
					url: values.url,
					ios_url: values.ios_url,
					google_url: values.google_url,
					ios_rating: values.ios_rating,
					google_rating: values.google_rating,
					reviews_category_id: JSON.stringify(values.reviews_category_id),
				};
				console.log('edit', values)
				this.props.dispatch(resourceCrudActions.update(values));
			}
		}

  	}

	componentWillMount(){
		this.props.type == "UPDATE" && this.props.dispatch(resourceCrudActions.get(this.props.match.params.id))
		this.props.type == "UPDATE" && this.props.dispatch(reviewsCategoriesCrudActions.getAll())
		this.props.dispatch(tagsActions.crudGetAll('all'));
		this.props.dispatch(clearMsg());
		this.props.dispatch(reviewsActions.clearStatus());
	}

	handleSubmit(values)
	{
		console.log('values', values);
	}

	render(){
			console.log('poeppers', this.props);

		if(this.props.status == 'submit_success'){
			this.props.dispatch(reviewsActions.clearStatus());

			return (
				<Redirect to={config.ADMIN.DIR+'/reviews'} />
			)
		}
		
		return (
		    <Form onSubmit={this.props.handleSubmit(this.submit)} className="form row">
			    <div className="col-8">
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
					 		<div className="form-group row">
							  	<div className="col-sm-12">
									<Field name="body" component={editorField} label="Body" errors={this.props.errors && this.props.errors.body} />
							  	</div>
							</div>
							<div className="form-group row">
							  	<div className="col-sm-12">
									<Field name="tags" component={tagsField} label="Tags" options={this.props.tags.records && this.props.tags.records.map((result)=>{ return { 'value': result.id, 'label': result.title } })} errors={this.props.errors && this.props.errors.tags} />
							  	</div>
							</div>
							<div className="form-group row">
							  	<div className="col-sm-12">
							  		<Field name="url" component={inputField} type="text" label="Url" placeholder="Url" errors={this.props.errors && this.props.errors.url} />
							  	</div>
							</div>
							<div className="form-group row">
							  	<div className="col-sm-6">
							  		<Field name="ios_url" component={inputField} type="text" label="iOS Url" placeholder="iOS Url" errors={this.props.errors && this.props.errors.ios_url} />
							  	</div>
							  	<div className="col-sm-6">
							  		<Field name="google_url" component={inputField} type="text" label="Google Url" placeholder="Google Url" errors={this.props.errors && this.props.errors.google_url} />
							  	</div>
							</div>
							<div className="form-group row">
							  	<div className="col-sm-6">
							  		<Field name="ios_rating" component={inputField} type="number" label="iOS rating" placeholder="iOS rating" errors={this.props.errors && this.props.errors.ios_rating} />
							  	</div>
							  	<div className="col-sm-6">
							  		<Field name="google_rating" component={inputField} type="number" label="Google rating" placeholder="Google rating" errors={this.props.errors && this.props.errors.google_rating} />
							  	</div>
							</div>
							<div className="form-group row">
							  	<div className="col-sm-6">
							  		<label>
							  			Icon Upload
							  		</label>
									<Field name="icon_img" component={imageUploadField} label="Icon Image" />
								</div>
							  	<div className="col-sm-6">
							  		<label>
							  			Header Upload
							  		</label>
									<Field name="header_img" id="header_img" component={imageUploadField} label="Header Image" />
								</div>
							</div>
					    </div>
					</div>
				</div>
				<div className="col-4">
					<div className="card">
						<div className="card-header">
					    	<h5 className="heading">Save Changes</h5>

						</div>
					    <div className="card-body">
					    	<Field name="reviews_category_id" component={selectableBooleanField} 
										    options={this.props.reviews_categories.records && this.props.reviews_categories.records.map((item, index)=>{
										    	return {'value': item.id, 'label': item.title};
										    })} label="Category" errors={this.props.errors && this.props.errors.sponsored} clearable={false} />
						
					    	<Field name="status" component={selectableField} 
										    options={[{'value':'draft','label':'Draft'},{'value':'published','label':'Published'}]} label="Status" errors={this.props.errors && this.props.errors.status} clearable={false} />
							<Field name="sponsored" component={selectableBooleanField} 
										    options={[{'value':1,'label':'Yes'},{'value':0,'label':'No'}]} label="Sponsored" errors={this.props.errors && this.props.errors.sponsored} clearable={false} />
						
						</div>
						<div className="card-footer">
							<button type="submit" className="btn btn-primary">Save changes</button>
				        	<Link to={`${config.ADMIN.DIR}/reviews`} className="btn btn-secondary">Close</Link>
						</div>
					</div>
					<div className="card">
						<div className="card-header">
					    	<h5 className="heading">Pages</h5>

						</div>
					    <div className="card-body">
				    	<Field name="pages" component={checkboxGroup} options={
				    		[{
				    			value: 'curious-about', 
				    			label: 'Curious About'
				    		},
				    		{
				    			value: 'living-with', 
				    			label: 'Living With'
				    		},
				    		{
				    			value: 'preventive-care', 
				    			label: 'Preventive Care'
				    		},
				    		{
				    			value: 'alternative-care', 
				    			label: 'Alternative Care'
				    		}]
				    	}/>
						</div>
					</div>
				</div>
			</Form>
		)
	}
}

export default ReviewsCreateUpdateForm = connect(store => {
	if(store.reviews.data){
		return {
			initialValues: { 
				...store.reviews.data, 
				tags: tagsFormat(store.reviews.data.tags),
				pages: store.reviews.data.pages && JSON.parse(store.reviews.data.pages),
			}
		}
	}
	else {
		return {}
	}
})(withRouter(reduxForm({form: 'users', enableReinitialize: true})(ReviewsCreateUpdateForm)));