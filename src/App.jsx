import {  BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"
import Homescreen from "./screens/HomeScreen.jsx";
import ProductScreen from "./screens/ProductScreen.jsx";

function App() {
  return (
    <Router>
    <div>
      <header>
        <Link to="/">VIVIANFASHION-COLLECTIONS</Link>
      </header>
      <main>
        <Routes>
          <Route path ='/product/:slug' element={<ProductScreen/>}/>
          <Route path='/' element={<Homescreen/>}/>
        </Routes>
       
      </main>
    </div>
    </Router>
  );
  
}

export default App;
