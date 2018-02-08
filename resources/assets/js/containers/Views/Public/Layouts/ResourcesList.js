import React from 'react';
import { connect } from "react-redux"
import store from "../../../../store"
import Footer from '../../../../components/Footer'

import ArticleCard from '../../../../components/Card/ArticleCard'
import VideoCard from '../../../../components/Card/VideoCard'
import ReviewCard from '../../../../components/Card/ReviewCard'
import * as articlesActions from '../../../../actions/articlesActions'
import * as htmlToText from 'html-to-text'

export class ResourcesList extends React.Component {
	constructor(props){
		super(props)
		this.state = { count: 8 };
	}

	getCategory = (category_records, category_id) => {
		return category_records.reduce((results, category)=>{
			if(category.id == category_id){
				results = category;
			}
			return results;
		});
	}

	withCategory = (records, category_records) => {
		return records.map((record)=>{
			return { ...record, category: this.getCategory(category_records, record.reviews_category_id) }
		});
	}

	seeMore = (e) => {
		e.preventDefault(); 
		this.setState({ count: this.state.count + 8});
	}

	render(){
		//console.log(this.props);
		if(this.props.records){

			let resources;
			if(this.props.type !== 'reviews'){
				resources = this.props.records;
			}
			else { 
				resources = this.withCategory(this.props.records, this.props.category_records);
			}

			return (
				<div className="section-resources section">
					<div className={`${(this.props.container && this.props.container == 'regular') ? 'container' : 'container-fluid'}`}>
						<div className="row text-center">
							<div className="col">
								<h2 className="heading">{this.props.header}</h2>
							</div>
						</div>
						<div className="row">
							<div className="col-12">
								<h5 className="heading">{this.props.title} <span className="heading-sub h5 highlight">({this.props.records && this.props.records.length})</span> <a href={`/search?type=${this.props.type}`} className="see-all h6">See All Recent {this.props.type == 'articles' && 'Articles'} {this.props.type == 'videos' && 'Videos'} {this.props.type == 'reviews' && 'Reviews'}</a></h5> 
								{this.props.type == 'reviews' && <hr className="mb-4" />}
								{this.props.type !== 'reviews' && <hr />}
								<div className="row">
									{resources && resources.map((item, index)=>{

										if(index + 1 <= this.state.count){
											return(
												<div className="col-12 col-md-4 col-lg-3" key={index}>
													{this.props.type == 'articles' && <ArticleCard {...item} />}
													{this.props.type == 'videos' && <VideoCard {...item} />}
													{this.props.type == 'reviews' && <ReviewCard layout="full" {...item} />}
												</div>
											)
										}
									})}
									{resources && resources.length > this.state.count && 
										<div className="col-md-12 mx-auto mt-4 text-center">
											<a href="#" className="see-more btn btn-square btn-grey" onClick={(e)=>this.seeMore(e)}>See more &nbsp; &nbsp;<i className="fa fa-play"></i></a>
										</div>
									}
								</div>									
							</div>
						</div>
					</div>
				</div>
			);
		}
		else {
			return null;
		}
	}
}
