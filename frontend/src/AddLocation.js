import React, { Component } from 'react';
import client from './feathers';
import $ from 'jquery';

class AddLocation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            locationClass: 'form-control form-control-lg',
            errorMessage: 'A valid location name is required',
            formValidationClass: ''
        };
    }

    componentDidMount() {
        const locationService = client.service('locations');
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

        // Add new location to the location list
        locationService.on('created', location => this.setState({
            locations: this.state.locations.concat(location)
        }));
    }

    addLocation(ev) {
        const inputName = ev.target.querySelector('[id="locName"]');
        const name = inputName.value.trim();

        if (ev.target.checkValidity()) {
            this.state.locationService.create({
                name: name
            })
            .then(() => {
                console.log("Created new location: " + name);
                this.setState({
                    locationClass: 'form-control form-control-lg',
                    errorMessage: 'A valid location name is required',
                    formValidationClass: ''
                });
                this.showAlert();
            })
            .catch(error => {
                this.setState({
                    locationClass: 'form-control form-control-lg is-invalid',
                    errorMessage: error.message,
                    formValidationClass: ''                    
                });
            });
        } else {
            this.setState({
                locationClass: 'form-control form-control-lg',
                errorMessage: 'A valid location name is required',
                formValidationClass: 'was-validated'
            });
        }

        inputName.value = '';

        ev.preventDefault();
        ev.stopPropagation();
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
                <form className={"form-container needs-validation " + this.state.formValidationClass} onSubmit={this.addLocation.bind(this)} noValidate>
                    <p className="description">Add your favorite restaurants here.</p>
                    <div>
                        <label htmlFor="locName" className="form-subtitle form-control-label">Enter location name:</label>
                        <input id="locName" className={this.state.locationClass} type="text" placeholder="Enter location name" pattern="[A-Za-z ]{1,30}" required/>
                        <div className="invalid-feedback alert-danger">
                            {this.state.errorMessage}
                        </div>
                        <div className="alert alert-success alert-dismissible fade show" role="alert">
                            Location added
                            <button type="button" className="close" onClick={this.hideAlert} data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        </div>
                    </div>
                    <button className="btn btn-dark" type='submit' value='Submit location'> Submit location</button>
                </form>
            </div>
        );
    }
}

export default AddLocation;