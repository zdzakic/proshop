import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Row, Button, Col, Form} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {register} from '../actions/userActions'


const RegisterScreen = ({location, history}) => {

   // state components
   const [name, setName] = useState('') 
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [confirmPassword, setConfirmPassword] = useState('')
   const [message, setMessage] = useState(null)

   //dispatch funtionality
   const dispatch = useDispatch()

   const userRegister = useSelector((state) => state.userRegister)
   const {loading, error, userInfo } = userRegister

   // define redirect functions upon login (home screen)
   const redirect = location.search ? location.search.split('=')[1] : '/'

   useEffect(() => {
      if (userInfo) {
         history.push(redirect)
      }
   }, [history, userInfo, redirect])

   const submitHandler = (e) => {
      e.preventDefault()
      //DISPATCH REGISTER
      if (password !== confirmPassword) {
         setMessage('Passwords do not match!')
      }else {
         dispatch(register(name, email, password))
      }
   }

   return (
      <FormContainer>
         <h1>Sign Up</h1>   
         {/* //display error if any  */}
         {message && <Message variant='danger'>{message}</Message>}
         {error && <Message variant='danger'>{error}</Message>}

         {/* // if loading, show loader  */}
         {loading && <Loader />}

         <Form onSubmit={submitHandler}>

            <Form.Group controlId='name'>
               <Form.Label>Name</Form.Label>
               <Form.Control 
               type='name' 
               placeholder='Enter your name' 
               value={name}
               onChange={(e) => setName(e.target.value)} >
               </Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
               <Form.Label>Email Address </Form.Label>
               <Form.Control 
               type='email' 
               placeholder='Enter your email' 
               value={email}
               onChange={(e) => setEmail(e.target.value)} >
               </Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
               <Form.Label>Your Password </Form.Label>
               <Form.Control 
               type='password' 
               placeholder='Enter your password' 
               value={password}
               onChange={(e) => setPassword(e.target.value)} >
               </Form.Control>
            </Form.Group>

             <Form.Group controlId='confirmPassword'>
               <Form.Label>Confirm Password </Form.Label>
               <Form.Control 
               type='password' 
               placeholder='Confirm password' 
               value={confirmPassword}
               onChange={(e) => setConfirmPassword(e.target.value)} >
               </Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
               Register
            </Button>
         </Form>
         
         <Row className='py-3' >
            <Col>
               Have an Account ? <Link to={redirect ? `/login/?redirect=${redirect}` : '/login'}> Login </Link> 
            </Col>
         </Row>
      </FormContainer>
   )
}

export default RegisterScreen
