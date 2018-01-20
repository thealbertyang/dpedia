import React from 'react'
import * as config from '../../../../config'
 
import { connect } from "react-redux"
import crudActions from '../../../../actions/crudActions'
import * as tagsActions from '../../../../actions/tagsActions'
import { clearMsg } from '../../../../actions/msgActions'
import { Form, Field, reduxForm, SubmissionError } from 'redux-form'
import { Redirect, Link, withRouter } from 'react-router-dom'

import { IndexCreateEditContainer } from '../IndexCreateEditContainer'
import PlaylistsCreateUpdateForm from './PlaylistsCreateUpdateForm'
import { inputField, selectableField, editorField, tagsField, checkboxGroup } from '../../../../components/Form'

let resourceCrudActions = new crudActions('REVIEWS','reviews');

const tagsFormat = value => {
	if(!value){
		return '';
	} 
	else {
		return value.map((item)=> {
		  return { 'value': item.id, 'label': item.title }; })
	}
}

export class PlaylistsCreatePage extends React.Component { 
	constructor(props){
		super(props);	
	} 

	submit = (values) => {	
		console.log('create', values);
		values = {
			title: values.title,
			slug: values.slug,
			body: values.body,
			tags: JSON.stringify(values.tags),
			pages: JSON.stringify(values.pages),
			status: values.status.value,
		};
		
		this.props.dispatch(resourceCrudActions.create(values));
  	}

	render(){
		if(this.props.status == 'submit_success'){
			this.props.dispatch(resourceCrudActions.clearStatus());

			return (
				<Redirect to={config.ADMIN.DIR+'/playlists'} />
			)
		}
		
		return (
			<IndexCreateEditContainer type="CREATE" title="Playlists" matchUrl={this.props.match.url}>
				<PlaylistsCreateUpdateForm type="CREATE" title="Playlists" matchUrl={this.props.match.url} />
			</IndexCreateEditContainer>
		)
	}
}

export default PlaylistsCreatePage = connect((store) => {
	return {
		data: store.playlists.data,
		status: store.playlists.status,
		errors: store.playlists.errors,
		tags: store.tags
	}
})(PlaylistsCreatePage);