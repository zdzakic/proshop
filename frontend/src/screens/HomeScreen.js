import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {Row, Col} from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {listProducts} from '../actions/productActions'


// I dont understand this bit well 
const HomeScreen = () => {
   // const [products, setProducts] = useState([])
   const dispatch = useDispatch()

   const productList = useSelector(state => state.productList)
   const {loading, error, products} = productList

   useEffect(() => {
      dispatch(listProducts())
      // const fetchProducts = async () => {
      //    const { data } = await axios.get('/api/products')
      //    setProducts(data)
      // }
      // fetchProducts()
      
   }, [dispatch])


   return (
      <>
      <h1> Latest Products </h1> 
      {loading ? (
         <Loader />)
      : error ? (
         <Message variant='danger'>{error}</Message>)
      :(
         <Row> 
         {products.map((product)=> (
            /*
            set the col width depends on screen size 
            large screens 4 items (12/3 ) or small entire width of 12
            */
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
               {/* export this to product react component  */}
               <Product product={product}/>
            </Col>
         ))}  
         </Row>
         )}
      </>
   )
}

export default HomeScreen
