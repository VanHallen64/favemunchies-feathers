import React, { Component } from 'react';
import client from './feathers';

class Restaurants extends Component {
    constructor(props) {
        super(props);

        this.state = {};

    }

    componentDidMount() {
        const restaurantService = client.service('restaurants');
        restaurantService.find({
            query: {
              $limit: 25
            }
        }).then( allrestaurants => {
            const restaurants = allrestaurants.data;
            this.setState({ restaurantService, restaurants });
        });

        const locationsService = client.service('locations');
        locationsService.find({
            query: {
              $limit: 25
            }
        }).then( allLocations => {
            const locations = allLocations.data;
            this.setState({ locationsService, locations });
        });
    
        // Remove a restaurant from the list
        restaurantService.on('removed', restaurant => {
            console.log("removed restaurant: " + restaurant.name );
            const currentRestaurants = this.state.restaurants.filter((deletedrestaurant,index,arr) => {
              return deletedrestaurant._id !== restaurant._id;
            });
            this.setState({ 
              restaurants: currentRestaurants
            }); 
        });
    
        // Add new restaurant to the list
        restaurantService.on('created', restaurant => this.setState({
            restaurants: this.state.restaurants.concat(restaurant)
        }));
    }

    render () {
        let content;
        if (!this.state.restaurants || !this.state.locations) {
            return (<h1>Loading...</h1>);
        } else if (this.state.restaurants.length < 1) {
            return (<h1>There are no restaurants in your list</h1>);
        }
        return (
            <div className="restaurants-content" id="restaurants-content">
                {/* Render only after restaurants has been initialized*/}
                {this.state.locations.map(location => <ul className="location-container" key={location._id}>
                    <h2>{location.name.toUpperCase()}</h2>
                    {this.state.restaurants.map(restaurant => <li key={restaurant._id}>{restaurant.name}
                        <button onClick={this.deleteRestaurant.bind(this, restaurant._id)} type="button" className="btn btn-danger">Delete</button>
                    </li>)}
                </ul>)}
            </div>
        );
    }
}

export default Restaurants;