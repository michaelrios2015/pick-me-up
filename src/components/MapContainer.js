// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import {GoogleApiWrapper} from 'google-maps-react';

// class Maps extends Component{
//   constructor(){
//     super();
//     this.state = {};
//   }

//   componentDidMount(){
   
//   }

//   render(){
//     return (
//       <div>
//         MAP
//       </div>
//     );
//   }
// }


// const mapStateToProps = ({users}) => {
//   return {users};
// }

// export default connect(mapStateToProps, null)(Maps);

import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { apiKey } from '../../env';
 
export class MapContainer extends Component {
  render() {
    console.log(this.props.google)
    // so I can load a map and I should be able to loop through ten places to set ten random courts and we can start with that
    return (  
      <Map google={this.props.google} initialCenter={{lat: 40.7485722, lng: -74.0068633}}
      zoom={12}>
        
        <Marker name={'Current location'} />

      <Marker position={{lat: "40.8659", lng: "-73.8503"}}/>


        {/* <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
        </InfoWindow> */}
      </Map>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: apiKey
})(MapContainer)