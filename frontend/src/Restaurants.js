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
              $limit: 25,
              $populate: ['location']
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

    renderRestaurants(element) {       
        let locationContainers = this.state.locations.reduce((result, location) => {
            let restaurantsInLocation = this.state.restaurants.filter(restaurant => {
                return location.name == restaurant.location.name;
            });
            let container = <ul className="location-container list-group" key={location._id}>
                <h2>{location.name}</h2>
                {restaurantsInLocation.map(restaurant => <li key={restaurant._id} className="list-group-item">
                    {restaurant.name}
                    <button onClick={event=>this.deleteRestaurant(event, restaurant._id)} type="button" className="btn btn-default btn-xs pull-right">
                        <span class="glyphicon glyphicon-remove"></span>
                    </button>
                </li>)}
            </ul>
            if (restaurantsInLocation.length > 0) {
                result.push(container);
            }
            return result;
        }, []);
        return locationContainers;
    }

    deleteRestaurants(id, ev) {
        this.state.locationService.remove(id);
    }

    render () {
        if (!this.state.restaurants || !this.state.locations) {
            return (<h1 id="loading-restaurants">Loading...</h1>);
        } else if (this.state.restaurants.length < 1) {
            return (<h1 id="no-restaurants">There are no restaurants in your list</h1>);
        }
        return (
            <div className="restaurants-content" id="restaurants-content">
                {/* Render only after restaurants has been initialized*/}
                {this.renderRestaurants()}
            </div>
        );
    }
}

export default Restaurants;