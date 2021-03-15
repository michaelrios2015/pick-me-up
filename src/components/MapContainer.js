// import React, { Component } from 'react';
// import { apiKey } from '../../env';
// import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
 
// export class MapContainer extends Component {

//   onMapClicked(mapProps, map, clickEvent) {
//     console.log('hi');
//     // ...
//   }

//   onMarkerClick(props, marker, e) {
//     console.log(marker);
    
//     // ..
//   }

//   render() {
//     var points = [
//       { lat: 42.02, lng: -77.01 },
//       { lat: 42.03, lng: -77.02 },
//       { lat: 41.03, lng: -77.04 },
//       { lat: 42.05, lng: -77.02 }
//   ]
//   var bounds = new this.props.google.maps.LatLngBounds();
//   for (var i = 0; i < points.length; i++) {
//     bounds.extend(points[i]);
//   }
//   return (
// <Map google={this.props.google}
//     style={{width: '100%', height: '100%', position: 'relative'}}
//     className={'map'}
//     onClick={this.onMapClicked}  
//     zoom={14}>
    
//   <Marker
//     onClick={this.onMarkerClick}
//     title={'The marker`s title will appear as a tooltip.'}
//     name={'SOMA'}
//     position={{lat: 37.778519, lng: -122.405640}}>
//     <InfoWindow
//     visible={true}
//     // style={styles.infoWindow}
//     >
//       <div >
//         <p>Click on the map or drag the marker to select location where the incident occurred</p>
//       </div>
//   </InfoWindow>
//   </Marker>
// </Map>
//   );
//   }
// }
 
// export default GoogleApiWrapper({
//   apiKey: apiKey
// })(MapContainer)


import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { apiKey } from '../../env';
import { courts } from '../../server/db/locations';
 
export class MapContainer extends Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     // showingInfoWindow: false,
  //     // showCourtInfo: false,
  //     // activeMarker: {},
  //   }
  //   // this.onMapClicked = this.onMapClicked.bind(this)
  //   // this.onInfoClick = this.onInfoClick.bind(this)
  // }

  
  // this is console loging just fine need to open info window
  onMarkerClick(props, marker, e) {
    // console.log(props);
    console.log(marker);
    // console.log(e);
  }
  
  
  
  render() {
    console.log(this.props.google)
    console.log( courts);
    // so I can load a map and I should be able to loop through ten places to set ten random courts and we can start with that
    return ( 
      <div>
        <h1> Court Locator </h1>
        {/* {!this.state.showingInfoWindow&&!this.state.showCourtInfo?<button className="w3-button w3-red" onClick={this.onInfoClick}>Court Info</button>:null} */}
        <Map google={this.props.google}
        onClick={this.onMapClicked}
        initialCenter={{lat: 40.7485722, lng: -74.0068633}}
        zoom={12}>

          


          {/* so this displays the courts just fine and we cab pass in title and I assume other info */}
          {
          courts.map((court) => {
            return <Marker position={{lat: court.lat, lng: court.lon}} key = { court.Prop_ID} 
            title={court.Name}
            icon={{ 
              url: "http://www.clker.com/cliparts/j/N/m/m/d/2/glossy-red-icon-button-md.png",
              anchor: new google.maps.Point(10,10),
              scaledSize: new google.maps.Size(10,10)
            }} onClick={this.onMarkerClick}/>
          })}
        </Map>
      </div>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: apiKey
})(MapContainer)