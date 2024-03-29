import React, {useState, useEffect} from 'react';
import client from './feathers';
import $ from 'jquery';
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

function signOut() {
	client.logout();
	window.location.reload(false);
}

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

	$(document).ready(function () {
		$('#sidebarCollapse').on('click', function () {
			$('#sidebar').toggleClass('active');
			$(this).toggleClass('active');
		});
	});
	

	if ( loginState === undefined) {
		return(<Loading />);
	} else if ( loginState ) {
		return (
			<Router>
				<div className="wrapper">
					<nav id="sidebar">
						<div className="sidebar-header">
							<h1 className="page-title"><NavLink to="/">Fave Munchies</NavLink></h1>
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
						<ul className="list-unstyled">
							<li>
								<button onClick={signOut} className="btn btn-primary">Sign Out</button>
							</li>
						</ul>
					</nav>
					<div className="mobile-sidebar">
						<button type="button" id="sidebarCollapse" className="nav-close-btn">
							<span></span>
							<span></span>
							<span></span>
						</button>
					</div>
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
				</div>
			</Router>
		);
	}
	return(<Login />);
}

export default App;
