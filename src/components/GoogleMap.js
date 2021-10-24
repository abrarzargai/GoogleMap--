import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import axios from 'axios'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import Data_Display from './Data_Display';

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // for google map places autocomplete
      address: '',
      data: [],
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},

      mapCenter: {
        lat: 33.738045,
        lng: 73.084488
      }
    };
  }

  handleChange = address => {
    this.setState({ address });
  };


  handleSelect = address => {
    this.setState({ address });
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(async (latLng) => {
        console.log('Success', latLng);

        // update center state
        this.setState({ mapCenter: latLng });
        try {
          const data = await axios.post('http://localhost:8080/api/auth', latLng)
          console.log(data.data)
          this.setState({ data: data.data })
          console.log("state==>", this.state.data)
        } catch (error) {
          console.error('API_Error', error)
        }
      })
      .catch(error => console.error('Error', error));
  };

  render() {
    return (
      <>
      <div class='container-fluid'>
        <div class='row'>
          <div class='col-6'>

       <h1>Google Maps App</h1>
      <div id='googleMaps'>
        <PlacesAutocomplete
          value={this.state.address}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
              <input
                {...getInputProps({
                  placeholder: 'Search Places ...',
                  className: 'location-search-input',
                })}
              />
              <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map(suggestion => {
                  const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
     
              <Map
              style={{width:'100vh'}}
                google={this.props.google}
                initialCenter={{
                  lat: this.state.mapCenter.lat,
                  lng: this.state.mapCenter.lng
                }}
                center={{
                  lat: this.state.mapCenter.lat,
                  lng: this.state.mapCenter.lng
                }}
              >
                <Marker
                  position={{
                    lat: this.state.mapCenter.lat,
                    lng: this.state.mapCenter.lng
                  }} />
                  
                 
              </Map>
            </div>
         
            </div>
            <div class='col-6'>
              <Data_Display  data={this.state.data||"heelo"}/>
            </div>
          </div>
        </div>
      
                
      
      </>
      
    )
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyA_FkaqpqSIEibYl-IqOfosLNYfSOeeo9I')
})(MapContainer)