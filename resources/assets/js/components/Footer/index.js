import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter as Router, NavLink, Link, Switch, withRouter } from "react-router-dom";


export default class Footer extends React.Component {

  constructor(props){
    super(props);
  }

  render(){
    return (
        <div className="footer">
            <div className="row">
              <div className="col-12 text-center">
                  <span>Diabetespedia powered by</span> <img src="/img/logo_doctorpedia_white.svg" /> <span> &copy; 2017 Doctorpedia. All rights reserved. Doctorpedia does not provide medical advice, diagnosis or treatment.</span>
              </div>
            </div>
        </div>
    )
  }
}
