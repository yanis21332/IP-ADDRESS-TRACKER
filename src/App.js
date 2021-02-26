import './App.css';
import { Component } from 'react'
import backgroundImageForHeader from './images/pattern-bg.png';

class App extends Component{
  render(){
    
    
    return(
      <>
        <header className = "HeaderPart">
          <img src = {backgroundImageForHeader} alt = "le background du header"/>
          <div className = "HeaderElements">
            <h1>IP Adress Tracker</h1>
            <form className = "InputZone">
              <input type = "input" placeholder = "Search for any IP address or domain"></input>
              <button></button>
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
            <div id="mapid" className = "mapid"></div>
          </section>
      </>
    )
  }
}

export default App;
