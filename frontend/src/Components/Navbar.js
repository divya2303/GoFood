import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Badge from 'react-bootstrap/badge';
import Cart from '../Screens/Cart';
import Modal from '../Modal';
import { useCart } from './ContextReducer';

export default function Navbar() {
  const [cartView, setCartView] = useState(false);
  let data = useCart();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark" >
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 " to="/" style={{color: "white", fontFamily: "sans-serif"}}>Tasteful Tales</Link>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span clasNames="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active fs-5 ms-5" aria-current="page" to="/" style={{fontSize: "1.25rem"}}>Home</Link>
              </li>
              {(localStorage.getItem("authToken")) ?
                <li className="nav-item">
                  <Link className="nav-link active fs-5 ms-3" aria-current="page" to="/myOrder" style={{fontSize: "1.25rem"}}>My Orders</Link>
                </li>
                : ""
              }
            </ul>
            {(!localStorage.getItem("authToken")) ?
              <div className='d-flex'>
                <Link className="btn bg-grey text-success mx-1" to="/login" style={{fontSize: "1.25rem"}} >Login</Link>
                <Link className="btn bg-grey text-success mx-1" to="/createuser" style={{fontSize: "1.25rem"}}>SignUp</Link>
              </div>
              : <div>
                <div className='btn bg-grey text-success mx-2 fs-6' onClick={() => setCartView(true)} style={{fontSize: "1.25rem"}}>
                  My Cart{" "}
                  <Badge pill bg='danger'>{data.length}</Badge>
                </div>
                {cartView ? <Modal onClose={() => setCartView(false)}> <Cart /> </Modal> : null}
                <div className='btn bg-grey text-danger mx-2 fs-6' onClick={handleLogout} style={{fontSize: "1.25rem"}}>Logout</div>
              </div>
            }
          </div>
        </div>
      </nav>
    </div>
  )
}
