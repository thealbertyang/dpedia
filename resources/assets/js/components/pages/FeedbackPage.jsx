import React from 'react';
import Footer from '../Footer'
import SlideNavbarWrapper from '../../containers/Views/Public/Layouts/SlideNavbarWrapper'
import { Form, Field, reduxForm, SubmissionError } from 'redux-form'
import { submitForm, clearStatus } from '../../actions/contactFormActions'
import { connect } from "react-redux"
import { renderTextAreaField } from '../FormFields'

@connect((state) => {
	return {
		status: state.contactForm.status,
		errors: state.contactForm.errors,
		msg: {
			status: state.msg.status,
			action: state.msg.action
		}
	}
})
export class FeedbackPage extends React.Component {
	componentWillMount(){
		this.props.dispatch(clearStatus());
	}
	render(){
		return(
			<div className="page feedback">
				<SlideNavbarWrapper>
					<div className="main__body">
						<div className="container">
							<form className="row form form__contact" onSubmit={
																			this.props.handleSubmit((values)=>
																				this.props.dispatch(submitForm({...values}, 'feedback')
																									)
																				)}>
								<div className="col-md-8 m-auto">
									<img src="/img/icon_heart.png" className="heading_icon" />
									<h5 className="heading-sub text-center">Your opinion helps us serve you better</h5>
									<h1 className="heading text-center">What would you like us to know</h1>
								</div>
								<div className={`col-md-7 mt-2 mx-auto ${this.props.status == 'submitting_form' && 'form-loading'} `}>
									{ (this.props.status == 'submit_form_error' && this.props.errors) ? <div className="alert alert-danger" role="alert">{Object.keys(this.props.errors).map((key)=> <li key={key}>{this.props.errors[key]}</li> )}</div>
									:
										(this.props.status == 'submit_form_success' && <div className="alert alert-success" role="alert">Your message has been sent! Thank you!</div> )
									}
									<Field name="feedback" component={renderTextAreaField} placeholder="Enter your message here" errors={this.props.errors && this.props.errors.feedback} />
								</div>
								<div className="col-md-4 offset-md-4 text-center">
									<button className="button" type="submit">Send Feedback</button>
								</div>
							</form>
						</div>
					</div>
					<Footer/>
				</SlideNavbarWrapper>
			</div>
		);
	}
}

FeedbackPage = reduxForm({form: 'feedback', enableReinitialize: true})(FeedbackPage);
export default FeedbackPage;