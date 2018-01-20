import React from 'react'
import * as config from '../../../../config'

import { connect } from "react-redux"

import crudActions from '../../../../actions/crudActions'

import * as tagsActions from '../../../../actions/tagsActions'
import { clearMsg } from '../../../../actions/msgActions'
import { Form, Field, reduxForm, SubmissionError } from 'redux-form'
import { Redirect, Link, withRouter } from 'react-router-dom'

import { IndexCreateEditContainer } from '../IndexCreateEditContainer'
import ReviewsCategoriesCreateUpdateForm from './ReviewsCategoriesCreateUpdateForm'
import { inputField, selectableField, editorField, tagsField, checkboxGroup } from '../../../../components/Form'

let resourceCrudActions = new crudActions('REVIEWS_CATEGORIES','reviews_categories');

const tagsFormat = value => {
	if(!value){
		return '';
	} 
	else {
		return value.map((item)=> {
		  return { 'value': item.id, 'label': item.title }; })
	}
}

export class ReviewsCategoriesCreatePage extends React.Component { 
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
				<Redirect to={config.ADMIN.DIR+'/reviews-categories'} />
			)
		}
		
		return (
			<IndexCreateEditContainer type="CREATE" title="Reviews Categories" matchUrl={this.props.match.url}>
				<ReviewsCategoriesCreateUpdateForm type="CREATE" title="Reviews Categories" matchUrl={this.props.match.url} />
			</IndexCreateEditContainer>
		)
	}
}

export default ReviewsCategoriesCreatePage = connect((store) => {
	return {
		data: store.reviews_categories.data,
		status: store.reviews_categories.status,
		errors: store.reviews_categories.errors,
		tags: store.tags
	}
})(ReviewsCategoriesCreatePage);