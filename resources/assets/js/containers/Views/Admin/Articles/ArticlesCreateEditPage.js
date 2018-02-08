import React from 'react'
import * as config from '../../../../config'

import { connect } from "react-redux"
import * as articlesActions from '../../../../actions/articlesActions'
import * as tagsActions from '../../../../actions/tagsActions'
import { clearMsg } from '../../../../actions/msgActions'
import { Form, Field, reduxForm, SubmissionError } from 'redux-form'
import { Redirect, Link } from 'react-router-dom'

import { IndexCreateEditContainer } from '../IndexCreateEditContainer'
import { imageUploadField, inputField, textareaField, selectableBooleanField, editorField, tagsField, checkboxGroup } from '../../../../components/Form'

const tagsFormat = value => {
	if(!value){
		return '';
	} 
	else {
		return value.map((item)=> {
		  return { 'value': item.id, 'label': item.title }; })
	}
}

@connect((store) => {
	return {
		data: store.articles.data,
		status: store.articles.status,
		errors: store.articles.errors,
		tags: store.tags
	}
})
export class ArticlesCreateEditPage extends React.Component { 
	constructor(props){
		super(props);	
		this.submit = this.submit.bind(this);
	} 

	submit(values){	
		switch(this.props.type) {
			case 'CREATE': {
				values = {
					title: values.title,
					slug: values.slug,
					description: values.description,
					body: values.body,
					tags: JSON.stringify(values.tags),
					pages: JSON.stringify(values.pages),
					status: values.status.value,
					header_img: values.header_img,
				};
				console.log('create')
				this.props.dispatch(articlesActions.crudCreate({...values}));
				break;
			}
			case 'EDIT': {
				values = {
					id: this.props.match.params.id,
					title: values.title,
					slug: values.slug,
					description: values.description,
					body: values.body,
					tags: JSON.stringify(values.tags),
					pages: JSON.stringify(values.pages),
					status: values.status.value,
					header_img: values.header_img,
				};
				console.log('edit', values)
				this.props.dispatch(articlesActions.crudUpdate(values));
				break;
			}
		}
  	}

	componentWillMount(){
		this.props.type == "EDIT" && this.props.dispatch(articlesActions.crudGet(this.props.match.params.id))
		this.props.dispatch(tagsActions.crudGetAll('all'));
		this.props.dispatch(clearMsg());
		this.props.dispatch(articlesActions.clearStatus());
	}

	render(){
		if(this.props.status == 'submit_success'){
			this.props.dispatch(articlesActions.clearStatus());

			return (
				<Redirect to={config.ADMIN.DIR+'/articles'} />
			)
		}
		
		return (
			<IndexCreateEditContainer type={this.props.type} title="Articles" matchUrl={this.props.match.url}>
			    <Form onSubmit={this.props.handleSubmit(this.submit)} className="form row">
			    <div className="col-8">
				    <div className="card"> 
					    <div className="card-header">
					    	<h5 className="heading">{this.props.type == "EDIT" && 'Editing' || this.props.type == "CREATE" && 'Creating'} Articles</h5>
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
					    </div>
					</div>
				</div>
				<div className="col-4">
					<div className="card">
						<div className="card-header">
					    	<h5 className="heading">Save Changes</h5>

						</div>
					    <div className="card-body">
					    	<div className="form-group row">
							  	<div className="col-12">
					    			<Field name="status" component={selectableBooleanField} 
										    options={[{'value':'draft','label':'Draft'},{'value':'published','label':'Published'}]} label="Status" errors={this.props.errors && this.props.errors.status} clearable={false} />
								</div>
							</div>
							<div className="form-group row">
							  	<div className="col-12">
							  		<label>
							  			Header Upload
							  		</label>
									<Field name="header_img" id="header_img" component={imageUploadField} label="Header Image" />
								</div>
							</div>
						</div>
						<div className="card-footer">
							<button type="submit" className="btn btn-primary">Save changes</button>
				        	<Link to={`${config.ADMIN.DIR}/articles`} className="btn btn-secondary">Close</Link>
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
			</IndexCreateEditContainer>
		)
	}
}

export default ArticlesCreateEditPage = connect(store => {
	if(store.articles.data){
		return {
			initialValues: { 
				...store.articles.data, 
				tags: tagsFormat(store.articles.data.tags),
				pages: store.articles.data.pages && JSON.parse(store.articles.data.pages),
			}
		}
	}
	else {
		return {}
	}
})(reduxForm({form: 'users', enableReinitialize: true})(ArticlesCreateEditPage));