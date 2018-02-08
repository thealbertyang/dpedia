import React from 'react'
import * as config from '../../../../config'

import { connect } from "react-redux"
import * as videosActions from '../../../../actions/videosActions'
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
		data: store.videos.data,
		status: store.videos.status,
		errors: store.videos.errors,
		tags: store.tags,
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
				console.log('create', values)
				values = {
					title: values.title,
					slug: values.slug,
					video_url: values.video_url,
					description: values.description,
					status: values.status.value,
					pages: JSON.stringify(values.pages),
					tags: JSON.stringify(values.tags),
					header_img: values.header_img,
				};
				this.props.dispatch(videosActions.crudCreate({...values}));
				break;
			}
			case 'EDIT': {
				console.log('edit', values)
				values = {
					id: this.props.match.params.id,
					title: values.title,
					slug: values.slug,
					video_url: values.video_url,
					description: values.description,
					status: values.status.value,
					pages: JSON.stringify(values.pages),
					tags: JSON.stringify(values.tags),
					header_img: values.header_img,
				};
				this.props.dispatch(videosActions.crudUpdate(values));
				break;
			}
		}
  	}

	componentWillMount(){
		console.log('test')
		this.props.type == "EDIT" && this.props.dispatch(videosActions.crudGet(this.props.match.params.id));
		this.props.dispatch(tagsActions.crudGetAll('all'));
		this.props.dispatch(clearMsg());
		this.props.dispatch(videosActions.clearStatus());
	}

	render(){
		if(this.props.status == 'submit_success'){
			this.props.dispatch(videosActions.clearStatus());

			return (
				<Redirect to="/admin/videos" />
			)
		}
		
		return (
			<IndexCreateEditContainer type={this.props.type} title="Videos" matchUrl={this.props.match.url}>
			    <Form onSubmit={this.props.handleSubmit(this.submit)} className="form row">
			    <div className="col-8">
				    <div className="card">
					    <div className="card-header">
					    	<h5 className="heading">{this.props.type == "EDIT" && 'Editing' || this.props.type == "CREATE" && 'Creating'} Video</h5>
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
								  		<Field name="video_url" component={inputField} type="text" label="Video Url" placeholder="Video Url" errors={this.props.errors && this.props.errors.slug} />
								  	</div>
								</div>
						 		<div className="form-group row">
								  	<div className="col-sm-12">
										<Field name="description" component={textareaField} label="Description" errors={this.props.errors && this.props.errors.description} />
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
				        	<Link to={`${config.ADMIN.DIR}/videos`} className="btn btn-secondary">Close</Link>
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

export default VideosCreateEditPage = connect(store => {
	if(store.videos.data){
		return {
			initialValues: { 
				...store.videos.data, 
				tags: tagsFormat(store.videos.data.tags),
				pages: store.videos.data.pages && JSON.parse(store.videos.data.pages),
			}
		}
	}
	else {
		return {}
	}
})(reduxForm({form: 'users', enableReinitialize: true})(VideosCreateEditPage));