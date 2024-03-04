import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button';
import Rating from './Rating';
import { Store } from '../Store';
import axios from 'axios';

const Product = (props) => {
  const navigate = useNavigate();
  const {product} = props; 
  const {state, dispatch:ctxDispatch} = useContext(Store);
const {cart:{cartItems}} = state;

  const addToCartHandler = async(item)=>{
    const existItem = cartItems.find((x)=> x._id === product._id);
    const quantity = existItem ? existItem.quantity +1 : 1;
    const {data} = await axios.get(`/api/products/${product._id}`);
    if(data.countInStock<quantity){
      window.alert('sorry, Product is out of stock');
      return;
    }
  ctxDispatch({type:'CART_ADD_ITEM', payload:{...item, quantity}})
  
  }
  
  return (
    <Card>
    <Link to={`/product/${product.slug}`}>
         <img src={product.images} className='card-img-top' alt={product.name} />
    </Link>
    <Card.Body>
    <Link to={`/product/${product.slug}`}>
            <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating rating = {product.rating} numReviews= {product.numReviews}/> 
        <Card.Text>${product.price}</Card.Text>
        {
          product.countInStock===0 ?
          <Button disabled variant='light'>Out of Stock</Button>:
          <Button onClick={()=>addToCartHandler(product)}>Add to cart</Button>
        }
        
    </Card.Body>
    </Card>
  )
}

export default Product ;