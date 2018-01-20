import React from 'react';
import Navbar from "../../../../components/Navbar"
import { SlideNav } from "../../../../components/SlideNav"
import Footer from '../../../../components/Footer'
import Card from '../../../../components/Card'


export default class SlideNavbarWrapper extends React.Component {
	constructor(props){
		super(props)
		this.state = { isActiveNav: false };
		this.updateDimensions = this.updateDimensions.bind(this);
	}

    updateDimensions() {
	    let w = window,
	        d = document,
	        documentElement = d.documentElement,
	        body = d.getElementsByTagName('body')[0],
	        width = w.innerWidth || documentElement.clientWidth || body.clientWidth,
	        height = w.innerHeight|| documentElement.clientHeight|| body.clientHeight;

	        this.setState({width: width, height: height});

	        if(width >= 992){
	        	this.setState({isActiveNav: false});
	        }
    }

    componentWillMount() {
        this.updateDimensions();
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

	navbarToggle(){
		this.setState({ isActiveNav: this.state.isActiveNav == true ? false : true });
	}

	render(){
		return (
			<div className="off-canvas-wrapper">
				<SlideNav isActive={this.state.isActiveNav} />
				<div className={`${this.state.isActiveNav ? 'isActive' : ''} off-canvas-header`}>
					<Navbar navbarToggle={()=>this.navbarToggle()} />
				</div>
				<div className={`${this.state.isActiveNav ? 'isActive' : ''} off-canvas-content`}>
					{this.props.children}	
				</div>
			</div>
		);
	}
}