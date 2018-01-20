import React from 'react';
import Select, {Creatable} from 'react-select';

export default class SelectableBooleanField extends React.Component {
	constructor(props){
		super(props);
		this.state = { loaded: false };
	}

	findLabel = (value) => { 
		for(let i=0; i < this.props.options.length;i++){
		//console.log('finding label', value, this.props.options[i])

			if(this.props.options[i].value == value){
				//console.log('it equals and this is the label',  this.props.options[i].label)
				return this.props.options[i].label;
			}
		}
	}

	normalizeValue = (value) => {
		//console.log('normalizing value', 'value', value, 'value.value', value.value)
		if(value !== null){
		//console.log('we got only value', value, 'label', this.findLabel(value) )

			return { value: value, label: this.findLabel(value) };
		}
	}

	componentWillReceiveProps(nextProps){

		//console.log('SelectableBooleanField loaded', nextProps, this.normalizeValue(nextProps.input.value))
		//If we haven't loaded yet
		if(!this.state.loaded && nextProps.input.value !== null && nextProps.input.value !== ""){

			//console.log('not loaded nextProps', nextProps)
			//console.log('NEXT PROPS INPUT VALUE', nextProps.input.value)
			//console.log('NORMALIZED VALUE', this.normalizeValue(nextProps.input.value))
			this.setState({ 
				loaded: true, 
				value: this.normalizeValue(nextProps.input.value),
			});

			this.props.input.onChange(this.normalizeValue(nextProps.input.value));
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
		//console.log('CHANGED VALUE', this.normalizeValue(value))
		this.props.input.onChange(this.normalizeValue(value));
		
	}

	render(){
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
