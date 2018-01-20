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
export class DoctorsPage extends React.Component {
	componentWillMount(){
		this.props.dispatch(clearStatus());
	}
	render(){
		return(
			<div className="page doctors-start-here">
				<SlideNavbarWrapper>
					<div className="main__body">
						<div className="container">
							<div className="row">
								<div className="col-md-12">
									<img src="/img/icon_heart.png" className="heading_icon" />
									<h5 className="heading-sub text-center">We're building the largest network of doctor reviewers, content makers and more.</h5>
									<h1 className="heading text-center">Find out about partnership opportunities with us</h1>

									<form className='form form__contact mt-2' onSubmit={
																				this.props.handleSubmit((values)=>
																				this.props.dispatch(submitForm({...values}, 'doctors')
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
										   		<Field name="role" component={renderTextField} placeholder="Head Nurse, Office Manager, Doctor" label="Role" errors={this.props.errors && this.props.errors.role} />
												<Field name="email" component={renderTextField} placeholder="youremail@youremail.com" label="Contact Email (no spam)" errors={this.props.errors && this.props.errors.email} />
										    </div>
										    <div className="col-md-4">
										   		<Field name="practice_name" component={renderTextField} placeholder="Dr. John's Family Clinic" label="Medicial Practice Name" errors={this.props.errors && this.props.errors.practice_name} />
												<Field name="found_us" component={renderTextField} placeholder="Google Search, Colleague, etc" label="How Did You Find Us?" errors={this.props.errors && this.props.errors.found_us} />
										    </div>
										</div>
										<div className="row">
											<div className="col-md-4 m-auto">
												<button className="button" type="submit">Send Me More Info</button>
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

DoctorsPage = reduxForm({form: 'doctors', enableReinitialize: true})(DoctorsPage);
export default DoctorsPage;