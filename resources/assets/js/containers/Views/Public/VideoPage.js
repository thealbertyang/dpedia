import React from 'react';
import { connect } from "react-redux"
import store from "../../../store"
import Footer from '../../../components/Footer'
import ArticleCard from '../../../components/Card/ArticleCard'
import SlideNavbarWrapper from './Layouts/SlideNavbarWrapper'
import * as videosActions from '../../../actions/videosActions'
import * as htmlToText from 'html-to-text'

@connect((store) => {
	return {
		videos: store.videos,
	}
})
export class VideoPage extends React.Component {
	constructor(props){
		super(props)
	}

	componentWillMount(){
		this.props.match.params.slug && this.props.dispatch(articlesActions.crudGet(this.props.match.params.slug));
	}

	render(){
		console.log(this.props);
		if(this.props.articles.data){
			var text = htmlToText.fromString(this.props.articles.data.body, {
		    	wordwrap: 130
			});
			console.log(text);
		}
		if(this.props.articles.status == 'fetch_resource_success'){
		return (
			<div className="page video">
				<SlideNavbarWrapper>
				<div className="body">
					<div className="hero section">
					</div>		
					<div className="section bg-white">
						<div className="container">
							<div className="row">
								<div className="col-2">
									<div className="avatar" style={{ background: 'url(/'+this.props.articles.data.expert.avatar_img+') center center / cover' }}>
									</div>
									<h6 className="heading">{this.props.articles.data.expert.first_name+' '+this.props.articles.data.expert.last_name}, {this.props.articles.data.expert.credentials}</h6>
									<p>Cardiologist - Tucson, AZ</p>
								</div>
								<div className="col-6">
									<h6 className="heading">About</h6>
									<p>Dr. S. Alpert is an ed. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
								</div>
								<div className="col-4">
									<h6 className="heading">Highlights</h6>
									<p>Dr. S. Alpert is an ed. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
								</div>
							</div>
						</div>
					</div>			
					<div className="section">
						<div className="container">
							<div className="row">
								<div className="col-8">
									<h6 className="heading-sub">November 21, 2015</h6>
									<h1 className="heading">{this.props.videos.data.title}</h1>
									<div className="col-2">
										<div className="avatar" style={{ background: 'url(/'+this.props.articles.data.expert.avatar_img+') center center / cover' }}>
										</div>
										<h6 className="heading">{this.props.articles.data.expert.first_name+' '+this.props.articles.data.expert.last_name}, {this.props.articles.data.expert.credentials}</h6>
										<p>{this.props.articles.data.expert.occupation} - {this.props.articles.data.expert.city}, {this.props.articles.data.expert.state}</p>
									</div>
									<div className="tags">
										{this.props.videos.data.tags.map((item,index)=>{
											return (
												<span className="tag-item" key={index}>{item.title}</span>
											)
										})}
									</div>
									<div className="" dangerouslySetInnerHTML={{ __html: `${this.props.articles.data.body}` }}>
									</div>
									
								</div>
								<div className="col-4">
									<p>Ads</p>
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
