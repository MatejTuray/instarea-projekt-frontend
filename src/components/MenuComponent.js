import React, { Component } from "react";
import { stack as Menu } from "react-burger-menu";
import { Divider } from "antd";
import { MDBBtn, MDBIcon } from "mdbreact";
import { Switch } from "antd";
import { Slider, Row, } from "antd";
import { Rate } from "antd";
import ReactResponsiveSelect from "react-responsive-select";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import fetchCategories from "../actions/categoriesActions";
import { setQueryCategories, setQueryPrice, setMinRating, setIsOpen, clearQuery } from "../actions/queryActions";
import {fetchVenues} from "../actions/venueActions";
import { Radio } from 'antd';

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;


const caretIcon = (
  <svg
    className="caret-icon"
    x="0px"
    y="0px"
    width="11.848px"
    height="6.338px"
    viewBox="351.584 2118.292 11.848 6.338"
  >
    <g>
      <path d="M363.311,2118.414c-0.164-0.163-0.429-0.163-0.592,0l-5.205,5.216l-5.215-5.216c-0.163-0.163-0.429-0.163-0.592,0s-0.163,0.429,0,0.592l5.501,5.501c0.082,0.082,0.184,0.123,0.296,0.123c0.103,0,0.215-0.041,0.296-0.123l5.501-5.501C363.474,2118.843,363.474,2118.577,363.311,2118.414L363.311,2118.414z" />
    </g>
  </svg>
);

class MenuComponent extends Component {
  constructor(props) {
    super(props);   
    this.handleMultiSelectChange = this.handleMultiSelectChange.bind(this);
   
    this.state = {
      selectedValues: [],
      options: []
      
    };
  }
  componentDidMount() {
    try{
    this.props.fetchCategories();
    
    }
    catch(e){
      console.log(e)
    }
  }
  
  getMultiSelectValue(newValue) {
    return {
      [newValue.options[0].name]: {
        options: [...newValue.options],
        altered: newValue.altered
      }
    };
  }

  handleMultiSelectChange(newValue) {
    const formValue = this.getMultiSelectValue(newValue);
    console.log(newValue);
    // Merge new value over top of existing value
    this.setState({
      ...this.state,
      ...formValue,
      selectedValues: newValue.options.map(v => v.value).filter(v => v !== 'null')
    });
    console.log(this.state)
    let payload = newValue.options.map(v => v.value)
    this.props.setQueryCategories({cat__in: payload.join(",")})
  }


  render() {
   
    const marks = {
      1: {
        style: { color: "white" },

        label: <span>1</span>
      },
      2: {
        style: { color: "white" },

        label: <span>2</span>
      },
      3: {
        style: { color: "white" },

        label: <span>3</span>
      },
      4: {
        style: { color: "white" },

        label: <span>4</span>
      }
    };

    return (
      <Menu
        isOpen={this.props.isOpen}        
        noOverlay
        className="blue-gradient"
      >
       
        <div className="menu-item">
          <div>
            <Divider orientation="left">Category</Divider>
            <div className="container-fluid">
              <ReactResponsiveSelect
                multiselect
                name="cat__in"
                options={this.props.categories}
                onChange={this.handleMultiSelectChange}
                caretIcon={caretIcon}                
                noSelectionLabel="Select some categories"
           
                
              />
            </div>
          </div>
        </div>
        <div className="menu-item">
          <div>
            <Divider orientation="left">Price Tier</Divider>
            <div className="container-fluid">
              <Row>
                <Slider
                  min={1}
                  max={4}
                  onChange={(values) => {let minValue = values[0]; let maxValue = values[1]; let payload = {price__gte: minValue, price__lte: maxValue}; this.props.setQueryPrice(payload)}}
                  range
                  marks={marks}
                />
              </Row>
            </div>
          </div>
        </div>

        <div>
          <div className="menu-item">
            <div>
              <Divider orientation="left">Minimal Rating</Divider>
              <Rate
                allowHalf
                allowClear
                defaultValue={0}
                count={10}
                className="ml-2 mr-2"
                onChange={(value) => this.props.setMinRating({rating__gte: value})}
              />
            </div>
          </div>
        </div>
        <div className="menu-item">
          <div>
            <Divider orientation="left">Display only open venues</Divider>
            <div className="d-flex align-space-around justify-content-center">
              <Switch checkedChildren="TRUE" unCheckedChildren="FALSE" onChange={(checked) => this.props.setIsOpen({isOpen: checked})} />
            </div>
          </div>
          <div>
          <Divider orientation="left">Map type </Divider>
          <div className="d-flex justify-content-center align-items-center flex-column">
          <RadioGroup  defaultValue={1} onChange={(e) => this.props.handleRadioClick(e)} value={this.props.radio} buttonStyle="solid">
              <RadioButton value={1} checked={this.props.radio === 1 ? true : false}  >Regular</RadioButton>
              <RadioButton value={2} checked={this.props.radio === 2 ? true : false}>Heat - likes</RadioButton>          
         </RadioGroup>
          </div>
        </div>
        </div>
        <div className="menu-item">
          <Divider />
          <div className="container">
       
            <MDBBtn id="btn-color" block type="submit" disabled={!this.props.query.rating__gte && !this.props.query.price__lte &&  !this.props.query.price__gte  &&  !this.props.query.isOpen && this.props.query.cat__in === "null"  ? true : false} onClick={() => this.props.fetchVenues(this.props.query)} >
              <MDBIcon icon="filter" className="mr-1" />
              Apply filters
            </MDBBtn>
          </div>
        </div>
     
      </Menu>
    );
  }
}
const mapStateToProps = state => {
  return {
    categories: state.categories, 
    query: state.query
  
    
    
       
    
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchCategories: fetchCategories,
      setQueryCategories: setQueryCategories,
      setQueryPrice: setQueryPrice,
      setMinRating: setMinRating,
      setIsOpen: setIsOpen,
      fetchVenues: fetchVenues,
      clearQuery: clearQuery,
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuComponent);
