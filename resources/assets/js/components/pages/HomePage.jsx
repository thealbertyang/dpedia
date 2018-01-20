import React from 'react';
import { connect } from "react-redux"
import store from "../../store"
import Navbar from "../Navbar"
import SlideNav from "../SlideNav"
import Footer from '../Footer'
import Card from '../Card'
import SlideNavbarWrapper from '../layout/SlideNavbarWrapper'
import Select, { AsyncCreatable } from 'react-select';
import { Form, Field, reduxForm, SubmissionError, formValueSelector } from 'redux-form'
import { getResources, submitForm, update, clearStatus } from '../../actions/resourcesActions'
import { getResults } from '../../actions/searchActions'
import { HomeSearchResults } from '../HomeSearchResults'
import axios from 'axios'
import Cookies from 'universal-cookie'
import { FilterSidebar } from '../FilterSidebar'
import Autosuggest from 'react-autosuggest';
import ReactGA from 'react-ga';

const languages = [
  {
    name: 'C',
    year: 1972
  },
  {
    name: 'C#',
    year: 2000
  },
  {
    name: 'C++',
    year: 1983
  },
  {
    name: 'Clojure',
    year: 2007
  },
  {
    name: 'Elm',
    year: 2012
  },
  {
    name: 'Go',
    year: 2009
  },
  {
    name: 'Haskell',
    year: 1990
  },
  {
    name: 'Java',
    year: 1995
  },
  {
    name: 'Javascript',
    year: 1995
  },
  {
    name: 'Perl',
    year: 1987
  },
  {
    name: 'PHP',
    year: 1995
  },
  {
    name: 'Python',
    year: 1991
  },
  {
    name: 'Ruby',
    year: 1995
  },
  {
    name: 'Scala',
    year: 2003
  }
];

function getMatchingLanguages(value) {
  const escapedValue = escapeRegexCharacters(value.trim());
  
  if (escapedValue === '') {
    return [];
  }
  
  const regex = new RegExp('^' + escapedValue, 'i');

  return languages.filter(language => regex.test(language.name));
}

/* ----------- */
/*    Utils    */
/* ----------- */

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}



const renderSearchField = ({ input, label, meta: { touched, error, onChange, onBlur }, errors, children, options }) => {

return (<div className={errors ? 'has-danger' : ''}>
	<AsyncCreatable
		{...input}
	  //options={options}
	  placeholder={label}
	  onBlur={(e)=>{input.onBlur(input.value); console.log(e, input.value);}}
	  onChange={(e)=>{console.log(e); input.onChange(e);}}
	  onSubmit={(e)=>{console.log('test')}}
	  loadOptions={()=>{	
	  	const cookies = new Cookies();
		return axios.get('/api/resources?token='+cookies.get('token')+'&page=all')
		.then((response)=>{
			response = { options: response.data.map((item, key)=>{
				return {
					value: item.id,
					label: item.title
				}
			}) } ;

			return response;
			
		})
		.catch((err) => { 
		})
	}}
	/>
</div>)

}


@connect((store) => {
	return {
		search: store.search.results,
		search_status: store.search.status,
		filter: store.search.filter,
		searchTerm: store.search.searchTerm,
		searchCount: store.search.searchCount,
		filter_status: store.search.filter_status,
		resources: store.resources.resources,
		auth: store.auth.authenticated,
		status: store.auth.status
	}
})
export class HomePage extends React.Component {
	constructor(props){
		super(props)
		this.state = { isActiveNav: false, scrollTop: 0, value: '', suggestions: [], isLoading: false, mobileFilter: false };
		this.navbarToggle = this.navbarToggle.bind(this);
		this.handleScroll = this.handleScroll.bind(this);
	}

	componentWillMount(){
		this.props.match.params.search ? this.props.dispatch(getResults(this.props.match.params.search)) : this.props.dispatch(getResults('all',null,true));
	}

	componentDidMount(){
		window.addEventListener('scroll', this.handleScroll);
	}

