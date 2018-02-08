import React from 'react';
import { connect } from "react-redux"
import store from "../../../../../store"
import Footer from '../../../../../components/Footer'

import ArticleCard from '../../../../../components/Card/ArticleCard'
import VideoCard from '../../../../../components/Card/VideoCard'
import ReviewCard from '../../../../../components/Card/ReviewCard'
import * as articlesActions from '../../../../../actions/articlesActions'
import * as htmlToText from 'html-to-text' 

export class ReviewsSearchResults extends React.Component {
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
		//Once we get new props, we need to split data by categories

		let sortedRecords = {};

		for(let categoryRecordsK in this.props.category_records){
			sortedRecords[this.props.category_records[categoryRecordsK].slug] = [];
			//console.log('This is the categoryRecords', this.props.category_records[categoryRecordsK].title)
			for(let recordsK in this.props.records){

				
				//console.log('THIS PROPS RECORDSK', this.props.records[recordsK]);

				

				if(this.props.category_records[categoryRecordsK].id == this.props.records[recordsK].reviews_category.id){
					//console.log('THIS IS EQUAL', this.props.records[recordsK])
					sortedRecords[this.props.category_records[categoryRecordsK].slug].push(this.props.records[recordsK]);
				}
			}
		}

		//console.log(sortedRecords);

		if(this.props.records && this.props.category_records && sortedRecords){

			let resources = this.withCategory(this.props.records, this.props.category_records);

			return (
				<div className="section">
					<div className={`${(this.props.container && this.props.container == 'regular') ? 'container' : 'container-fluid'}`}>
						<div className="row text-center">
							<div className="col">
								<h2 className="heading">{this.props.header}</h2>
							</div>
						</div>
						{this.props.title && <div className="row mb-4">
							<div className="col-12">
								<h5 className="heading">{this.props.title} <span className="heading-sub h5 highlight">({this.props.records && this.props.records.length})</span> <a href={`/search?type=reviews`} className="see-all h6">See All Recent Reviews</a></h5> 
								<hr/>
							</div>

						</div>}
								{this.props.category_records && this.props.category_records.map((reviews_category, index)=>{
									if(sortedRecords[reviews_category.slug].length > 0){
										return(
											<div className="row">
												<div className="col-12">
													<h4 className="heading">
														{reviews_category.title} <span className="heading-sub h6 highlight">({sortedRecords[reviews_category.slug].length})</span>
													</h4>
													<hr/>
													<div className="row">
														{sortedRecords && Object.keys(sortedRecords).map((key,index)=>{
															//console.log('SORTED RECORDS INDEX', key, reviews_category.slug, sortedRecords[key][index]);
															if(key == reviews_category.slug && sortedRecords[key].length > 0){
																return sortedRecords[key].map((item, index)=>{
																	return (
																		<div className="col-12 col-md-4 col-lg-3" key={index}>
																			<ReviewCard layout="full" {...item} />
																		</div>
																	);
																});
															}
														})}
													</div>
												</div>
											</div>
										)
									}
								})}
					</div>
				</div>
			);
		}
		else {
			return null;
		}
	}
}
