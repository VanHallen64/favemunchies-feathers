import React, { Component } from 'react';
import client from './feathers';
import $ from 'jquery';

class AddRestaurant extends Component {
    constructor(props) {
        super(props);

        this.state = {
            restaurantClass: 'form-control form-control-lg',
            errorMessage: 'A valid location name is required',
            formValidationClass: ''
        };

    }

    componentDidMount() {
        const locationService = client.service('locations');
        const restaurantService = client.service('restaurants');

        this.setState({ restaurantService });

        locationService.find({
            query: {
                $limit: 25
            }
        }).then(allLocations => {
            const locations = allLocations.data;
            this.setState({ locationService, locations });
        });


        // Remove a location from the list
        locationService.on('removed', location => {
            console.log("removed id: " + location._id);
            const newlocations = this.state.locations.filter((deletedlocation, index, arr) => {
                return deletedlocation._id !== location._id;
            });
            this.setState({
                locations: newlocations
            });
        });
    }

    addRestaurant(ev) {
        const inputName = ev.target.querySelector('[id="resName"]');
        const inputLocation = ev.target.querySelector('[id="location"]');
        const name = inputName.value.trim();
        const locationName = inputLocation.value.trim();

        const locationFound = this.state.locations.find(location => {
            return location.name == locationName;
        });

        if (ev.target.checkValidity()) {
            this.state.restaurantService.create({
                name,
                location: locationFound._id
            })
            .then(() => {
                console.log("Created new restaurant: " + name);
                this.setState({
                    restaurantClass: 'form-control form-control-lg',
                    errorMessage: 'A valid restaurant name is required',
                    formValidationClass: ''
                });
                this.showAlert(ev);
            })
            .catch(error => {
                this.setState({
                    restaurantClass: 'form-control form-control-lg is-invalid',
                    errorMessage: error.message,
                    formValidationClass: ''                    
                });
            });
        } else {
            this.setState({
                restaurantClass: 'form-control form-control-lg',
                errorMessage: 'A valid restaurant name is required',
                formValidationClass: 'was-validated'
            });
        }

        inputName.value = '';

        ev.preventDefault();
        ev.stopPropagation();
    }

    deleteLocation(id, ev) {
        this.state.locationService.remove(id);
    }

    showAlert() {
        $(".alert-success").slideDown().show();
    }

    hideAlert() {
        $(".alert-success").slideUp().hide(1000);
    }

    render() {
        return (
            <div>
                <form id="form" className={"form-container needs-validation " + this.state.formValidationClass} onSubmit={this.addRestaurant.bind(this)} noValidate>
                    <p className="description">Add your favourite restaurants.</p>
                    <div className="form-group">
                        <label htmlFor="resName" className="form-subtitle form-control-label">Enter restaurant name:</label>
                        <input id="resName" className={this.state.restaurantClass} type="text" placeholder="Enter restaurant name" pattern="[A-Za-z ]{1,30}" required/>
                        <div className="invalid-feedback alert-danger">
                            {this.state.errorMessage}
                        </div>
                        <div className="alert alert-success alert-dismissible fade show" role="alert">
                            Restaurant added
                            <button type="button" className="close" onClick={this.hideAlert} data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="location" className="form-subtitle">Choose a location:</label>
                        <select id="location" className="form-control form-control-lg">
                            <option value=''>None</option>
                            {this.state.locations && this.state.locations.map(location=><option key={location.name} value={location.name}>{location.name}</option>)}
                        </select>
                    </div>
                    <button className="btn btn-dark" type='submit' value='Submit restaurant'> Submit restaurant</button>
                </form>
            </div>
        );
    }
}

export default AddRestaurant;