import React from "react";
import { Popup } from "react-mapbox-gl";
import { Card, CardBody, CardTitle, Fa} from 'mdbreact';
const PopupComponent = (props) => {  
    return (
      <div className="container">
        {props.visible ? (
          <Popup
            coordinates={[props.lng, props.lat]}
            offset={{
              bottom: [0, -38]
            }}
            anchor="bottom"
          >
      
          <Card>
            <CardBody> 
            <div className="d-flex justify-content-between align-items-end">
            <img
            src={props.icon}
            alt="icon"
            className="rounded-circle img-fluid mr-1"
          /><CardTitle>{props.name}</CardTitle>  
          </div> 
              <hr className="hr-dark"/>
              <p>{props.address}</p>
              <p>{props.number ? props.number : undefined}</p>                    
            </CardBody>
            <div className="blue-gradient text-center pt-3">
            <ul className="list-unstyled list-inline font-small">              
              <li id="hours" className="list-inline-item white-text">
              <Fa icon="clock-o mr-1" />{props.status}
              </li>
              <li className="list-inline-item pr-2">
                <a href="#!" className="white-text card-footer__likes">
                  <Fa icon="thumbs-up" />
                  {props.likes}
                </a>
              </li>
              <li className="list-inline-item pr-2">
                <a href="#!" className="white-text card-footer__rating">
                  <Fa icon="star"> </Fa>
                  {props.rating}
                </a>
              </li>              
            </ul>
          </div>
          </Card>      
        
          </Popup>
        ) : (
          undefined
        )}
      </div>
    );
        }

export default PopupComponent