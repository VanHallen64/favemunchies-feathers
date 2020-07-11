import React, { Component } from 'react';
import client from './feathers';

class AddLocation extends Component {
    constructor(props) {
        super(props);

        this.state = {};

    }

    componentDidMount() {
        console.log("mounted")
        const locationService = client.service('locations');
        locationService.find({
            query: {
              $limit: 25
            }
        }).then( allLocations => {
            const locations = allLocations.data;
            this.setState({ locationService, locations });
        });
    
        // Remove a location from the list
        locationService.on('removed', location => {
            console.log("removed id: " + location._id );
            const newlocations = this.state.locations.filter((deletedlocation,index,arr) => {
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
    
      addlocation(ev) {
        console.log(ev);
        // const inputISBN = ev.target.querySelector('[id="isbn"]');
        // const isbn = parseInt( inputISBN.value.trim() );
    
        // const inputTitle = ev.target.querySelector('[id="title"]');
        // const title = inputTitle.value.trim();
    
        // const inputPages = ev.target.querySelector('[id="pages"]');
        // const pages = parseInt( inputPages.value.trim() );
    
        // console.log( "ISBN: " + isbn );
        // console.log( "Title: " + title );
        // console.log( "Pages: " + pages );
    
        // this.state.locationService.create({
        //     isbn,
        //     title,
        //     pages
        // })
        // .then(() => {
        //     inputISBN.value = '';
        //     inputTitle.value = '';
        //     inputPages.value = '';
        // });
        
        ev.preventDefault();
      }
    
      deletelocation(id, ev) {
        this.state.locationService.remove( id );
      }
    

    render () {
        return (
            <div>
                <form className="form-container needs-validation" onSubmit={this.addlocation.bind(this)}>
                    <p className="description">Add the locations of your favourite restaurants.</p>
                    <label>
                        <p className="form-subtitle">Enter location name:</p>
                        <input className="form-control form-control-lg" type="text" placeholder="Enter location name"></input>
                        <div className="invalid-feedback">
                            An ISBN is required.
                        </div>
                    </label>
                    <button className="btn btn-dark" type='submit' value='Submit location'> Submit location</button>
                    {this.props.alert}
                </form>
            </div>
        );
    }
}

export default AddLocation;