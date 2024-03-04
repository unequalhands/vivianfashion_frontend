import React, { useContext } from 'react';
import { Store } from '../Store';
import { Helmet } from 'react-helmet-async';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import MessageBox from '../components/MessageBox';
import { Link, useNavigate } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardBody from 'react-bootstrap/esm/CardBody';
import axios from 'axios';

const CartScreen = () => {
    
    const navigate = useNavigate();

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const checkoutHandler=()=>{
    navigate('/signin?redirect=/shipping')

  }

  const updateCartHandler=async(item, quantity)=>{
    const {data} = await axios.get(`/api/products/${item._id}`);
    if(data.countInStock<quantity){
        window.alert('sorry, Product is out of stock');
        return;
      }
      ctxDispatch({
        type:'CART_ADD_ITEM', 
        payload:{
            ...item,
             quantity
            }
        }
    )};

    const removeCartHandler =(item)=>{
        ctxDispatch({
            type:'CART_REMOVE_ITEM',
            payload: item
        })
    }
      

  return (
    <div>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <h1>Shopping Cart</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <MessageBox>
              Cart is Empty <Link to="/">Go Shopping</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {cartItems.map((item) => (
                <ListGroupItem key={item._id}>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <img
                        className="img-fluid rounded img-thumbnail"
                        src={item.images}
                        alt={item.name}
                      />{' '}
                      <Link to={`/product/${item.slug}`}>{item.name}</Link>
                    </Col>
                    <Col md={3}>
                      <Button variant="light" onClick={()=>updateCartHandler(item, item.quantity-1)} disabled={item.quantity === 1}>
                        <i className="fas fa-minus-circle"></i>
                      </Button>{' '}
                      <span>{item.quantity}</span>{' '}
                      <Button variant="light" onClick={()=>updateCartHandler(item, item.quantity+1)} disabled={item.quantity === item.countInStock}>
                        <i className="fas fa-plus-circle"></i>
                      </Button>
                    </Col>
                    <Col md={3}>${item.price}</Col>
                    <Col md={2}>
                      <Button 
                      onClick={()=>removeCartHandler(item)} variant="light">
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroupItem>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
            <Card>
                <CardBody>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>SubTotal({cartItems.reduce((a,c)=>a + c.quantity, 0)}{' '}
                            items): ${cartItems.reduce((a,c)=> a + c.quantity * c.price, 0)}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div className='d-grid'>
                            <Button 
                            onClick={checkoutHandler} disabled= {cartItems.length === 0 } type='button' variant='primary'>
                                Proceed to Checkout
                            </Button>
                            </div>
                        </ListGroup.Item>
                    </ListGroup>
                </CardBody>
            </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CartScreen;
