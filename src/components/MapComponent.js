import React, { Component } from "react";
import ReactMapboxGl, {  
  ZoomControl,
  RotationControl,  
  Marker,
} from "react-mapbox-gl";
import { connect } from "react-redux";
import PopupComponent from "./PopupComponent";
import token from "../utils/config"


const zoom = [14]
const center = [17.1628, 48.1576]
const Map = ReactMapboxGl({
  accessToken:
    token
});

class MapComponent extends Component {
  constructor(props) {
    super(props);
    this.handleVisibilityChange = this.handleVisibilityChange.bind(this)
    this.state = {
      data: [],    
      center: center 
    };
  }
  componentDidUpdate(prevProps, prevState){
    if(prevState.data.length === 0 || prevProps.venues.venues.length !== this.props.venues.venues.length){
      this.setState({data: this.props.venues.venues})
    }
  }
  handleVisibilityChange(marker){
    // redux workaround 
    this.setState(prevState => ({
      data: prevState.data.map(obj =>
        obj._id === marker._id
          ? Object.assign(obj, { visible: !obj.visible })
          : obj
      )
    }))
  }
 
  render() {
    
    return (
      <div>
        {this.props.venues && this.props.venues.venues ? (
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
        
            {this.state.data.map(marker => (<PopupComponent lng={marker.location.lng} lat={marker.location.lat} name={marker.name} visible={marker.visible} icon={`${marker.icon.prefix}bg_64${marker.icon.suffix}`} description={marker.description} url={marker.url} likes={marker.likes ? marker.likes : "N/A"} rating={marker.rating ? marker.rating : "N/A"} status={marker.hours ? marker.hours.status : "N/A"} address={marker.location.formattedAddress.map(item => <span>{item}<br/></span>)} number={marker.contact ? marker.contact : "N/A"}>
            </PopupComponent>))}
            <ZoomControl />
            <RotationControl />
        
          </Map>
        ) : (
          <Map
            style="mapbox://styles/matejturay/cjqzclom508n42sqvaawc12mc"
            containerStyle={{
              height: "94vh",
              width: "100vw"
            }}
            center={center}
            zoom={zoom}
          >
            <ZoomControl />
            <RotationControl />
      
          </Map>
        )}
      </div>
    );
  }
}



const mapStateToProps = (state, ownProps) => {
  return {
    venues: state.venues
  };
};


export default connect(mapStateToProps)(MapComponent);