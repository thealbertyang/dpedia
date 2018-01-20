import React from 'react'
import { connect } from "react-redux"
import { modalAddUserToggle, getResources, submitForm, updateResource, deleteResource, clearStatus } from '../../../../actions/resourcesActions'
import { Link } from 'react-router-dom'
import { clearMsg } from '../../../../actions/msgActions'
import { IndexCreateEditContainer } from '../IndexCreateEditContainer'


@connect((store) => {
	return {
		resources: store.resources.resources,
		status: store.resources.status,
		errors: store.resources.errors,
		results: store.resources.results,
	}
})
export class ResourcesPage extends React.Component {
	constructor(props){
		super(props);	
		this.deleteUser = this.deleteUser.bind(this);
	} 

	componentWillMount(){
		const search = this.props.location.search; // could be '?foo=bar'
		const params = new URLSearchParams(search);
		const pageNumber = params.get('page'); // bar

		this.props.dispatch(getResources(pageNumber));   
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
			this.props.dispatch(getResources(pageNumberNext));
		}
	}



	deleteUser(e, id){
		e.preventDefault();
		this.props.dispatch(deleteResource(id));
	}

	render(){
		return (
			<IndexCreateEditContainer type={this.props.type} title="Resources" matchUrl={this.props.match.url}>
				<div className="table-responsive">
					<table className="table table-striped">
					  <thead>
					    <tr>
					      <th>#</th>
					      <th>Slug</th>
					      <th>Title</th>
					      <th>Created</th>
					      <th>Actions</th>
					    </tr>
					  </thead>
					  <tbody>
					    { this.props.resources && this.props.resources.map((resource)=> (
							<tr key={resource.id}>
					              <td>{resource.id}</td>
					              <td>{resource.slug}</td>
					              <td>{resource.title}</td>
					              <td>{resource.created_at}</td>
					              <td><a href="#" onClick={(e) => this.deleteUser(e, resource.id)}><i className="fa fa-trash"></i></a> <Link to={`${this.props.match.url}/${resource.id}/edit`}><i className="fa fa-pencil"></i></Link></td>
							 </tr>
						)) }
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
				</div>
			</IndexCreateEditContainer>
		)
	}
}
