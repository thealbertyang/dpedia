import React from 'react';
import { BrowserRouter as Router, NavLink, Link } from 'react-router-dom';
import Navbar from '../Navbar'
import Footer from '../Footer'
import Card from '../Card'
import { connect } from "react-redux"
import store from "../../store"
import { getResource, getRelatedResource, getSimilarResources, getRelatedCategoryResources, submitForm, update, clearStatus, setDefault } from '../../actions/resourcesActions'
import SlideNavbarWrapper from '../../containers/Views/Public/Layouts/SlideNavbarWrapper'

@connect(
	(store) => { 
	return {
		resources: store.resources.resources,
		resourcesData: store.resources.form,
		relatedData: {
			resource: store.resources.related_resource,
			resource_status: store.resources.related_resource_status,
			category_resources: store.resources.related_category_resources,
			category_resources_status: store.resources.related_category_resources_status,
			similar_resources: store.resources.similar_resources,
			similar_resources_status: store.resources.similar_resources_status,
		},
		status: store.resources.status,
		errors: store.resources.errors,
		msg: {
			status: store.msg.status,
			action: store.msg.action
		}
	}
})
export class ResourcesPage extends React.Component {
	constructor(props){
		super(props);
		this.state = { scrollTop: 0 };
		this.handleScroll = this.handleScroll.bind(this);
	}

	componentDidMount(){
		window.addEventListener('scroll', this.handleScroll);
	}

	componentWillUnmount(){
		window.removeEventListener('scroll', this.handleScroll);
	}

	componentWillMount(){
		this.props.match.params.slug && this.props.dispatch(getResource(this.props.match.params.slug));
		this.props.dispatch(getRelatedResource(this.props.match.params.slug));
				this.props.dispatch(clearStatus());
				console.log('status cleared');

	}

	componentDidUpdate(){
		if(this.props.resourcesData && this.props.status == 'fetch_resource_success'){
			if(this.props.relatedData && this.props.relatedData.resource_status == 'fetch_related_resource_success'){
				this.props.dispatch(getRelatedCategoryResources(this.props.resourcesData.id, this.props.relatedData.resource.category_id));
				this.props.dispatch(getSimilarResources(this.props.resourcesData.id, this.props.relatedData.resource.category_id));
				this.props.dispatch(clearStatus('related_resource_status'));
			}
		}
	}

	handleScroll(event){
		let scrollTop = event.srcElement.documentElement.scrollTop || window.pageYoffset || event.srcElement.body.scrollTop;
        this.setState({ scrollTop: scrollTop });
	}

