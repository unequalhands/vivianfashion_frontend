import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Homescreen from './screens/HomeScreen.jsx';
import ProductScreen from './screens/ProductScreen.jsx';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Badge from 'react-bootstrap/esm/Badge.js';
import { useContext } from 'react';
import { Store } from './Store.js';
import CartScreen from './screens/CartScreen.js';
//import {LinkContainer} from 'react-router-bootstrap'

function App() {
  const {state} = useContext(Store);
  const {cart} = state;
  return (
    <Router>
      <div className="d-flex flex-column site-container">
        <header>
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand>
                <Link to="/">VIVIANFASHION-COLLECTIONS</Link>
              </Navbar.Brand>
              <Nav className='me-auto'>
                <Link to='/cart' className='nav-link'>
                  cart 
                  {cart.cartItems.length>0 && 
                  (<Badge pill bg='danger'>{cart.cartItems.reduce((a,c)=> a + c.quantity, 0)}</Badge>)}
                </Link>
              </Nav>
            </Container>
          </Navbar>
        </header>
        <main className="mt-3">
          <Container>
            <Routes>
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/" element={<Homescreen />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center">All rights reserved</div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
