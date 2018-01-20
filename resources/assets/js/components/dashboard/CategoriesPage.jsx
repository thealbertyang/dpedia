import React from 'react'
import Sidebar from '../../components/Sidebar'
import Cookies from 'universal-cookie'
import { connect } from "react-redux"
import { getCategories, store, update, del, clearStatus } from '../../actions/categoriesActions'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Messages } from '../../components/Messages'
import { clearMsg } from '../../actions/msgActions'

@connect((store) => { 
	return {
		resources: store.resources.resources,
		categories: store.categories.categories,
		status: store.resources.status,
		errors: store.resources.errors,
		results: store.resources.results,
		msg: {
			status: store.msg.status,
			action: store.msg.action
		}
	}
})
export class CategoriesPage extends React.Component {
	constructor(props){
		super(props);	
		this.del = this.del.bind(this);
	} 

	componentWillMount(){
		console.log('will mount');
		const search = this.props.location.search; // could be '?foo=bar'
		const params = new URLSearchParams(search);
		const pageNumber = params.get('page'); // bar

		this.props.dispatch(getCategories(pageNumber));   
		} 

	componentWillUnmount(){
		console.log('willunmount');
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
		//console.log(pageNumberNext)

		//console.log(pageNumber);

		//if next page was called then we want to update users list, when it does update, we don't want it to update again if it's the same page now
		if(pageNumberNext !== pageNumber){
			this.props.dispatch(getCategories(pageNumber));
		}
	}



	del(e, id){
		e.preventDefault();
		this.props.dispatch(del(id));
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
										<div className="col-6 header__title"><h1 className="title">Categories</h1></div>
										<div className="col-6 d-flex justify-content-end header__actions">
											<Link to={`${this.props.match.url}/create`} className="btn btn-primary">Add Category</Link>
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
								              	
								                {this.props.categories && this.props.categories.map((category)=> (
													<tr key={category.id}>
										                  <td>{category.id}</td>
										                  <td>{category.slug}</td>
										                  <td>{category.title}</td>
										                  <td>{category.created_at}</td>
										                  <td><a href="#" onClick={(e) => this.del(e, category.id)}><i className="fa fa-trash"></i></a> <Link to={`${this.props.match.url}/${category.id}/edit`}><i className="fa fa-pencil"></i></Link></td>
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
