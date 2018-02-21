import React from 'react';
import { connect } from "react-redux"
import store from "../../../../../store"
import Footer from '../../../../../components/Footer'
import { ReviewsRelated } from './ReviewsRelated'
import SlideNavbarWrapper from '../../Layouts/SlideNavbarWrapper'
import * as htmlToText from 'html-to-text'
import crudActions from '../../../../../actions/crudActions'

let resourceCrudActions = new crudActions('REVIEWS','reviews');
let reviewsCategoriesCrudActions = new crudActions('REVIEWS_CATEGORIES','reviews_categories');

@connect((store) => {
	return {
		reviews: store.reviews,
		reviews_categories: store.reviews_categories,
	}
})
export class ReviewsSinglePage extends React.Component {
	constructor(props){
		super(props);
		this.state = { scrollTop: 0 };
	}

	componentDidMount(){
		window.addEventListener('scroll', this.handleScroll);
	}

	componentWillUnmount(){
		window.removeEventListener('scroll', this.handleScroll);
	}

	handleScroll = (event) => {
		let scrollTop = event.srcElement.documentElement.scrollTop || window.pageYoffset || event.srcElement.body.scrollTop;
        this.setState({ scrollTop: scrollTop });
	}

	componentWillMount(){
		this.props.match.params.slug && this.props.dispatch(resourceCrudActions.get(this.props.match.params.slug));
		this.props.dispatch(reviewsCategoriesCrudActions.getAll());
		this.props.dispatch(resourceCrudActions.getAll());
		this.props.dispatch(resourceCrudActions.getRelated(this.props.match.params.slug));
	}

	render(){
		console.log('SINGLE PAGE PROPS', this.props);
		let backgroundStyle;

		if(this.props.reviews.data){
			var text = htmlToText.fromString(this.props.reviews.data.body, {
		    	wordwrap: 130
			});
			console.log(text);
			console.log(this.props.reviews.data.header_img !== "", this.props.reviews.data.header_img, this.props.reviews.data.header_img !== null)
			backgroundStyle = this.props.reviews.data.header_img !== "" ? { background: 'url(/'+this.props.reviews.data.header_img+') center center / cover' } : {};
		}
		if(this.props.reviews && this.props.reviews.data && this.props.reviews.records && this.props.reviews.related){
		return (
			<div className="page reviews">
				<div className={`cta ${this.state.scrollTop >= 100 ? 'isActive' : ''}`}>
					<h5 className="heading-small">Reading About</h5>
					<h5 className="heading">{this.props.reviews.data.title}</h5>
					<a href={`${this.props.reviews.data.url ? this.props.reviews.data.url: '#'}`} className="btn-cta btn btn-primary" target='_blank'>See this app <i className="fa fa-external-link" aria-hidden="true"></i></a>
				</div>
				<SlideNavbarWrapper>
				<div className="body">
					<ol className="breadcrumb">
					  <li className="breadcrumb-item"><a href="#">Home</a></li>
					  <li className="breadcrumb-item active">Find Resources</li>
					</ol>	
					<div className="hero hero-reviews section" style={backgroundStyle}>
						<div className="container">
							<div className="row">
								<div className="col-12 text-center">
									<img src="/uploads/images/icons/Icon_mySugr_200x200.png" className="icon" />
									<h1 className="heading">{this.props.reviews.data.title}</h1>
									<a href="https://mysugr.com/" className="btn-cta btn btn-primary" target="_blank">View website <i className="fa fa-external-link" aria-hidden="true"></i></a>
								</div>
							</div>
						</div>
					</div>

					<div className="section section-page-info bg-white">
						<div className="container">
							<div className="row">
								<div className="col-md-2 col-12">
									<div className="avatar" style={{ background: 'url(/'+this.props.reviews.data.expert.avatar_img+') center center / cover' }}>
									</div>
									<h6 className="heading">{this.props.reviews.data.expert.first_name+' '+this.props.reviews.data.expert.last_name}, {this.props.reviews.data.expert.credentials}</h6>
									<p>{this.props.reviews.data.expert.occupation} - {this.props.reviews.data.expert.city}, {this.props.reviews.data.expert.state}</p>
								</div>
								<div className="col-md-6 col-12">
									<h6 className="heading">What our experts say</h6>
									<p>Dr. S. Alpert is an ed. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
								</div>
								<div className="information col-md-4 col-12">
									<h6 className="heading">Top line information</h6>
									<ul className="links">
										{this.props.reviews.data.url && <li>
											<a href={this.props.reviews.data.url} target="_blank">Homepage <i className="fa fa-external-link" aria-hidden="true"></i></a>
										</li>}
										{this.props.reviews.data.ios_url && <li>
											<a href={this.props.reviews.data.ios_url} target="_blank">iTunes <i className="fa fa-external-link" aria-hidden="true"></i></a></li>}
										{this.props.reviews.data.google_url && <li>
											<a href={this.props.reviews.data.google_url} target="_blank">Android <i className="fa fa-external-link" aria-hidden="true"></i></a>
										</li>}
									</ul>
									<p>
										{ (this.props.reviews.data.ios_rating || this.props.reviews.data.google_rating) && 'Rating: '}{this.props.reviews.data.ios_rating && this.props.reviews.data.ios_rating+' (iOS)  '}{this.props.reviews.data.google_rating && this.props.reviews.data.google_rating+' (Anroid)'}
									</p>
								</div>
							</div>
						</div>
					</div>			
					<div className="section">
						<div className="container">
							<div className="row">
								<div className="col-12 col-md-8">
									<p>{this.props.reviews.data.description}</p>

									<div className="tags pb-5">
										{this.props.reviews.data.tags.map((item,index)=>{
											return (
												<span className="tag-item" key={index}>{item.title}</span>
											)
										})}
									</div>
									<div className="test-row">
										<div className="test-content">
											<div className="test-ad">
												<ReviewsRelated
													type="related_single" 
													data={this.props.reviews.data} 
													related={this.props.reviews.related}
												/>
											</div>
											<p dangerouslySetInnerHTML={{ __html: `${this.props.reviews.data.body}` }}>
											</p>
										</div>
									</div>
									<hr className="highlight mb-5" />
									<ReviewsRelated 
												type="related_shuffle" 
												data={this.props.reviews.data} 
												related={this.props.reviews.related}
											/>
								</div>
								<div className="col-12 col-md-4">
									<ReviewsRelated 
												type="related_in_category" 
												data={this.props.reviews.data} 
												related={this.props.reviews.related}
											/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<Footer/>
				</SlideNavbarWrapper>
			</div>
		);
		}
		else {
			return null
		}
	}
}

