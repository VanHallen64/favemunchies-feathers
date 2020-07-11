import React from 'react';
//import './App.css';

import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";

import Home from './Home';
import Restaurants from './Restaurants';
import AddLocation from './AddLocation';
import AddRestaurant from './AddRestaurant';

function App() {
	return (
		<Router>
			<div>
				<div>
					<nav id="sidebar">
						<div className="sidebar-header">
							<h1 id="page-title"><Link to="/">Fave Munchies</Link></h1>
						</div>
						<ul className="list-unstyled components">
							<p id="menu-title">Menu</p>
							<li className="nav-btn">
								<Link className="p-2 text-dark" to="/restaurants">Restaurants</Link>
							</li>
							<li className="nav-btn">
								<Link className="p-2 text-dark" to="/add-restaurant">Add Restaurant</Link>
							</li>
							<li className="nav-btn">
								<Link className="p-2 text-dark" to="/add-location">Add Location</Link>
							</li>
						</ul>
						<ul className="list-unstyled CTAs">
							<li>
								<a href="http://s000.tinyupload.com/download.php?file_id=95197881208836191904&t=9519788120883619190493819" className="download">Download Readme</a>
							</li>
						</ul>
					</nav>
				</div>
				<div id="content">
					<Switch>
						<Route path="/">
							<Home />
						</Route>
						<Route path="/restaurants">
							<Restaurants />
						</Route>
						<Route path="/add-restaurants">
							<AddRestaurant />
						</Route>
						<Route path="/add-location">
							<AddLocation />
						</Route>
					</Switch>
				</div>
			</div>
		</Router>
	);
}

export default App;
