import React, { Component } from "react";
import ReactMapboxGl, {  
  ZoomControl,
  RotationControl,  
  Layer,
  Feature,
  Marker,
  
 
} from "react-mapbox-gl";
import { connect } from "react-redux";
import PopupComponent from "./PopupComponent";
import axios from "axios"
import token from "../utils/config"

const layerPaint = {
    'heatmap-weight': {
      property: 'likes',
      type: 'exponential',
      stops: [[0, 0], [5, 2]]
    },
    'heatmap-intensity': {
      stops: [[0, 0], [0, 0.9]]
    },
   
    'heatmap-color': [
      'interpolate',
      ['linear'],
      ['heatmap-density'],
      0,
      'rgba(33,102,172,0)',
      0.25,
      'rgb(103,169,207)',
      0.5,
      'rgb(209,229,240)',
      0.8,
      'rgb(253,219,199)',
      1,
      'rgb(239,138,98)',
      2,
      'rgb(178,24,43)'
    ],
   
    'heatmap-radius': {
      stops: [[0, 1], [14, 50]]
    }
  };
  
const zoom = [14]
const center = [17.1628, 48.1576]
const Map = ReactMapboxGl({
  accessToken: token});

class HeatMapComponent extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      heatData: [],  
      data:[],
      center: center 
    };
  }
  componentDidMount(){
    
    axios.get("https://instarea-projekt-backend.herokuapp.com/api/venues").then((res) => {
        this.setState({
            heatData: res.data
        })       
    }).catch((e) => console.log(e))
    
  }
  componentDidUpdate(prevProps, prevState){
    if(this.props.venues && this.props.venues.venues && prevState.data.length === 0 || prevProps.venues.length !== this.props.venues.length){
      this.setState({data: this.props.venues.venues})
    }
  }
  handleVisibilityChange(marker){
    // redux workaround 
    this.setState(prevState => ({
      data: prevState.data.map(obj =>
        obj.name === marker.name
          ? Object.assign(obj, { visible: !obj.visible })
          : obj
      )
    }))
  }
  clusterMarker = (coordinates) => (
    <Marker coordinates={coordinates}>
      
    </Marker>
  );
 
  render() {
    console.log(this.props)
    return (
      <div>
      {this.props.venues && this.props.venues.venues ? 
        <Map
        style="mapbox://styles/matejturay/cjqzclom508n42sqvaawc12mc"
        containerStyle={{
          height: "94vh",
          width: "100vw"
        }}
        center={this.state.center}
        zoom={zoom}
        movingMethod="easeTo"
        animationOptions={{animate: true, duration: 1500}}
      >
      <Layer type="heatmap" paint={layerPaint}>
      {this.state.heatData.map((el, index) => (
        <Feature key={index} coordinates={[el.location.lng, el.location.lat]} properties={el} />
      ))}
        </Layer>

     
        {this.props.venues.venues.map(marker => (
          <Marker
            coordinates={[marker.location.lng, marker.location.lat]}
            anchor="bottom"
            onClick={() => {this.handleVisibilityChange(marker); this.setState({center: [marker.location.lng, marker.location.lat]})}}
          >
            <img
              alt="marker"
              src={
                "https://gkv.com/wp-content/uploads/leaflet-maps-marker-icons/map_marker-red1.png"
              }
              style={{ width: 32, height: 32, cursor: "pointer" }}
            />
            
          </Marker>
            
        ))}
       
        {this.state.data.map(marker => (<PopupComponent lng={marker.location.lng} lat={marker.location.lat} name={marker.name} visible={marker.visible} icon={`${marker.icon.prefix}bg_64${marker.icon.suffix}`} description={marker.description} url={marker.url} likes={marker.likes} rating={marker.rating} status={marker.hours ? marker.hours.status : "N/A"} address={marker.location.formattedAddress.map(item => <span>{item}<br/></span>)} number={marker.contact ? marker.contact : "N/A"}>
        </PopupComponent>))}
        <ZoomControl />
        <RotationControl />
  
      </Map>  
        :
          <Map
            style="mapbox://styles/matejturay/cjqzclom508n42sqvaawc12mc"
            containerStyle={{
              height: "94vh",
              width: "100vw"
            }}
            center={this.state.center}
            zoom={zoom}
            movingMethod="easeTo"
            animationOptions={{animate: true, duration: 1500}}
          >     
          <Layer type="heatmap" paint={layerPaint}>
          {this.state.heatData.map((el, index) => (
            <Feature key={index} coordinates={[el.location.lng, el.location.lat]} properties={el} />
          ))}
        </Layer>
        <ZoomControl />
        <RotationControl />
 
          </Map>}
        
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
    return {
      venues: state.venues
    };
  };
  
  
  export default connect(mapStateToProps)(HeatMapComponent);