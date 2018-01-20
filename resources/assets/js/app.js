import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import Routes from "./containers/Routes"

import store from "./store"

const app = document.getElementById('root')

ReactDOM.render(
<Provider store={store}>
	<Routes/>
</Provider>, app);