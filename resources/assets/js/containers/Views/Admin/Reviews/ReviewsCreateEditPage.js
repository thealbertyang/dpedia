import React from 'react'
import * as config from '../../../../config'

import { connect } from "react-redux"
import * as reviewsActions from '../../../../actions/reviewsActions'
import * as tagsActions from '../../../../actions/tagsActions'
import { clearMsg } from '../../../../actions/msgActions'
import { Form, Field, reduxForm, SubmissionError } from 'redux-form'
import { Redirect, Link } from 'react-router-dom'

import { IndexCreateEditContainer } from '../IndexCreateEditContainer'
import { ReviewsCreateUpdateForm } from './ReviewsCreateUpdateForm'
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

@connect((store) => {
	return {
		data: store.reviews.data,
		status: store.reviews.status,
		errors: store.reviews.errors,
		tags: store.tags
	}
})
export class ReviewsCreateEditPage extends React.Component { 
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
					body: values.body,
					tags: JSON.stringify(values.tags),
					pages: JSON.stringify(values.pages),
					status: values.status.value,
				};
				console.log('create')
				this.props.dispatch(reviewsActions.crudCreate({...values}));
				break;
			}
			case 'EDIT': {
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
				break;
			}
		}
  	}

	componentWillMount(){
		this.props.type == "EDIT" && this.props.dispatch(reviewsActions.crudGet(this.props.match.params.id))
		this.props.dispatch(tagsActions.crudGetAll('all'));
		this.props.dispatch(clearMsg());
		this.props.dispatch(reviewsActions.clearStatus());
	}

	render(){
		if(this.props.status == 'submit_success'){
			this.props.dispatch(reviewsActions.clearStatus());

			return (
				<Redirect to={config.ADMIN.DIR+'/reviews'} />
			)
		}
		
		return (
			<IndexCreateEditContainer type={this.props.type} title="Reviews" matchUrl={this.props.match.url}>
			    <ReviewsCreateUpdateForm type="CREATE" />
			</IndexCreateEditContainer>
		)
	}
}

export default ReviewsCreateEditPage = connect(store => {
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
})(reduxForm({form: 'users', enableReinitialize: true})(ReviewsCreateEditPage));