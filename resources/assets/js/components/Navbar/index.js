import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter as Router, NavLink, Link, Switch, withRouter } from "react-router-dom";
import { loggedIn, login, logout } from '../../actions/authActions'
import { menuActivate } from '../../actions/menuActions'

import { connect } from "react-redux"
import store from "../../store"



@connect(
  (store) => { 
  return {
    authenticated: store.auth.authenticated,
    username: store.auth.username
  }
})
export class Navbar extends React.Component {
  constructor(props){
    super(props);
    this.state = { isActive: false };
    this.toggle = this.toggle.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);           
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.navbarToggle = this.navbarToggle.bind(this)
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

  navbarToggle(){
    this.props.navbarToggle();
  }

  search = (term) => {

    console.log('test stuff', this.refs);
      window.location.href = "/search/"+this.refs.search.value;
  }

  render(){
    return (
      <nav className="navbar navbar-expand-md">
        <a href="/" className="nav-link navbar-brand"><img src="/img/logo_diabetespedia.svg" className="logo" /><span className="slogan">Healthcare in your hands. <sup>&trade;</sup></span></a>        
        <a onClick={()=>this.navbarToggle()} className="navbar-toggler">
          <span className="navbar-toggler-icon"></span>
        </a>
        <div className={`${this.state.isActive ? '' : 'collapse'} navbar-collapse`} id="navbarSupportedContent" ref={this.setWrapperRef}>
          <ul className="navbar-nav mr-auto">
            <li><NavLink exact to="/curious-about" className="nav-link">Curious About Diabetes</NavLink></li>
            <li><NavLink exact to="/living-with" className="nav-link">Living With Diabetes</NavLink></li>
            <li><NavLink exact to="/preventive-care" className="nav-link">Preventive Care</NavLink></li>
            <li><NavLink exact to="/alternative-care" className="nav-link">Alternative Care</NavLink></li>
            <li><NavLink exact to="/experts" className="nav-link">Our Experts</NavLink></li>
          </ul>
          <ul className="navbar-nav mr-auto">
           
          </ul>
          <ul className="navbar-nav">
             <li className="d-flex align-items-center"><NavLink exact to="/reviews" className="btn btn-primary btn-round btn-resource">Reviews</NavLink></li>
             <li style={{ marginLeft: '1rem' }}>
              <form className="form-group form-inline my-2">
                <div className="search-group">
                  <form onSubmit={(e)=>{e.preventDefault(); this.search(e);}}>
                    <input className="form-control input-search mr-sm-2" type="text" placeholder="Search" ref="search" />
                  </form>
                </div>
              </form>
              </li>
          </ul>
        </div>
      </nav>
    )
  }
}

function mapStateToProps(state){
  //console.log("state",state);
  return {
    auth: {
      authenticated: state.auth.authenticated,
      username: state.auth.username
    },
    menu: state.menu.pathname
  }
}

export default withRouter(connect(mapStateToProps)(Navbar));
