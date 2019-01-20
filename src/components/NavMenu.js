import React, { Component } from 'react';
import { Navbar, NavbarBrand, NavbarNav, Collapse, Container, HamburgerToggler } from 'mdbreact';

class NavMenu extends Component {



  render() {
    
    return (
       <div>
      
            <Navbar className="bg" style={{marginTop: '0px', paddingTop: "10px"}} dark>
              <Container fluid>
             
     
              <HamburgerToggler color="#FFFFF" id="hamburger1" onClick={() => this.props.toggleMenu()} />
              <Collapse navbar>
                <NavbarNav left>
              
                </NavbarNav>
                </Collapse>
                <NavbarBrand>
              Ružinov POI
             </NavbarBrand>
              </Container>
            </Navbar>
            
          
          </div>
      
    );
  }
}

export default NavMenu;