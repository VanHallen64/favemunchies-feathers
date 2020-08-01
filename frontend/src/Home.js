import React, { Component } from 'react';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {};

    }

    render () {
        return (
            <div style={{display: "inline-block", marginTop: "200px", textShadow: "-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000"}}>
                <h1>Welcome to</h1>
                <h1 className="page-title" style={{fontSize: "5rem", color: "grey"}}>Fave Munchies</h1>
            </div>
        );
    }
}

export default Home;