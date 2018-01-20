import React from 'react';
import { BrowserRouter as Router, NavLink, Link } from 'react-router-dom';
import Navbar from '../Navbar'
import Footer from '../Footer'
import SlideNavbarWrapper from '../../containers/Views/Public/Layouts/SlideNavbarWrapper'

export class AboutPage extends React.Component {
	render(){
		return(
			<div className="page about">
				<SlideNavbarWrapper>
					<div className="main__body">
						<div className="container">
							<form className="row form form__contact">
								<div className="col-md-8 m-auto">
									<img src="/img/icon_heart.png" className="heading_icon" />
									<h1 className="heading text-center">Giving You the Tools to Live Your Life</h1>
								</div>
								<div className="col-md-8 mt-2 mx-auto">
									<p>We know that sorting through all of the information necessary to manage your diabetes is difficult. That’s why we gathered together leading endocrinologists, medical experts, and professionals to vet and index the most important online content. <b>Our mission is simple: help you understand and discover the resources you need to manage your diabetes.</b></p><br/>

									<h6><b>Our Process</b></h6>
									<p>Each resource in our directory is identified by experts as a critical component of diabetes management. Then, our team of doctors reviews the resource for relevant, accurate information based on scientific evidence and summarizes it in an easy-to-understand format. Finally, the resource review is placed in our directory, where it can be pulled up quickly and easily when you need the information most.</p><br/>
									<h6><b>Our Company</b></h6>
									<p>A Los Angeles-based startup, Doctorpedia aims to build over 1,000 condition-based websites that provide critical information for patients and their families.</p> 

									<p>Jeremy Wosner, Doctorpedia’s founder, started the company as a response to the lack of easily accessible online information. He had a vision where getting relevant information directly from a doctor was as easy as opening up a browser window. Shortly thereafter, Doctorpedia was born. 
									</p>
								</div>
								<div className="col-12">
								</div>
								<div className="col-lg-4 col-6 m-auto text-center">
									<Link className="button" to="/feedback">Give Your Feedback</Link>
								</div>
							</form>
						</div>
					</div>
				</SlideNavbarWrapper>
				<Footer/>
			</div>
		);
	}
}