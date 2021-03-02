import './App.css';
import { Component, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvent } from 'react-leaflet'
import backgroundImageForHeader from './images/pattern-bg.png';

class App extends Component{
  state = {
    lon : "37.38",
    lat : "-122.083"
  }
  
  render(){
    function LocationMarker() {
      const [position, setPosition] = useState(null);
      const map = useMapEvent({
        click(e) {
          map.locate();
        },
        
        locationfound(e) {
          setPosition(e.latlng)
          map.flyTo(e.latlng,11)
          console.log("une posittio a éré detecté")
        },
      })
      console.log(map.locate())
      
      return position === null ? null : (
        <Marker position={position}>
          <Popup>You are here</Popup>
        </Marker>
      )
    }
    const OnClickInSearchIPaddressButton = e => {
      e.preventDefault();
      let currentComponent = this;
      
      let searchIPaddressInput = document.querySelector(".SearchIPadressInput")
      let IPaddress = searchIPaddressInput.value;
      fetch(`https://geo.ipify.org/api/v1?apiKey=at_5NttJGiPIXsc3fsNdrIVKurtYtuUD&ipAddress=${IPaddress}`)
      .then(function(response){
        response.json()
        .then(function(r){
          console.log(r)
          if(!r.code){
            let ipAddressTextUI = document.querySelector(".blocs .bloc1 h2");
            ipAddressTextUI.innerHTML = r.ip;
            let LocationUI = document.querySelector(".blocs .bloc2 h2");
            LocationUI.innerHTML = r.location.region + ", " + r.location.city
            let TimeZoneUI = document.querySelector(".blocs .bloc3 h2");
            TimeZoneUI.innerHTML = r.location.timezone
            let ISPUI = document.querySelector(".blocs .bloc4 h2");
            ISPUI.innerHTML = r.isp;

            currentComponent.setState({
              lon : r.location.lng,
              lat : r.location.lat
            })
            
          }
          else{
            let ipAddressTextUI = document.querySelector(".blocs .bloc1 h2");
            ipAddressTextUI.innerHTML = "IP dont exist";
            let LocationUI = document.querySelector(".blocs .bloc2 h2");
            LocationUI.innerHTML = "NULL"
            let TimeZoneUI = document.querySelector(".blocs .bloc3 h2");
            TimeZoneUI.innerHTML = "NULL"
            let ISPUI = document.querySelector(".blocs .bloc4 h2");
            ISPUI.innerHTML = "NULL"
          }
        })
      })
    }
    return(
      <>
        <header className = "HeaderPart">
          <img src = {backgroundImageForHeader} alt = "le background du header"/>
          <div className = "HeaderElements">
            <h1>IP Adress Tracker</h1>
            <form className = "InputZone">
              <input className = "SearchIPadressInput" placeholder = "Search for any IP address or domain"></input>
              <button onClick = {OnClickInSearchIPaddressButton}></button>
            </form>
          </div>
        </header>
        <section className = "InformationElements">
            <div className = "blocs">
              <div className = "bloc bloc1">
                <h4>ip address</h4>
                <h2>192.212.174.101</h2>
              </div>
              <div className = "bloc bloc2">
                <h4>Location</h4>
                <h2>Brooklyn, NY 10001</h2>
              </div>
              <div className = "bloc bloc3">
                <h4>Time zone</h4>
                <h2>UTC-05:00</h2>
              </div>
              <div className = "bloc bloc4">
                <h4>ISP</h4>
                <h2>SpaceX Starlink</h2>
              </div>
            </div>
            <MapContainer style={{position:'relative',height:"100%",zIndex:"0",bottom:"156px"}} id = 'mapid' center={[this.state.lon, this.state.lat]} zoom={13} scrollWheelZoom={true}>
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <LocationMarker/>
            </MapContainer>
          </section>
      </>
    )
  }
}

export default App;
