import React from 'react';
import {LinkContainer} from 'react-router-bootstrap'
import {Navbar, Nav, Container, NavDropdown} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {logout} from '../actions/userActions'

const Header = () => {

   const dispatch = useDispatch()
   // import userLogin from redux 
   const userLogin = useSelector(state => state.userLogin)
   const {userInfo} = userLogin

   const logoutHandler = () => {
      dispatch(logout())
   }

   return (
      <header>
         <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
            <Container>
               <LinkContainer to='/'>
                  <Navbar.Brand >Velo e-SHOP</Navbar.Brand>
               </LinkContainer>
               <Navbar.Toggle aria-controls="basic-navbar-nav" />
               <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="ml-auto">
                     <LinkContainer to='/cart'>
                        <Nav.Link><i className="fa fa-shopping-cart"></i> Cart </Nav.Link>
                     </LinkContainer>
                        {/* // if user logged in */ }
                        {userInfo ? (
                           <NavDropdown title={userInfo.name} id='username'>
                              {/* // display username  */}
                              <LinkContainer to='/profile'>
                                 <NavDropdown.Item >Profile</NavDropdown.Item>
                              </LinkContainer>
                                 {/* // display logout */}
                                 <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                           </NavDropdown>
                        //else, if user not logged in, display login screen
                        ) : <LinkContainer to='/login'>
                           <Nav.Link ><i className="fa fa-user"></i> Sign In </Nav.Link>
                        </LinkContainer>
                     }
                     
                  </Nav>
               </Navbar.Collapse>
            </Container>
         </Navbar>
      </header>
   )
}

export default Header

