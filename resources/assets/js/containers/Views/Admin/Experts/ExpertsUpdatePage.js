import React from 'react'
import * as config from '../../../../config'

import { connect } from "react-redux"
import crudActions from '../../../../actions/crudActions'
import * as tagsActions from '../../../../actions/tagsActions'
import { clearMsg } from '../../../../actions/msgActions'
import { Form, Field, reduxForm, SubmissionError } from 'redux-form'
import { Redirect, Link } from 'react-router-dom'

import { IndexCreateEditContainer } from '../IndexCreateEditContainer'
import ExpertsCreateUpdateForm from './ExpertsCreateUpdateForm'
import { inputField, selectableField, editorField, tagsField, checkboxGroup } from '../../../../components/Form'

let resourceCrudActions = new crudActions('EXPERTS','experts');

const tagsFormat = value => {
	if(!value){
		return '';
	} 
	else {
		return value.map((item)=> {
		  return { 'value': item.id, 'label': item.title }; })
	}
}

export class ExpertsUpdatePage extends React.Component { 
	constructor(props){
		super(props);	
		this.submit = this.submit.bind(this);
	} 

	componentWillMount(){
		console.log('test');
	}

	submit(values){	
		values = {
			id: this.props.match.params.id,
			title: values.title,
			slug: values.slug,
			body: values.body,
			tags: JSON.stringify(values.tags),
			pages: JSON.stringify(values.pages),
			status: values.status.value,
		};
		console.log('edit', values)
		this.props.dispatch(resourceCrudActions.update(values));
  	}

	render(){
		if(this.props.status == 'submit_success'){
			this.props.dispatch(resourceCrudActions.clearStatus());

			return (
				<Redirect to={config.ADMIN.DIR+'/pages'} />
			)
		}
		
		return (
			<IndexCreateEditContainer type="UPDATE" title="Experts" matchUrl={this.props.match.url}>
				<ExpertsCreateUpdateForm type="UPDATE" title="Experts" matchUrl={this.props.match.url}/>
			</IndexCreateEditContainer>
		)
	}
}

export default ExpertsUpdatePage = connect((store) => {
	return {
		data: store.pages.data,
		status: store.pages.status,
		errors: store.pages.errors,
		tags: store.tags
	}
})(ExpertsUpdatePage);