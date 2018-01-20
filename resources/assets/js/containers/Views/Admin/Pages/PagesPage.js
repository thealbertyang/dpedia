import React from 'react'
import { connect } from "react-redux"
import crudActions from '../../../../actions/crudActions'
import { Link } from 'react-router-dom'
import { IndexCreateEditContainer } from '../IndexCreateEditContainer'

let resourceCrudActions = new crudActions('PAGES','pages');


@connect((store) => {
	return {
		records: store.pages.records,
		status: store.pages.status,
		errors: store.pages.errors,
		results: store.pages.results,
	}
})
export class PagesPage extends React.Component {
	constructor(props){
		super(props);	
		this.deleteUser = this.deleteUser.bind(this);
	} 

	componentWillMount(){
		const search = this.props.location.search; // could be '?foo=bar'
		const params = new URLSearchParams(search);
		const pageNumber = params.get('page'); // bar

		this.props.dispatch(resourceCrudActions.getAll(pageNumber));   
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

		//if next page was called then we want to update pages list, when it does update, we don't want it to update again if it's the same page now
		if(pageNumberNext !== pageNumber){
			this.props.dispatch(resourceCrudActions.getAll(pageNumberNext));
		}
	}



	deleteUser(e, id){
		e.preventDefault();
		this.props.dispatch(resourceCrudActions.delete(id));
	}

	render(){
		return (
			<IndexCreateEditContainer type="INDEX" title="Pages" matchUrl={this.props.match.url}>
	            <table className="table table-striped table-hover">
	              <thead>
	                <tr>
	                  <th>#</th>
	                  <th>Title</th>
	                  <th>Slug</th>
	                  <th>Type</th>
	                  <th>User ID</th>
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
				                  <td>{data.type.label}</td>
				                  <td>{data.user_id}</td>
				                  <td>{data.created_at}</td>
				                  <td><a href="#" 
				                  className={`${(data.slug == 'home' || data.slug == 'curious-about' || data.slug == 'living-with' || data.slug == 'preventive-care' || data.slug == 'alternative-care') && 'disabled'}`} onClick={(e) => { e.preventDefault(); this.props.dispatch(resourceCrudActions.delete(data.id)) }}><i className="fa fa-trash"></i></a> <Link to={`${this.props.match.url}/${data.id}/edit`}><i className="fa fa-pencil-alt"></i></Link></td>
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
