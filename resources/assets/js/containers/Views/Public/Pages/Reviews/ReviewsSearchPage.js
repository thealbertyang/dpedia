import React from 'react';
import { connect } from "react-redux"
import store from "../../../../../store"
import Footer from '../../../../../components/Footer'
import { Redirect, Link, withRouter } from 'react-router-dom'

import SlideNavbarWrapper from '../../Layouts/SlideNavbarWrapper'

import crudActions from '../../../../../actions/crudActions'

import Select, {Creatable} from 'react-select';
import { FilterSidebar } from './FilterSidebar'
import { ResourcesList } from '../../Layouts/ResourcesList'
import Autosuggest from 'react-autosuggest';
import axios from 'axios'

let reviewsCategoriesCrudActions = new crudActions('REVIEWS_CATEGORIES','reviews_categories');
let reviewsCrudActions = new crudActions('REVIEWS','reviews');

@connect((store) => {
	return {
		reviews: store.reviews,
		reviews_categories: store.reviews_categories,
	}
})
export class ReviewsSearchPage extends React.Component {
	constructor(props){
		super(props);
		this.state = { isActiveNav: false, scrollTop: 0, value: '', suggestions: [], isLoading: false, mobileFilter: false, 'select_all': { value: true, id: 'all' }};
	}

	componentWillMount(){
		this.props.dispatch(reviewsCategoriesCrudActions.getAll());
		this.props.dispatch(reviewsCrudActions.getAll());
	}

	componentDidMount(){
		window.addEventListener('scroll', this.handleScroll);
	}

	componentWillUnmount(){
		window.removeEventListener('scroll', this.handleScroll);
	}

	handleScroll = (event) => {
		let scrollTop = event.srcElement.documentElement.scrollTop || window.pageYoffset || event.srcElement.body.scrollTop;
        this.setState({ scrollTop: scrollTop });
	}

	mobileFilterToggle = () => {
		console.log('1', this.state.mobileFilter);
		this.setState({ mobileFilter: this.state.mobileFilter === true ? false : true });
		console.log('2', this.state.mobileFilter);

	}

	escapeRegexCharacters = (str) => {
		return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	}

	getMatchingLanguages = (value) => {
		const escapedValue = this.escapeRegexCharacters(value.trim());

		if (escapedValue === '') {
			return [];
		}

		const regex = new RegExp('^' + escapedValue, 'i');

		return languages.filter(language => regex.test(language.name));
	}

	loadSuggestions(value) {
		this.setState({
		  isLoading: true
		});

		axios.get('/api/reviews?page=all')
		.then((response)=>{
			response = response.data.map((item, key)=>{
				return {
					value: item.id,
					title: item.title
				}
			});
			//console.log(response)

			const escapedValue = this.escapeRegexCharacters(value.trim());
			let suggestions = [];

			if (escapedValue !== '') {
				const regex = new RegExp('^' + escapedValue, 'i');
				//console.log('we in here', regex)
				suggestions = response.filter(response => regex.test(response.title));

				//console.log(suggestions)

			}

			console.log(suggestions)

			this.setState({
				isLoading: false,
				suggestions: suggestions
			});
				
		})
		.catch((err) => { 
		})
		  

	}

	onChange = (event, { newValue }) => {
		this.setState({
		  value: newValue
		});
	};

	// Autosuggest will call this function every time you need to update suggestions.
	// You already implemented this logic above, so just use it.
	onSuggestionsFetchRequested = ({ value }) => {
		this.loadSuggestions(value);
	};

	// Autosuggest will call this function every time you need to clear suggestions.
	onSuggestionsClearRequested = () => {
		this.setState({
		  suggestions: []
		});
	};

	// When suggestion is clicked, Autosuggest needs to populate the input
	// based on the clicked suggestion. Teach Autosuggest how to calculate the
	// input value for every given suggestion.
	getSuggestionValue = (suggestion) => suggestion.title;

	// Use your imagination to render suggestions.
	renderSuggestion = (suggestion) => (
	  <div>
	    {suggestion.title}
	  </div>
	);

	render(){
			const { value, suggestions, isLoading } = this.state;

	    // Autosuggest will pass through all these props to the input.
	const inputProps = {
	  placeholder: 'Ex. Apps, Drugs, CGM, etc...',
	  value,
	  onChange: this.onChange
	};

		console.log(this.props);
		return (
			<div className="page reviews">
				<div className={`mobile-btn ${this.state.mobileFilter == true ? 'isActive' : ''}`} onClick={()=>{this.mobileFilterToggle(); console.log('test', this.state.mobileFilter); }}>
					Filter Results
				</div>
				<div className={`side col-md-2 ${this.state.scrollTop >= 100 ? 'isActive' : ''}`}>
					<div className="row">
						<FilterSidebar isActive={this.state.mobileFilter} />
					</div>
				</div>
				<SlideNavbarWrapper>
				<div className="body">
					<div className="row no-gutters" style={{ flex: '1 1'}}>
						<div className='side-container d-none d-sm-none d-md-none d-lg-block col-lg-2'>
							<div className="row">
								<div className="col-md-12">
									
								</div>
							</div>
						</div>
						<div className='col-md-12 col-lg-10'>
							<div className="section mt-5">
								<div className="container-fluid">
									<div className="row text-center">
										<div className="col">
											<h3 className="heading my-3 fw-600">
												Find Diabetes Resources
											</h3>
											<form className="form form__search" onSubmit={(e)=>{e.preventDefault(); 
												console.log('SEARCH WAS CLICKED',this.props.filter, this.state.value); 
												this.props.dispatch(reviewsCrudActions.search(this.state.value));
											}}>	
												<div className="reviews-search col-md-8 col-lg-8 mx-auto">
														<Autosuggest
															suggestions={suggestions}
															onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
															onSuggestionsClearRequested={this.onSuggestionsClearRequested}
															getSuggestionValue={this.getSuggestionValue}
															renderSuggestion={this.renderSuggestion}
															inputProps={inputProps}
														/>
														<input type="submit" className="btn btn-primary" value="Search" />
												</div>
											</form>
										</div>
									</div>
								</div>
							</div>
							<ResourcesList 
								title="Recent Reviews" 
								type="reviews" 
								records={this.props.reviews.records && this.props.reviews.records.filter((item)=>{
									if(item.status == 'published'){
										return item;
									}
								})}
								category_records={this.props.reviews_categories.records}
							/>
						</div>
					</div>
				</div>
				<Footer/>
				</SlideNavbarWrapper>
			</div>
		);
	}
}

export default withRouter(ReviewsSearchPage);
