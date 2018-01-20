import React from "react"
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import { HomePage } from "./HomePage";
import { ResourcesPage } from "./ResourcesPage";

export class FindResourcesPage extends React.Component {
	render() {
		return (
			<Switch>
				<Route path='/' component={HomePage} />
				<Route path='/resources' exact component={ResourcesPage} />
			</Switch>
		);
	}
}
