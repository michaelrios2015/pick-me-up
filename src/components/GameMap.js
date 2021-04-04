import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import moment from 'moment';


const MAP_API = process.env.MAP_API

const Map = withScriptjs(withGoogleMap((props) =>{
  const courts = props.courts
  console.log(courts)
  const center = courts[0]
    return (
      <GoogleMap zoom={14} center={ { lat:  center.lat * 1, lng: center.long * 1 } } >
        {courts.map((court) => {
          return(
            <div>
              <Marker key={court.objectid} position={{lat: court.lat * 1, lng: court.long * 1}} onClick={(ev)=>props.setCourt(ev,court)}/>
              {props.selectedCourt === court && (
                <InfoWindow
                // marker= {props.marker}
                 onCloseClick={() => {
                   this.setState({selectedCourt: null})
                 }}
                 position={{
                    lat: court.lat * 1,
                    lng: court.long * 1
                 }}
              >
                <div>
                  <h1>Game: {court.id}</h1>
                  <h3>Court: Court {court.location}</h3>
                  <h3>Zip Code: {court.zipcode}</h3>
                  <h3>Date: {moment(court.dateAndTime).format('MMM D, YYYY')}</h3>
                  <h3>Time: { moment(court.dateAndTime).format('h:mm a') }</h3>
                </div>
              </InfoWindow>
              )}
                
             
            </div>
          )
        })}
      </GoogleMap>
    )  
}))

export default class GameMap extends React.Component{
  constructor(){
    super()
    this.state ={
      selectedCourt: null,
      selectedMarker: null
    }
    this.setCourt = this.setCourt.bind(this)
  }

  setCourt(ev,court){
    console.log(this.state.selectedCourt)
    if(this.state.selectedCourt === court){
      this.setState({selectedCourt: null})
    }
    this.setState({selectedCourt: court, selectedMarker: ev.target})
  }

  render(){
    return (
      <div className="map-container">
        <Map
           courts={this.props.courts}
           marker= {this.state.selectedMarker}
           selectedCourt={this.state.selectedCourt}
           setCourt={this.setCourt}
           googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${MAP_API}&v=3.exp&libraries=geometry,drawing,places`}
           loadingElement={<div style={{ height: `100%` }} />}
           containerElement={<div style={{ height: `400px`, width: `100%` }} />}
           mapElement={<div style={{ height: `100%` }} />}
        />
       </div>
    )
  }
}