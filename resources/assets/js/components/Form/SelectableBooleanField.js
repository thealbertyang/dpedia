import React from 'react';
import Select, {Creatable} from 'react-select';

export default class SelectableBooleanField extends React.Component {
	constructor(props){
		super(props);
		this.state = { loaded: false };
	}

	findLabel = (value, options) => { 
		for(let i=0; i < options.length;i++){
		//console.log('finding label', value, this.props.options[i])

			if(options[i].value == value){
				//console.log('it equals and this is the label',  this.props.options[i].label)
				return options[i].label;
			}
		}
	}

	normalizeValue = (value, options) => {
		console.log('normalizing value', 'value', value, 'value.value', value.value)
		//if we have a value in a value then use value.value for value, and value.label for label
		if(value.value !== undefined && value.value !== null){
			console.log('we here first')
			return { value: value.value, label: value.label };
		}
		else if(value !== null){
		//console.log('we got only value', value, 'label', this.findLabel(value) )
		console.log('we at seconds', this.findLabel(value, options))
			return { value: value, label: this.findLabel(value, options) };
		}
	}

	componentWillMount(){
		console.log('we are remounting')
	}
	componentWillUnmount(){
		console.log('we unmounted boolean')
	}

	componentWillUpdate(){
		console.log('componet willUpdate')		
	}

	componentWillReceiveProps(nextProps){
		console.log(nextProps.input.name);
		
		//If we haven't loaded yet
		if(!this.state.loaded && nextProps.input.value !== null && nextProps.input.value !== "" && nextProps.options){
			console.log('we have options', nextProps.options, this.normalizeValue(nextProps.input.value, nextProps.options));
			//console.log('not loaded nextProps', nextProps)
			//console.log('NEXT PROPS INPUT VALUE', nextProps.input.value)
			//console.log('NORMALIZED VALUE', this.normalizeValue(nextProps.input.value))
			this.setState({ 
				loaded: true, 
				value: this.normalizeValue(nextProps.input.value, nextProps.options),
			});
			this.props.hookValue && this.props.hookValue(this.normalizeValue(nextProps.input.value, nextProps.options))
			this.props.input.onChange(this.normalizeValue(nextProps.input.value, nextProps.options));
		}
		else if(!this.state.loaded && this.props.input.value !== null && this.props.input.value !== "" && this.props.options){
			console.log('no next props but this props is avail')
		}
		else {
			console.log('we dont have options', this.props.options, nextProps, this.props)
		}
		/*else if(this.state.loaded){
			console.log('loaded nextProps', nextProps, this.normalizeValue(nextProps.input.value))
			this.props.input.onChange(this.normalizeValue(nextProps.input.value));

		}*/
	}


	changeValue = (value) => {
		this.setState({ 
			value: value,
		});
		console.log('CHANGED VALUE', this.normalizeValue(value, this.props.options), this.props.options)
		this.props.input.onChange(this.normalizeValue(value, this.props.options));
		this.props.hookValue && this.props.hookValue(this.normalizeValue(value, this.props.options))
	}

	render(){
		console.log('THIS STATE', this.state, this.props)
		const { input, label, meta: { touched, error }, errors, children, options, placeholder, clearable } = this.props;

		return (
			<div className='form-group'>
				<label>
				  {label}
				</label>
				<Select
					{...input}
					value={this.state.value}
					clearable={false}
					options = {options}
					placeholder = {placeholder}
					onBlur = {()=>{/*console.log('input value', input.value); input.onBlur(input.value);*/ }}
					onChange={(e)=>{ //console.log('event check change', e); 
					this.changeValue(e.value)}} 
					className={`form-control ${errors && 'is-invalid'}`}

				/>
				{errors && <small className={errors && 'invalid-feedback'}>{errors}</small>}
				{touched && error &&
				<span>
					{error}
				</span>}
			</div>
		)
	}
}
