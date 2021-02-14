import React from 'react';
import {Route} from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap'
import {Navbar, Nav, Container, NavDropdown} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import SearchBox from './SearchBox'
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
               {/* // embed sarch box into the route  */}
               <Route render={({history}) => <SearchBox history={history}/>}></Route>
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
                     {/* // display admin panel for admin user  */}
                     {userInfo && userInfo.isAdmin && (
                        //admin menu panel 
                        <NavDropdown title='Admin' id='adminmenu'>
                           {/* //link  to users  */}
                           <LinkContainer to='/admin/userlist'>
                              <NavDropdown.Item >Users</NavDropdown.Item>
                           </LinkContainer>
                           {/* //link  to products  */}
                           <LinkContainer to='/admin/productlist'>
                              <NavDropdown.Item >Products</NavDropdown.Item>
                           </LinkContainer>
                           {/* //link  to orders  */}
                           <LinkContainer to='/admin/orderlist'>
                              <NavDropdown.Item >Orders</NavDropdown.Item>
                           </LinkContainer>
                        </NavDropdown>
                     )}
                  </Nav>
               </Navbar.Collapse>
            </Container>
         </Navbar>
      </header>
   )
}

export default Header

