import React, {useState, useEffect} from 'react'
import {Row, Col, Image, ListGroup, Card, Button, Form} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {listProductDetails} from '../actions/productActions'

const ProductScreen = ({history, match}) => {

   const[qty, setQty] = useState(1)

   const dispatch = useDispatch()

   const productDetails = useSelector((state) => state.productDetails)
   const {loading, error, product} = productDetails

   useEffect(() => {
      dispatch(listProductDetails(match.params.id))
   }, [dispatch, match])
   
   const addToCartHandler = () => {
      history.push(`/cart/${match.params.id}?qty=${qty}`)
   }

   return (
      <>
         {/* // goBack button  */}
         <Link className='btn btn-light my-3' to='/'>
            Go Back
         </Link>
         {loading ?<Loader />: error ? <Message variant='danger'>{error}</Message> :(
            <Row> 
         {/* // image placeholder , half of the width */}
            <Col md={6}> 
               <Image src={product.image} alt={product} fluid />
            </Col>

            {/* // product description placeholder | list group    */}
            <Col md={3} >        
               <ListGroup variant='flush'>
                  {/* // name of product  */}
                  <ListGroup.Item>
                     <h3>{product.name}</h3>
                  </ListGroup.Item>

                  {/* // reviews  */}
                  <ListGroup.Item>
                     <Rating value={product.rating} text={`${product.numReviews} reviews`}></Rating>
                  </ListGroup.Item>

                  {/* // product price */}
                  <ListGroup.Item>
                     Price: ${product.price}
                  </ListGroup.Item>

                  {/* // product desc */}
                   <ListGroup.Item>
                     Description: {product.description}
                  </ListGroup.Item>

               </ListGroup>
            </Col>
            {/* // cart card with space with of 3  */}
            <Col md={3}>
               <Card>
                  <ListGroup variant='flush'>
                     <ListGroup.Item>
                        <Row>
                           <Col>
                              Price:
                           </Col>
                           <Col>
                              <strong>${product.price}</strong>
                           </Col>
                        </Row>
                     </ListGroup.Item>

                     <ListGroup.Item>
                        {/* // split row into the two columns */}
                        <Row>
                           <Col>
                              Status:
                           </Col>
                           <Col>
                              {/* // disable button if item out of stock */}
                              {product.countInStock > 0 ? 'In stock' : 'Out of stock'}
                           </Col>
                        </Row>
                     </ListGroup.Item>
                     
                     {product.countInStock > 0 && (
                        <ListGroup.Item>
                           <Row>
                              <Col> Qty</Col>
                              <Col>
                                 <Form.Control as='select' value={qty} onChange={(e) => 
                                 setQty(e.target.value)}>
                                    {[...Array(product.countInStock).keys()].map((x) => (
                                       <option key={x+1} value={x+1}>
                                          {x+1}
                                       </option>
                                    ))}
                                 </Form.Control>
                              </Col>
                           </Row>
                        </ListGroup.Item>
                     )}

                     {/* // button add to cart */}
                     <ListGroup.Item>
                        <Button onClick={addToCartHandler} className='btn-block' type='button' disabled={product.countInStock < 1}>
                           Add to Cart
                        </Button>
                     </ListGroup.Item>

                  </ListGroup>
               </Card>
            </Col>

         </Row>
         )}
         
      </>
   )
}

export default ProductScreen
