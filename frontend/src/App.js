import React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
        <Router>
            <nav id="sidebar">
                <div className="sidebar-header">
                    <h1 id="page-title">Fave Munchies</h1>
                </div>
                <ul className="list-unstyled components">
                    <p id="menu-title">Menu</p>
                    <li className="nav-btn" id="ResList">
                        <Link className="p-2 text-dark" to="/books">Books</Link>
                    </li>
                    <li className="nav-btn" id="AddRes">
                        <a onClick={""} href="#" >Add Restaurant</a>
                    </li>
                    <li className="nav-btn" id="AddLoc">
                        <a onClick={""} href="#" >Add Location</a>
                    </li>
                </ul>
                <ul className="list-unstyled CTAs">
                    <li>
                        <a href="http://s000.tinyupload.com/download.php?file_id=95197881208836191904&t=9519788120883619190493819" className="download">Download Readme</a>
                    </li>
                </ul>
            </nav>
        </Router>
  );
}

export default App;