	componentWillUnmount(){
		window.removeEventListener('scroll', this.handleScroll);
	}

	handleScroll(event){
		let scrollTop = event.srcElement.documentElement.scrollTop || window.pageYoffset || event.srcElement.body.scrollTop;
        this.setState({ scrollTop: scrollTop });
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});

	}

	login(e){
		this.props.dispatch(login(this.state.email, this.state.password, this.props.loggedInPath));
		e.preventDefault();
	}

	navbarToggle(){
		this.setState({ isActiveNav: this.state.isActiveNav == true ? false : true });
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

		axios.get('/api/resources?token=&page=all')
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

	mobileFilterToggle(){
		console.log('1', this.state.mobileFilter);
		this.setState({ mobileFilter: this.state.mobileFilter === true ? false : true });
		console.log('2', this.state.mobileFilter);

	}

	render(){
		//console.log(this.props);
	const { value, suggestions, isLoading } = this.state;

	    // Autosuggest will pass through all these props to the input.
	const inputProps = {
	  placeholder: 'Ex. Apps, Drugs, CGM, etc...',
	  value,
	  onChange: this.onChange
	};


		return (
			<div className="page home">
				<div className={`mobile-btn ${this.state.mobileFilter == true ? 'isActive' : ''}`} onClick={()=>{this.mobileFilterToggle(); console.log('test', this.state.mobileFilter); }}>
							Filter Results
						</div>
				<div className={`side col-md-2 ${this.state.scrollTop >= 100 ? 'isActive' : ''}`}>
					
					<div className="row">
						<FilterSidebar isActive={this.state.mobileFilter} />
						
					</div>
				</div>
				<div className={`loader-overlay col-md-10 ${(this.props.filter_status == 'set_results_filter' || this.props.search_status == 'fetching_results') ? 'loading' : ''}`}>
				</div>
				<SlideNavbarWrapper>
					<div className="main__container row no-gutters">
						<div className='side-container hidden-md-down col-lg-2'>
							<div className="row">
								<div className="col-md-12">
								</div>
							</div>
						</div>
						<div className={`content-container col-md-12 col-lg-10 ${(this.props.filter_status == 'set_results_filter' || this.props.search_status == 'fetching_results') ? 'loading' : ''}`}>
							<div className="main__header container-fluid">
								<div className="row align-center text-center">
									<div className="col-md-10 m-auto">
										<h1 className="heading mt-2">Find Diabetes Resources</h1>
										<form className="form form__search" onSubmit={(e)=>{e.preventDefault(); 
																							console.log('SEARCH WAS CLICKED',this.props.filter); 
																							this.props.dispatch(getResults(this.state.value, this.props.filter)); 
																							ReactGA.event({
																							  category: 'Search',
																							  action: 'Submit',
																							  label: this.state.value
																							});
																						}}>	
											<div className="row no-gutters align-center text-center mt-2">
												<div className="search-container col-md-9 col-lg-9">
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
												<div className="col-md-12 share_results">
													{/*<input id="checkbox1" type="checkbox" /><label htmlFor="checkbox1">Results near me</label> &nbsp; &nbsp; <a href="#" className="text-center">Share results</a>*/}
												</div>
											</div>
										</form>
									</div>
									<div className="col-md-8 mt-4">
										{this.props.searchTerm && <p className="h5 text-center"><i className="fa fa-search"></i> {this.props.searchCount} Results for <span className="highlight">"{this.props.searchTerm}"</span></p>}
									
										
									</div>
								</div>
							</div>
							<div className="main__body">
								<HomeSearchResults />
							</div>
						</div>
					</div>
						<Footer/>
					</SlideNavbarWrapper>
				
			</div>
		);
	}
}

const selector = formValueSelector('search')

HomePage = connect(store => { 
	let searchTerm = selector(store, 'search');

	return {
		searchTerm
	}
})(reduxForm({form: 'search', enableReinitialize: true})(HomePage));
export default HomePage;