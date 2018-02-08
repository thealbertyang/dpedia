import React from 'react';
import { connect } from "react-redux"
import store from "../../../../../store"
import Footer from '../../../../../components/Footer'

import ArticleCard from '../../../../../components/Card/ArticleCard'
import VideoCard from '../../../../../components/Card/VideoCard'
import ReviewCard from '../../../../../components/Card/ReviewCard'
import * as articlesActions from '../../../../../actions/articlesActions'
import * as htmlToText from 'html-to-text'

export class ReviewsRelated extends React.Component {
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
		if(this.props.type == 'related_single'){
			return (
				<div className="section section-resource-related">
					<div className='container-fluid p-0'>
						<div className="row">
							<div className="col-12">
								<div className="row">
									<div className='col-12'>
										<ReviewCard {...this.props.related.related_single} layout='split'/>
									</div>
								</div>									
							</div>
						</div>
					</div>
				</div>
			);
		}
		else if(this.props.type == 'related_in_category'){
			return (
				<div className="section section-resource-related">
					<div className='container-fluid p-0'>
						<div className="row">
							<div className="col-12">
								<h4 className="heading">More in: <span className="highlight">{this.props.data.reviews_category.title}</span></h4>
								<div className="row">
									{this.props.related.related_in_category.map((item, index)=>{
										if(index + 1 <= 4){
											return (
												<div className='col-12'>
													<ReviewCard {...item} layout='full'/>
												</div>
											)
										}
									})}
								</div>									
							</div>
						</div>
					</div>
				</div>
			);
		}

		else if(this.props.type == 'related_shuffle'){
			return (
				<div className="section section-resource-related">
					<div className='container-fluid p-0'>
						<div className="row">
							<div className="col-12">
								<h4 className="heading">More {this.props.label} like this</h4>
								<div className="row">
									{this.props.related.related_shuffle.map((item, index)=>{
										if(index + 1 <= 4){
											return (
												<div className='col-4'>
													<ReviewCard {...item} layout='split'/>
												</div>
											)
										}
									})}
								</div>									
							</div>
						</div>
					</div>
				</div>
			);
		}
	}
}
