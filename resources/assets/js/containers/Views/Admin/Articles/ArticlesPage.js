import React from 'react'
import { connect } from "react-redux"
import * as articlesActions from '../../../../actions/articlesActions'
import { Link } from 'react-router-dom'
import { IndexCreateEditContainer } from '../IndexCreateEditContainer'

@connect((store) => {
	return {
		data: store.articles.data, 
		records: store.articles.records,
		status: store.articles.status,
		errors: store.articles.errors,
		results: store.articles.results,
	}
})
export class ArticlesPage extends React.Component {
	constructor(props){
		super(props);	
	} 

	componentWillMount(){
		const search = this.props.location.search; // could be '?foo=bar'
		const params = new URLSearchParams(search);
		const pageNumber = params.get('page'); // bar

		this.props.dispatch(articlesActions.crudGetAll(pageNumber));   
		} 

	componentDidUpdate(prevProps, prevState){
		const search = prevProps.location.search; // could be '?foo=bar'
		const params = new URLSearchParams(search);
		const pageNumber = params.get('page'); // bar

		const searchNext = this.props.location.search; // could be '?foo=bar'
		const paramsNext = new URLSearchParams(searchNext);
		const pageNumberNext = paramsNext.get('page'); // bar

		console.log('prevProps', prevProps);
		console.log('thisProps', this.props)
		console.log(pageNumberNext)

		console.log(pageNumber);

		//if next page was called then we want to update users list, when it does update, we don't want it to update again if it's the same page now
		if(pageNumberNext !== pageNumber){
			this.props.dispatch(articlesActions.crudGetAll(pageNumberNext));
		}
	}

	render(){
		return (
			<IndexCreateEditContainer type={this.props.type} title="Articles" matchUrl={this.props.match.url}>
	            <table className="table table-striped table-hover">
	              <thead>
	                <tr>
	                  <th>#</th>
	                  <th>Title</th>
	                  <th>Slug</th>
	                  <th>Created</th>
	                  <th>Actions</th>
	                </tr>
	              </thead>
	              <tbody>
	                {this.props.records && 
	                	(this.props.records.length > 0 ? this.props.records.map((data)=>
		                (
							<tr key={data.id}>
				                  <td>{data.id}</td>
				                  <td>{data.title}</td>
				                  <td>{data.slug}</td>
				                  <td>{data.created_at}</td>
				                  <td><a href="#" onClick={(e) => { e.preventDefault(); this.props.dispatch(articlesActions.crudDelete(data.id)) }}><i className="fa fa-trash"></i></a> <Link to={`${this.props.match.url}/${data.id}/edit`}><i className="fa fa-pencil-alt"></i></Link></td>
							</tr>
						)) 

						:

						(
							<tr>
				                  <td className="text-center" colSpan='5'>There we're no results.</td>
				            </tr>
						)
					)}
	              </tbody>
	            </table>
	            <div className="table__pagination">
	            	<div className="results">
	            		Showing {this.props.results.from} to {this.props.results.to} of {this.props.results.total} entries 
	            	</div>
	            	<div className="pagination">
	            		<Link to={this.props.results.prev_url ? `${this.props.match.url}?page=${(this.props.results.current - 1)}` : '#'}>Previous</Link><Link to={this.props.results.next_url ? `${this.props.match.url}?page=${(this.props.results.current + 1)}` : '#'}>Next</Link>
	            	</div>
	            </div>
			</IndexCreateEditContainer>
		)
	}
}
