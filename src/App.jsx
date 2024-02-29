import {  BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"
import Homescreen from "./screens/HomeScreen.jsx";
import ProductScreen from "./screens/ProductScreen.jsx";
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
//import {LinkContainer} from 'react-router-bootstrap'

function App() {
  return (
    <Router>
    <div className="d-flex flex-column site-container">
      <header>
        <Navbar bg='dark' variant="dark"> 
          <Container>
            <Navbar.Brand>
              <Link to='/'>VIVIANFASHION-COLLECTIONS</Link>
            </Navbar.Brand>
          </Container>
        </Navbar>
        
      </header>
      <main>
        <Container>
        <Routes>
          <Route path ='/product/:slug' element={<ProductScreen/>}/>
          <Route path='/' element={<Homescreen/>}/>
        </Routes>
        </Container>
      </main>
      <footer>
        <div className='text-center'>All rights reserved</div>
      </footer>
    </div>
    </Router>
  );
  
}

export default App;
