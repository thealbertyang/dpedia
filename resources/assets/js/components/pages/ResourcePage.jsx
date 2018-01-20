import React from 'react';
import { BrowserRouter as Router, NavLink, Link } from 'react-router-dom';
import Navbar from '../Navbar'
import Footer from '../Footer'

export class ResourcesCreatePage extends React.Component {
	render(){
		return(
			<div className="page about">
				<Navbar/>
				<div className="main main__contact grid-container">
					<div className="grid-x grid-padding-x">
						<div className="medium-12 cell">
							<img src="/img/icon_heart.png" className="heading_icon" />
							<h5 className="heading-sub text-center">We're in private beta, but taking listings</h5>
							<h1 className="heading text-center">Increase your visibility in the diabetic community.</h1>
							<h1 className="heading text-center">Start your listing now.</h1>

							<form className="form form__contact">
								<div className="grid-x grid-padding-x">
									<div className="medium-4 cell">
										<label>Your Name
								          <input type="text" placeholder="John Smith" />
								        </label>
								    </div>
								   	<div className="medium-4 cell">
										<label>Resource Type
								          <input type="text" placeholder="A medical practice, an Iphone app, website etc.." />
								        </label>
								    </div>
								    <div className="medium-4 cell">
										<label>Resource URL (optional)
								          <input type="text" placeholder="www.example.com" />
								        </label>
								    </div>
								</div>
								<div className="grid-x grid-padding-x">
								    <div className="medium-4 cell">
										<label>Contact Phone No. (no spam)
								          <input type="text" placeholder="(213) 555-5555" />
								        </label>
								    </div>
								   	<div className="medium-4 cell">
										<label>Contact Email (no spam)
								          <input type="text" placeholder="youremail@youremail.com" />
								        </label>
								    </div>
								    <div className="medium-4 cell">
										<label>How Did You Find Us?
								          <input type="text" placeholder="Google Search, Colleague, etc" />
								        </label>
								    </div>
								</div>
								<div className="grid-x grid-padding-x align-center">
									<div className="cell medium-4">
										<button className="button" type="submit">Send Me Next Steps</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
				<Footer/>
			</div>
		);
	}
}