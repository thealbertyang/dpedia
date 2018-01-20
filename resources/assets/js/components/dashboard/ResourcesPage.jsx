import React from 'react'
import Sidebar from '../../components/Sidebar'
import Cookies from 'universal-cookie'
import { connect } from "react-redux"
import { modalAddUserToggle, getResources, submitForm, updateResource, deleteResource, clearStatus } from '../../actions/resourcesActions'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Messages } from '../../components/Messages'
import { clearMsg } from '../../actions/msgActions'

@connect((store) => {
	return {
		resources: store.resources.resources,
		status: store.resources.status,
		errors: store.resources.errors,
		results: store.resources.results,
		msg: {
			status: store.msg.status,
			action: store.msg.action
		}
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
			<div className="screen container-fluid">
			      	<div className="screen__container row">
				        <Sidebar/>
				        <main className="col-sm-9 ml-sm-auto col-md-10 main" role="main">
							<div className="page-header">
								<div className="container">
									<div className="row">
										<div className="col-6 header__title"><h1 className="title">Resources</h1></div>
										<div className="col-6 d-flex justify-content-end header__actions">
											<Link to={`${this.props.match.url}/create`} className="btn btn-primary">Add Resource</Link>
										</div>
									</div>
								</div>
							</div>
							{this.props.msg.status == 'success' && this.props.msg.action == 'submit' &&
							<Messages type={this.props.type} />
							}
							<div className="page-body p-5">	 
								<div className="container">
									<div className="row">
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
								        </div>
								    </div> 
					        </div>
				        </main>
			        </div>
			</div>
		)
	}
}
