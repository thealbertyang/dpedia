import * as React from "react";
import { BrowserRouter as Router, NavLink, Link, Switch, withRouter } from "react-router-dom";


export class SlideNav extends React.Component {
  constructor(props){
    super(props);
    this.state = { isActive: false };
    this.toggle = this.toggle.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);           
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
      document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
      document.removeEventListener('mousedown', this.handleClickOutside);
  }


  setWrapperRef(node) {
      this.wrapperRef = node;
  }

  handleClickOutside(event) {
      if (this.wrapperRef && !this.wrapperRef.contains(event.target) && this.state.isActive) {
          this.toggle();
      }
  }

  toggle(){
    this.setState({ isActive: this.state.isActive == true ? false : true });
  }


  render(){
    return (
      <nav className={`${this.props.isActive ? 'isActive' : ''} off-canvas-navbar navbar navbar-light`}>
          <ul className="navbar-nav mr-auto">
            <li><NavLink exact to="/curious-about" className="nav-link">Curious About</NavLink></li>
            <li><NavLink exact to="/living-with" className="nav-link">Living With</NavLink></li>
            <li><NavLink exact to="/preventive-care" className="nav-link">Preventive Care</NavLink></li>
            <li><NavLink exact to="/alternative-care" className="nav-link">Alternative Care</NavLink></li>
          </ul>
          <ul className="navbar-nav">
          </ul>
      </nav>
    )
  }
}


