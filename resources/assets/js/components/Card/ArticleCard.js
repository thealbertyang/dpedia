import React from 'react'
import * as htmlToText from 'html-to-text'

export default class ArticleCard extends React.Component {

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
		let wordCount = this.props.body && this.props.body.split(' ').length;
		let minutesToRead = Math.round(wordCount / 275);

		if(minutesToRead < 1){
			minutesToRead = 1;
		}

		return (
			<div className="card">
				<div className="card-img-top" style={{backgroundImage: 'url(/img/hero_1.jpg)', backgroundSize: 'cover' }} />
				<div className="card-body">
					<div className="tags col-12 text-right">
						<span className="tag-text"><b className="highlight">{minutesToRead} min. read</b></span>
						<span className="tag-item">Articles</span>
					</div>

					<h6 className="card-title"><b className="highlight">Read:</b></h6>
					<h6 className="card-title"><b>{this.props.title}</b></h6>
					<p className="card-text" dangerouslySetInnerHTML={{ __html: `${bodyText}` }}></p>
					<a href={`/articles/${this.props.slug}`} className="btn btn-primary btn-round full-width"><i className="fa fa-file-text-o" aria-hidden="true"></i> Read Article</a>
				</div>
			</div>
		);
	}
}