import React from 'react';
import { connect } from "react-redux"
import store from "../../../../../store"
import Footer from '../../../../../components/Footer'

import ArticleCard from '../../../../../components/Card/ArticleCard'
import VideoCard from '../../../../../components/Card/VideoCard'
import ReviewCard from '../../../../../components/Card/ReviewCard'
import * as articlesActions from '../../../../../actions/articlesActions'
import * as htmlToText from 'html-to-text'

export class ArticlesRelated extends React.Component {
	constructor(props){
		super(props)
		this.state = { count: 8 };
	}

	filterByCategory = (resource_records, resource_category_id) => {
		return resource_records.filter((resource)=>{
			if(resource.reviews_category_id == resource_category_id && resource.status == 'published'){
				return resource;
			}
		});
	}

	getCategory = (category_records, category_id) => {
		return category_records.reduce((results, category)=>{
			if(category.id == category_id){
				result = category;
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
		console.log('THIS DOT TYPES', this.props)
			return (
				<div className="section section-resource-related">
					<div className='container-fluid p-0'>
						<div className="row">
							<div className="col">
								<h6 className="heading">More by this Expert</h6>
							</div>
						</div>
						<div className="row">
							<div className="col-12">
								<div className="row">
									<div className='col-12'>
										{this.props.records && this.props.records.map((item, index)=>{
											if((index + 1) <= 3)
											if(item.resourceable_type === 'App\\Article'){
												return <ArticleCard {...item} />
											}
											else if(item.resourceable_type == 'App\\Video'){
												return <VideoCard {...item} />
											}
											else if(item.resourceable_type == 'App\\Review'){
												return <ReviewCard layout='full' {...item} />
											}
										})}
									</div>
								</div>									
							</div>
						</div>
					</div>
				</div>
			);
		
	}
}
