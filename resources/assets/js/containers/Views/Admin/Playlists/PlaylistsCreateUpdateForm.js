import React from 'react'
import * as config from '../../../../config'

import { connect } from "react-redux"
import crudActions from '../../../../actions/crudActions'
import * as tagsActions from '../../../../actions/tagsActions'
import { clearMsg } from '../../../../actions/msgActions'
import { Form, Field, reduxForm, SubmissionError, formValueSelector } from 'redux-form'
import { Redirect, Link, withRouter } from 'react-router-dom'

import { IndexCreateEditContainer } from '../IndexCreateEditContainer'
import { inputField, selectableField, editorField, tagsField, checkboxGroup, playlistField } from '../../../../components/Form'

const tagsFormat = value => {
	if(!value){
		return '';
	} 
	else {
		return value.map((item)=> {
		  return { 'value': item.id, 'label': item.title }; })
	}
}

let resourceCrudActions = new crudActions('PLAYLISTS','playlists');

let tagsCrudActions = new crudActions('TAGS','tags');

@connect((store) => {
	return {
		data: store.playlists.data,
		records: store.playlists.records,
		status: store.playlists.status,
		errors: store.playlists.errors,
		tags: store.tags,
		videos: store.videos,
		articles: store.articles,
	}
})
class PlaylistsCreateUpdateForm extends React.Component { 
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
					body: values.body,
					tags: JSON.stringify(values.tags),
					pages: JSON.stringify(values.pages),
					type: values.playlist.type,
					playlist: JSON.stringify(values.playlist.data),
					status: values.status.value,
				};
				
				this.props.dispatch(resourceCrudActions.create(values));
				break;
			}
			case 'UPDATE': {
				values = {
					id: this.props.match.params.id,
					title: values.title,
					slug: values.slug,
					body: values.body,
					type: values.playlist.type,
					tags: JSON.stringify(values.tags),
					pages: JSON.stringify(values.pages),
					playlist: JSON.stringify(values.playlist.data),
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
				<Redirect to={config.ADMIN.DIR+'/playlists'} />
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
									<Field name="playlist" component={playlistField} 
									type={this.props.data && this.props.data.type} 
									typeOptions={[{'value':'articles','label':'Articles'},{'value':'videos','label':'Videos'}]} 
									label="Playlist" 
									errors={this.props.errors && this.props.errors.playlists} 
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
				        	<Link to={`${config.ADMIN.DIR}/playlists`} className="btn btn-secondary">Close</Link>
						</div>
					</div>

				</div>
			</Form>
		)
	}
}

const selector = formValueSelector('playlistCrud')

export default PlaylistsCreateUpdateForm = connect(store => {
	if(store.playlists.data){
		return {
			initialValues: { 
				...store.playlists.data, 
				tags: tagsFormat(store.playlists.data.tags),
				pages: store.playlists.data.pages && JSON.parse(store.playlists.data.pages),
				playlist: tagsFormat(store.playlists.data.resources),
			},
			playlistType: selector(store, 'type')
		}
	}
	else {
		return {}
	}
})(withRouter(reduxForm({form: 'playlistCrud', enableReinitialize: true})(PlaylistsCreateUpdateForm)));