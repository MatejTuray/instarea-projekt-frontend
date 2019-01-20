import React, { Component } from 'react';
import './App.css';
import MapComponent from './components/MapComponent';
import NavMenu from './components/NavMenu';
import MenuComponent from './components/MenuComponent';
import HeatMapComponent from './components/HeatMapComponent';

class App extends Component {
  constructor(props) {
    super(props)  
  
  this.toggleMenu = this.toggleMenu.bind(this)
   this.handleStateChange = this.handleStateChange.bind(this)
  this.handleSubmit = this.handleSubmit.bind(this)
  this.handleRadioClick = this.handleRadioClick.bind(this)
  this.state = {
    isOpen: false,   
    options: [],
    radio: 1

  }
  }   
 
  
  toggleMenu(){
      this.setState({
        isOpen: !this.state.isOpen
      })
  }
  handleStateChange (state) {
    this.setState({isOpen: state.isOpen})  
  }
  handleSubmit(){
    console.log("text")
  }
  handleRadioClick(e){ 
    this.setState({
      radio: e.target.value
    })
  }

 
  
  render() {
    return (
      <div className="App">             
        <NavMenu isOpen={this.state.isOpen} toggleMenu={this.toggleMenu} />
        <MenuComponent  isOpen={this.state.isOpen} handleSubmit={this.handleSubmit} radio={this.state.radio} handleRadioClick={this.handleRadioClick}/>
        {this.state.radio === 2? 
          <HeatMapComponent/> : <MapComponent/>}
      </div>
    );
  }
}


export default App
