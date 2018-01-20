import React from 'react'
import { connect } from "react-redux"
import store from "../../store"
import { getCategories, getResources, submitForm, update, clearStatus, setDefault } from '../../actions/resourcesActions'
import Card from '../Card'
import { getResults } from '../../actions/searchActions'

import { Form, Field, reduxForm, SubmissionError } from 'redux-form'


@connect((store) => {
	return {
		resources: store.resources.resources,
		search: store.search.results,
		search_status: store.search.status,
		filter: store.search.filter,
		filter_status: store.search.filter_status,
		form: store.resources.form,
		tags: store.resources.data,
		categories: store.resources.categories,
		experts: store.resources.experts,
		status: store.resources.status,
		errors: store.resources.errors,
		msg: {
			status: store.msg.status,
			action: store.msg.action
		}
	}
})
export class HomeSearchResults extends React.Component {
	constructor(props){
		super(props);
		this.setCategoryKey = this.setCategoryKey.bind(this);
		this.state = { loaded: false };
	}
	
	componentWillMount(){
		console.log('searchresults will mount');
		this.props.dispatch(getResults('all', null, true));
		this.props.dispatch(getCategories());

	}

	componentDidMount(){
		
	}

	componentDidUpdate(){
		console.log('home results props', this.props);
		if(this.props.status == 'fetch_categories_success' && this.state.loaded == false){
			this.props.search && this.props.search.map((item, index)=> {
				this.setState({ [index]: {
					count: item.data.length,
					max: 8
				}});
			});
			console.log('seached', this.props.search);
			console.log('state', this.state);

			this.setState({ loaded: true });
		}
	}

	setCategoryKey(index, count){
		console.log('this');
		this.setState({
			[index]: {
				max: this.state[index] && this.state[index].max + 8
			}
		});
	}

	render() {
		return (
			<div className="container-fluid">
				<div className="row section">
					<div className={`content col-md-12 ${(this.props.filter_status == 'set_results_filter' || this.props.search_status == 'fetching_results') ? 'loading' : ''}`}>
						{this.props.search && this.props.search.map((item, index)=> {
							//console.log('two',this.state);
							if(item.data && item.data.length > 0){
								return (
									<div className='col-md-12 mb-5' key={item.id}>
										<h4 className="heading">{item.title} <span className="count">({item.data && item.data.length > 0 ? item.data.length : '0'})</span></h4> 
										<div className="row mb-4">
											{item.data && item.data.length > 0 ? item.data.map((rItem, rIndex)=> {
													return (
														<div className="col-md-4 col-lg-4" key={rItem.id} style={{ display: (rIndex >= (this.state[index] && this.state[index].max ? this.state[index].max : 8) ? 'none' : 'flex') }}>
															<Card layout='button' sponsored={rItem.sponsored} icon={true} icon_img={rItem.icon_img} title={rItem.title} tags={rItem.tags} description={rItem.description} category={rItem.category.title} url={rItem.url} link={window.location.protocol+'//'+window.location.hostname+'/resources/'+rItem.category.slug+'/'+rItem.slug} />
														</div>
													);
												}) : 
												 	
														<div className="col-md-12 py-5">
															<h4 className="heading-sub">No results.</h4>
														</div>
													
												
											}

											{item.data && item.data.length > 8 &&
												<div className="col-md-12 mx-auto mt-4 text-center">
													<a href="#" className="see-more" onClick={(e)=>{e.preventDefault(); this.setCategoryKey(index);  }}>See more...</a>
												</div>
											}
										</div>

									</div>
								)
							}
							else {
								return null;
							}
						})
						}
						
					</div>
				</div>
			</div>
		)
	}
}