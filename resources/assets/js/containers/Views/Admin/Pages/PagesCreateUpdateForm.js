import React from 'react'
import * as config from '../../../../config'

import { connect } from "react-redux"
import crudActions from '../../../../actions/crudActions'
import * as tagsActions from '../../../../actions/tagsActions'
import { clearMsg } from '../../../../actions/msgActions'
import { Form, Field, reduxForm, SubmissionError, formValueSelector } from 'redux-form'
import { Redirect, Link, withRouter } from 'react-router-dom'

import { IndexCreateEditContainer } from '../IndexCreateEditContainer'
import { inputField, selectableField, editorField, tagsField, heroField, checkboxGroup } from '../../../../components/Form'

const tagsFormat = value => {
	if(!value){
		return '';
	} 
	else {
		return value.map((item)=> {
		  return { 'value': item.id, 'label': item.title }; })
	}
}

let resourceCrudActions = new crudActions('PAGES','pages');
let videosCrudActions = new crudActions('VIDEOS','videos');
let articlesCrudActions = new crudActions('ARTICLES','articles');
let tagsCrudActions = new crudActions('TAGS','tags');

@connect((store) => {
	return {
		data: store.pages.data,
		records: store.pages.records,
		status: store.pages.status,
		errors: store.pages.errors,
		tags: store.tags,
		videos: store.videos,
		articles: store.articles,
	}
})
class PagesCreateUpdateForm extends React.Component { 
	constructor(props){
		super(props);	
	} 


	submit = (values) => {
		switch(this.props.type) {
			case 'CREATE': {	
				console.log('create', values);
				values = {
					title: values.title,
					hero: values.hero,
					tags: JSON.stringify(values.tags),
					hero: JSON.stringify(values.hero),
					status: values.status.value,
				};
				
				this.props.dispatch(resourceCrudActions.create(values));
				break;
			}
			case 'UPDATE': {
				values = {
					id: this.props.match.params.id,
					title: values.title,
					hero: values.hero,
					tags: JSON.stringify(values.tags),
					hero: JSON.stringify(values.hero),
					status: values.status.value,
				};
				console.log('edit', values)
				this.props.dispatch(resourceCrudActions.update(values));
			}
		}

  	}

	componentWillMount(){
		this.props.type == "UPDATE" && this.props.dispatch(resourceCrudActions.get(this.props.match.params.id))
		this.props.dispatch(tagsCrudActions.getAll('all'));
		this.props.dispatch(videosCrudActions.getAll('all'));
		this.props.dispatch(articlesCrudActions.getAll('all'));
		this.props.dispatch(clearMsg());
		this.props.dispatch(resourceCrudActions.clearStatus());
	}


	handleSubmit(values)
	{
		console.log('values', values);
	}

	render(){

		if(this.props.status == 'submit_success'){
			this.props.dispatch(resourceCrudActions.clearStatus());

			return (
				<Redirect to={config.ADMIN.DIR+'/pages'} />
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
							  		<Field name="hero" component={heroField} label="Hero"
									type={this.props.data && this.props.data.type.value} 
									typeOptions={[{
										'value':'article',
										'label':'Single Article'
									},{
										'value':'video',
										'label':'Single Video'
									},{
										'value':'playlist',
										'label':'Playlist'
									}]} 
									errors={this.props.errors && this.props.errors.hero} 
									/>
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
					    	<Field name="status" component={selectableField} 
										    options={[{'value':'draft','label':'Draft'},{'value':'published','label':'Published'}]} label="Status" errors={this.props.errors && this.props.errors.status} clearable={false} />

						</div>
						<div className="card-footer">
							<button type="submit" className="btn btn-primary">Save changes</button>
				        	<Link to={`${config.ADMIN.DIR}/pages`} className="btn btn-secondary">Close</Link>
						</div>
					</div>
				</div>
			</Form>
		)
	}
}


export default PagesCreateUpdateForm = connect(store => {
	if(store.pages.data){
		return {
			initialValues: { 
				...store.pages.data, 
				tags: tagsFormat(store.pages.data.tags),
				pages: store.pages.data.pages && JSON.parse(store.pages.data.pages),
			},
		}
	}
	else {
		return {}
	}
})(withRouter(reduxForm({form: 'pageCrud', enableReinitialize: true})(PagesCreateUpdateForm)));