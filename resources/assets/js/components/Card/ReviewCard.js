import React from 'react'
import * as htmlToText from 'html-to-text'

export default class ReviewCard extends React.Component {

	constructor(props){
		super(props)
	}

	htmlToText = (html) => {
		return htmlToText.fromString(this.props.body);
	}

	truncate = (text, limit) => {
		return text.substring(0, limit)+'...';
	}

	render(){
		let bodyText = this.htmlToText(this.props.body).substring(0,150)+'...';

		if(this.props.layout == 'split'){
			return (
				<div className="card card-review">
					<div className="card-body">
						<div className='icon'>
							<img src={`/${this.props.icon_img}`} className="icon__img"/>
						</div>
						<div className="tags col-12 text-right">
							<span className="tag-item">{this.props.reviews_category && this.props.reviews_category.title}</span>
							<span className="tag-text">{this.props.sponsored && 'Sponsored'}</span>
						</div>

						<h6 className="card-title"><a href={`/reviews/${this.props.slug}`}><b>{this.props.title}</b></a></h6>
						<p className="card-text" dangerouslySetInnerHTML={{ __html: `${bodyText}` }}></p>

						<div className="links row"> 
							<div className="col-6">
								<a href={this.props.url} target="_blank">See this website <i className="fa fa-external-link" aria-hidden="true"></i></a>
							</div>
							<div className="col-6">
								<a href={`/reviews/${this.props.slug}`} className="text-primary">Full Review</a>
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
							<img src={`/${this.props.icon_img}`} className="icon__img"/>
						</div>
						<div className="tags col-12 text-right">
							<span className="tag-item">{this.props.reviews_category && this.props.reviews_category.title}</span>
							<span className="tag-text">{this.props.sponsored && 'Sponsored'}</span>
						</div>

						<h6 className="card-title"><a href={`/reviews/${this.props.slug}`}><b>{this.props.title}</b></a></h6>
						<p className="card-text" dangerouslySetInnerHTML={{ __html: `${bodyText}` }}></p>
						<p className="review"><a href={`/reviews/${this.props.slug}`}>Full Review</a></p>
						{this.props.tags && <div className="tags">
							{this.props.tags.map((item, index)=><span className="tag__item" key={index}>{item.title}</span>)}
						</div>}

						<a href={`/reviews/${this.props.slug}`} className="btn btn-primary btn-round full-width"><i className="fa fa-file-text-o" aria-hidden="true"></i> Read Review</a>
					</div>
				</div>
			);
		}
	}
}