import React from 'react'
import * as htmlToText from 'html-to-text'

export default class ArticleCard extends React.Component {

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

		let bodyText, wordCount, minutesToRead, backgroundImage;

		if(this.props.resourceable && this.props.resourceable.body){
			bodyText = this.htmlToText(this.props.resourceable.body).substring(0,75)+'...';
			wordCount = this.props.resourceable.body.split(' ').length;
		}
		else if(this.props.body){
			bodyText = this.htmlToText(this.props.body).substring(0,75)+'...';
			wordCount = this.props.body && this.props.body.split(' ').length;
		}

		
		minutesToRead = Math.round(wordCount / 275);
		backgroundImage = this.props.header_img ? '/'+this.props.header_img : '/img/hero_1.jpg';

		if(minutesToRead < 1){
			minutesToRead = 1;
		}

		return (
			<div className="card card-article">
				<div className="card-img-top" style={{background: 'url('+backgroundImage+') center center / cover' }} />
				<div className="card-body">
					<div className="tags float-right text-right full-width">
						<span className="tag-text"><b className="highlight">{minutesToRead} min. read</b></span>
						<span className="tag-item">Articles</span>
					</div>

					<h5><b className="highlight">Read:</b></h5>
					<h5 className="card-title mb-4"><a href={`/articles/${this.props.slug}`}><b>{this.props.title}</b></a></h5>
					{/*<p className="card-text" dangerouslySetInnerHTML={{ __html: `${bodyText}` }}></p>*/}
					<a href={`/articles/${this.props.slug}`} className="btn btn-primary btn-square"><i className="fa fa-file-text-o" aria-hidden="true"></i> Read Article</a>
				</div>
			</div>
		);
	}
}