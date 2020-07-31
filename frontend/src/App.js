import React, {useState, useEffect} from 'react';
import client from './feathers';
import './App.css';

import {
	BrowserRouter as Router,
	Switch,
	Route,
	NavLink
} from "react-router-dom";

import Loading from './Loading';
import Login from './Login';
import Home from './Home';
import Restaurants from './Restaurants';
import AddLocation from './AddLocation';
import AddRestaurant from './AddRestaurant';


function App() {
	const [loginState, setLogin] = useState(undefined);
	
	useEffect(() => {
		// Try to authenticate with the JWT stored in localStorage
		client.authenticate().catch(() => setLogin(null));

		// On successfull login ...
		client.on('authenticated', login => {
			// ... update the state
			setLogin(login);
		});
	});

	if ( loginState === undefined) {
		return(<Loading />);
	} else if ( loginState ) {
		return (
			<Router>
				<nav id="sidebar">
					<div className="sidebar-header">
						<h1 id="page-title"><NavLink to="/">Fave Munchies</NavLink></h1>
					</div>
					<ul className="list-unstyled components">
						<p id="menu-title">Menu</p>
						<li className="nav-btn">
							<NavLink to="/restaurants" activeClassName="selected">Restaurants</NavLink>
						</li>
						<li className="nav-btn">
							<NavLink to="/add-restaurant" activeClassName="selected">Add Restaurant</NavLink>
						</li>
						<li className="nav-btn">
							<NavLink to="/add-location" activeClassName="selected">Add Location</NavLink>
						</li>
					</ul>
					<ul className="list-unstyled CTAs">
						<li>
							<a href="http://s000.tinyupload.com/download.php?file_id=95197881208836191904&t=9519788120883619190493819" className="download">Download Readme</a>
						</li>
					</ul>
				</nav>
				<div id="content">
					<Switch>
						<Route exact path="/">
							<Home />
						</Route>
						<Route exact path="/restaurants">
							<Restaurants />
						</Route>
						<Route exact path="/add-restaurant">
							<AddRestaurant />
						</Route>
						<Route exact path="/add-location">
							<AddLocation />
						</Route>
					</Switch>
				</div>
			</Router>
		);
	}
	return(<Login />);
}

export default App;
