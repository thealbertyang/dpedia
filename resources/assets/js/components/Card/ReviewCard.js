import React from 'react'
import * as htmlToText from 'html-to-text'
import Pluralize from 'pluralize'

export default class ReviewCard extends React.Component {

	constructor(props){
		super(props)
	}

	htmlToText = (html) => {
		return htmlToText.fromString(html);
	}

	truncate = (text, limit) => {
		return text.substring(0, limit)+'...';
	}

	render(){
		//console.log('REVIEW CARD PROPS', this.props);
		let bodyText, iconImg, tags, categoryTitle;

		if(this.props.reviews_category && this.props.reviews_category.title == 'Clinical Trials'){
			categoryTitle = 'Trials';
		}
		else {
			categoryTitle = this.props.reviews_category.title;
		}

		if(this.props.resourceable && this.props.resourceable.body){
			bodyText = this.htmlToText(this.props.resourceable.body).substring(0,150)+'...';
			iconImg = this.props.resourceable.icon_img;
			tags = this.props.resourceable.tags;
		}
		else if(this.props.body){
			bodyText = this.htmlToText(this.props.body).substring(0,150)+'...';
			iconImg = this.props.icon_img;
			tags = this.props.tags;
		}

		if(this.props.layout == 'split'){
			return (
				<div className="card card-review card-review-split">
					<div className="card-body">
						<div className='icon'>
							<img src={`/${iconImg}`} className="icon__img"/>
						</div>
						<div className="tags float-right text-right full-width">
							<span className="tag-item">{this.props.reviews_category && this.props.reviews_category.title}</span>
							<span className="tag-text">{this.props.sponsored && 'Sponsored'}</span>
						</div>

						<h5 className="card-title"><a href={`/reviews/${this.props.slug}`}><b>{this.props.title}</b></a></h5>
						<p className="card-text" dangerouslySetInnerHTML={{ __html: `${bodyText}` }}></p>

						<div className="links row"> 
							<div className="col-md-12 pr-1 pr-md-3 col-6 mb-2">
								<a href={`/reviews/${this.props.slug}`} className="btn btn-primary btn-round btn-royal-blue btn-review"><i className="fa fa-file-text-o" aria-hidden="true"></i> Full Review</a>
							</div>
							<div className="col-md-12 pl-1 pl-md-3 col-6">
								<a href={`${this.props.url}`} target="_blank" className="btn btn-primary btn-round btn-review"><i className="fa fa-file-text-o" aria-hidden="true"></i> View {this.props.reviews_category && Pluralize.singular(this.props.reviews_category.title)}</a>
							</div>
						</div>
						
					</div>
				</div>
			);
		}
		else if(this.props.layout == 'full'){
			return (
				<div className="card card-review">
					<div className="card-body">
						<div className='icon'>
							<img src={`/${iconImg}`} className="icon__img"/>
						</div>
						<div className="tags float-right text-right full-width">
							<span className="tag-item">{this.props.reviews_category && this.props.reviews_category.title}</span>
							<span className="tag-text">{this.props.sponsored && 'Sponsored'}</span>
						</div>

						<h5 className="card-title"><a href={`/reviews/${this.props.slug}`}><b>{this.props.title}</b></a></h5>
						<p className="card-text" dangerouslySetInnerHTML={{ __html: `${bodyText}` }}></p>
						{tags && <div className="tags">
							{tags.map((item, index)=><span className="tag__item" key={index}>{item.title}</span>)}
						</div>}

						<div className="row">
							<div className="col-6 pr-1 pr-xxl-3">
								<a href={`/reviews/${this.props.slug}`} className="btn btn-primary btn-round btn-royal-blue btn-review"><i className="fa fa-file-text-o" aria-hidden="true"></i> Full Review</a>
							</div>
							<div className="col-6 pl-1 pr-xxl-3">
								<a href={`${this.props.url}`} target="_blank" className="btn btn-primary btn-round btn-review">
									<i className="fa fa-file-text-o" aria-hidden="true"></i> View {this.props.reviews_category && Pluralize.singular(categoryTitle)}</a>
							</div>
						</div>
					</div>
				</div>
			);
		}
	}
}