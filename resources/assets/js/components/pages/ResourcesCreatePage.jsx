import React from 'react';
import Footer from '../Footer'
import SlideNavbarWrapper from '../../containers/Views/Public/Layouts/SlideNavbarWrapper'
import { Form, Field, reduxForm, SubmissionError } from 'redux-form'
import { submitForm, clearStatus } from '../../actions/contactFormActions'
import { connect } from "react-redux"
import { renderTextField } from '../FormFields'

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
export class ResourcesCreatePage extends React.Component {
	componentWillMount(){
		this.props.dispatch(clearStatus());
	}
	render(){
		return(
			<div className="page about">
				<SlideNavbarWrapper>
				<div className="main__body">
					<div className="container">
						<div className="row">
							<div className="col-md-12">
								<img src="/img/icon_heart.png" className="heading_icon" />
								<h5 className="heading-sub text-center">Help build the largest resource library for people with diabetes.</h5>
								<h1 className="heading text-center">Apply for a listing in our private beta.</h1>
									<form className="form form__contact mt-2" onSubmit={
																				this.props.handleSubmit((values)=>
																				this.props.dispatch(submitForm({...values}, 'resources')
																									)
																				)}>
										<div className={`row ${this.props.status == 'submitting_form' ? 'form-loading' : ''} `}>
										<div className="col-md-12">
											{ (this.props.status == 'submit_form_error' && this.props.errors) ? <div className="alert alert-danger" role="alert">{Object.keys(this.props.errors).map((key)=> <li key={key}>{this.props.errors[key]}</li> )}</div>
									:
										(this.props.status == 'submit_form_success' && <div className="alert alert-success" role="alert">Your message has been sent! Thank you!</div> )
									}
											</div>
											<div className="col-md-4">
												<Field name="full_name" component={renderTextField} placeholder="John Smith" label="Your Name" errors={this.props.errors && this.props.errors.full_name} />
												<Field name="phone" component={renderTextField} placeholder="(213) 555-5555" label="Contact Phone No. (no spam)" errors={this.props.errors && this.props.errors.phone} />
										    </div>
										   	<div className="col-md-4">
										   		<Field name="resource_type" component={renderTextField} placeholder="A medical practice, an Iphone app, website etc.." label="Resource Type" errors={this.props.errors && this.props.errors.resource_type} />
												<Field name="email" component={renderTextField} placeholder="youremail@youremail.com" label="Contact Email (no spam)" errors={this.props.errors && this.props.errors.email} />
										    </div>
										    <div className="col-md-4">
										   		<Field name="resource_url" component={renderTextField} placeholder="www.example.com" label="Resource URL (optional)" errors={this.props.errors && this.props.errors.resource_url} />
												<Field name="found_us" component={renderTextField} placeholder="Google Search, Colleague, etc" label="How Did You Find Us?" errors={this.props.errors && this.props.errors.found_us} />
										    </div>
										</div>


									<div className="row">
										<div className="col-md-4 m-auto">
											<button className="button" type="submit">Send Me Next Steps</button>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
				<Footer/>
			</SlideNavbarWrapper>
			</div>
		);
	}
}

ResourcesCreatePage = reduxForm({form: 'resources', enableReinitialize: true})(ResourcesCreatePage);
export default ResourcesCreatePage;