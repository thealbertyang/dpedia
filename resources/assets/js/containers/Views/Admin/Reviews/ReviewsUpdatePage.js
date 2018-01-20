import React from 'react'
import * as config from '../../../../config'

import { connect } from "react-redux"
import * as reviewsActions from '../../../../actions/reviewsActions'
import * as tagsActions from '../../../../actions/tagsActions'
import { clearMsg } from '../../../../actions/msgActions'
import { Form, Field, reduxForm, SubmissionError } from 'redux-form'
import { Redirect, Link } from 'react-router-dom'

import { IndexCreateEditContainer } from '../IndexCreateEditContainer'
import ReviewsCreateUpdateForm from './ReviewsCreateUpdateForm'
import { inputField, selectableField, editorField, tagsField, checkboxGroup } from '../../../../components/Form'

const tagsFormat = value => {
	if(!value){
		return '';
	} 
	else {
		return value.map((item)=> {
		  return { 'value': item.id, 'label': item.title }; })
	}
}

export class ReviewsUpdatePage extends React.Component { 
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
		this.props.dispatch(reviewsActions.crudUpdate(values));
		const test = new crudActions.crudActions('reviews','reviews');

		let yum = test.test();

		console.log('test',yum, test);
  	}

	render(){
		console.log('test');
		if(this.props.status == 'submit_success'){
			this.props.dispatch(reviewsActions.clearStatus());

			return (
				<Redirect to={config.ADMIN.DIR+'/reviews'} />
			)
		}
		
		return (
			<IndexCreateEditContainer type="UPDATE" title="Reviews" matchUrl={this.props.match.url}>
				<ReviewsCreateUpdateForm type="UPDATE" title="Reviews" matchUrl={this.props.match.url}/>
			</IndexCreateEditContainer>
		)
	}
}

export default ReviewsUpdatePage = connect((store) => {
	return {
		data: store.reviews.data,
		status: store.reviews.status,
		errors: store.reviews.errors,
		tags: store.tags
	}
})(ReviewsUpdatePage);