import React, { useEffect, useReducer, useState } from 'react';
import Axios from 'axios';
//import data from '../data'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Product from '../components/Product';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { getError } from '../Utils';


const reducer = (state, action)=>{
    switch(action.type){
        case 'FETCH_REQUEST':
            return {...state, loading:true}
        case 'FETCH_SUCCESS':
            return {...state, loading:false, products:action.payload}
        
        case 'FETCH_FAIL':
            return {...state, loading:false, error: action.payload }
        default:
            return {state}

    }
}



const HomeScreen = () => {
  //const [products, setProducts] = useState([]);
        const initialState = {loading: true, products:[], error:""}
        const [{loading, products, error}, dispatch] = useReducer(reducer, initialState)
  

    useEffect(() => {
        const fetchData = async () => {
         dispatch({
            type: 'FETCH_REQUEST'
            });
        try{
            const result = await Axios.get('/api/products');
            dispatch({
                type:'FETCH_SUCCESS',
                payload: result.data
            })
        }
        catch(err){
            dispatch({
                type:'FETCH_FAIL',
                payload:getError(err)
            })
        }
      
      //setProducts(result.data);
    };
    fetchData();
  }, []);

  return (
    <div>
        <Helmet>
            <title>VivianFashion</title>
        </Helmet>
      <h1>Customized cloth designs</h1>
      <div className="products">
       {
            loading ? (<LoadingBox/>)
            : error ? (<MessageBox variant='danger'>{error}</MessageBox>)
             :(
                 <Row>
                    {products.map((product) => 
                        <Col key={product.slug} sm={6} md={4} lg={3} className='mb-3'>
                            <Product product={product}/>
                        </Col>
                    )}
                </Row> 
                
            )}
        </div>
    </div>
  );
}

export default HomeScreen;