	render(){
		if(this.props.resourcesData){ 
			document.title = "Doctorpedia | "+this.props.resourcesData.title;
		}
		
		const backgroundImage = "/img/hero_1.jpg";
		if(this.props.status == 'fetch_resource_success' && this.props.resourcesData && (this.props.resourcesData.category.slug == this.props.match.params.category)){
			return (
			<div className="page resources">
				<div className={`cta ${this.state.scrollTop >= 100 ? 'isActive' : ''}`}>
					<h5 className="heading-small">Reading About</h5>
					<h5 className="heading">{this.props.resourcesData.title}</h5>
					<a href={`${this.props.resourcesData.url ? this.props.resourcesData.url: '#'}`} className="btn-cta btn btn-primary" target='_blank'>See this website <i className="fa fa-external-link" aria-hidden="true"></i></a>
				</div>
				<SlideNavbarWrapper>
					<ol className="breadcrumb">
					  <li className="breadcrumb-item"><a href="#">Home</a></li>
					  <li className="breadcrumb-item active">Find Resources</li>
					</ol>
					<div className="main">
						<div className="hero container-fluid"></div>
						{/* style={{ backgroundImage: `url(${this.props.resourcesData.header_img ? '/'+this.props.resourcesData.header_img : backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center center' }} */}
						<div className="main__header">
							<div className="container">
								<div className="row align-center">
										<div className="header__cta col-md-12">
										<img src={`/${this.props.resourcesData.icon_img ? this.props.resourcesData.icon_img : 'img/app_icon.jpg'}`} className="icon__img" />
										<h1 className="heading">{this.props.resourcesData.title}</h1>
										<a href={`${this.props.resourcesData.url ? this.props.resourcesData.url: '#'}`} className="btn-cta btn btn-primary" target='_blank'>See this website <i className="fa fa-external-link" aria-hidden="true"></i></a>
									</div>
									<div className="header__title col-md-12">
										<div className="row align-left">
											<div className="expert-container col-md-8 col-sm-12 col-12">
												<div className="avatar" style={{ background: 'url(/'+this.props.resourcesData.expert.avatar_img+') center center / cover' }}>
												</div>
												<div className="expert">
													<h6 className="heading-small">What our experts say</h6>
													<p className="quote h4">"{this.props.resourcesData.quote && this.props.resourcesData.quote}"</p>
													<h6 className="heading-small">- {this.props.resourcesData.expert.first_name} {this.props.resourcesData.expert.last_name}, {this.props.resourcesData.expert.credentials}{this.props.resourcesData.expert.city && ', '+this.props.resourcesData.expert.city}{this.props.resourcesData.expert.state && ', '+this.props.resourcesData.expert.state}</h6>
												</div>
											</div>
											<div className="information col-md-4 col-sm-12">
												<h6 className="heading">Top line information</h6>
												
												<ul className="links">
													{this.props.resourcesData.url && <li><a href={`${this.props.resourcesData.url ? this.props.resourcesData.url : '#'}`} target='_blank'>Homepage <i className="fa fa-external-link" aria-hidden="true"></i></a></li> }
													{this.props.resourcesData.ios_url && <li><a href={`${this.props.resourcesData.ios_url ? this.props.resourcesData.ios_url : '#'}`} target='_blank'>iTunes <i className="fa fa-external-link" aria-hidden="true"></i></a></li> }
													{this.props.resourcesData.google_url && <li><a href={`${this.props.resourcesData.google_url ? this.props.resourcesData.google_url : '#'}`} target='_blank'>Android <i className="fa fa-external-link" aria-hidden="true"></i></a></li> }
												</ul>

												{(this.props.resourcesData.ios_rating || this.props.resourcesData.google_rating) && <p>Rating: {this.props.resourcesData.ios_rating && this.props.resourcesData.ios_rating+' (iOS)'} &nbsp; {this.props.resourcesData.google_rating && this.props.resourcesData.google_rating+' (Android)'}</p>}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="main__body">
							<div className="container">
								<div className="row">
									<div className="content col-md-8">
										<p className="content__desc h3" dangerouslySetInnerHTML={{ __html: `${this.props.resourcesData.description ? this.props.resourcesData.description: ''}` }}></p>
										<div className="row">
											<div className="test-row">
											<div className="test-ad">
												<Card title={this.props.relatedData.resource && this.props.relatedData.resource.title} layout='links' split={true} category={this.props.relatedData.resource && this.props.relatedData.resource.category.title} description={this.props.relatedData.resource && this.props.relatedData.resource.description} url={this.props.relatedData.resource && this.props.relatedData.resource.url} link={this.props.relatedData.resource && window.location.protocol+'//'+window.location.hostname+'/resources/'+this.props.relatedData.resource.category.slug+'/'+this.props.relatedData.resource.slug} layout='links' />
										    </div>
										    <div className="test-content" dangerouslySetInnerHTML={{ __html: `${this.props.resourcesData.body ? this.props.resourcesData.body: ''}` }}>
											</div>
											</div>
										</div>
										<hr className="highlight mb-5"/>
										<div className="related row">
										    <div className="col-md-12">
									    		<h4 className="related__heading heading">More Resources Like This</h4>

									    		<div className="row">
									    			{this.props.relatedData.similar_resources && Object.keys(this.props.relatedData.similar_resources).map((i, key)=>{
														if(i <= 2){
									    					return (
									    						<div className="col-md-4">
																	<Card title={this.props.relatedData.resource && this.props.relatedData.similar_resources[i].title} layout='links' category={this.props.relatedData.resource && this.props.relatedData.similar_resources[i].category.title} description={this.props.relatedData.resource && this.props.relatedData.similar_resources[i].description} url={this.props.relatedData.resource && this.props.relatedData.similar_resources[i].url} link={this.props.relatedData.resource && window.location.protocol+'//'+window.location.hostname+'/resources/'+this.props.relatedData.similar_resources[i].category.slug+'/'+this.props.relatedData.similar_resources[i].slug} layout='links' />
																</div>
															)
									    				}
									    			})}

												</div>
											</div>
										</div>
									</div>
									<div className="sidebar col-md-4">
										<h4 className="heading">More in: <span className="highlight">{this.props.resourcesData.category.title}</span></h4>
										{this.props.relatedData.category_resources && Object.keys(this.props.relatedData.category_resources).map((i, key)=>{
														if(i <= 2){
									    					return (
															<Card title={this.props.relatedData.resource && this.props.relatedData.category_resources[i].title} layout='links' split={true} category={this.props.relatedData.resource && this.props.relatedData.category_resources[i].category.title} description={this.props.relatedData.resource && this.props.relatedData.category_resources[i].description} url={this.props.relatedData.resource && this.props.relatedData.category_resources[i].url} link={this.props.relatedData.resource && window.location.protocol+'//'+window.location.hostname+'/resources/'+this.props.relatedData.category_resources[i].category.slug+'/'+this.props.relatedData.category_resources[i].slug} layout='links' />
															)
									    				}
									    			})}
									</div>
								</div>
							</div>
						</div>
					</div>
					<Footer/>
				</SlideNavbarWrapper>
				
			</div>
			)
		}
		else {
			return null
		}
	}
}

