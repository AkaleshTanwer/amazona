import { useContext } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { Store } from './components/Store';
import CartScreen from './screens/CartScreen';
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import SigninScreen from './screens/SigninScreen';

function App() {
  const { state } = useContext(Store);
  return (
    <>
      <BrowserRouter>
        <div className='site-container'>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
              <Link className="navbar-brand" to="/">Amazona</Link>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                  <li className="nav-item">
                    <Link className="nav-link " to="/cart">
                      <div className='position-relative'>
                        Cart

                        {state.cart.cartItems.length > 0 && (
                          <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>{state.cart.cartItems.reduce((a, c) => a + c.quantity, 0)}</span>
                        )}

                      </div></Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <main>
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/signin" element={<SigninScreen />} />
            </Routes>
          </main>


          <footer><div className='text-center'>All Rights Reserved</div></footer>
        </div>
      </BrowserRouter>

    </>
  );
}

export default App;
