import React, { Component } from 'react';
import client from './feathers';
import { authentication } from '@feathersjs/client';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {};

    }

    render () {
        return (
            <div>
                <h1>Welcome to</h1>

            </div>
        );
    }
}

export default Home;