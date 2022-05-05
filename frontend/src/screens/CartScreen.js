import React, { useContext } from 'react'
import { Store } from '../components/Store';
import { Link, useNavigate } from "react-router-dom"
import { Helmet } from 'react-helmet-async'
const CartScreen = () => {
    const { state, dispatch: ctxdispatch } = useContext(Store);
    const navigate = useNavigate()
    const {
        cart: {
            cartItems
        } } = state;
    const updateQuantityHandler = (item, quantity) => {
        ctxdispatch({ type: "ADD_ITEMS_IN_CART", payload: { ...item, quantity } })
    }
    const removerItem = (item) => {
        ctxdispatch({ type: 'REMOVE_ITEM', payload: item })
    }

    return (
        <section >
            <div className="container">
                <Helmet>
                    <title>Shoping Cart</title>
                </Helmet>
                <h1>Shoping Cart</h1>

                <div className="row">

                    <div className="col-md-8">
                        {cartItems.length === 0
                            ?
                            <div className="text-center text-danger">
                                <p>Please add items to the cart</p>
                                <Link to={"/"}>Go to Shoping</Link>
                            </div>
                            : <div  >
                                {cartItems.map(item => {
                                    return (
                                        <div key={item.name} className="row" style={{ border: "1px solid gray", padding: "10px 0" }}>

                                            <div className="col-4">
                                                <div className="row">
                                                    <div className='col'>
                                                        <img className="img-fluid cart-image" src={item.image} alt={item.name} />
                                                    </div>
                                                    <div className='col d-flex align-items-center'>
                                                        <Link to={`/product/${item.slug}`}>{item.name}</Link>

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-2 d-flex align-items-center">
                                                <strong className=''>Price : <span>₹{item.price}</span></strong>
                                            </div>
                                            <div className="col-3 d-flex align-items-center justify-content-between">
                                                <span> <button className='btn btn-light' disabled={item.quantity === 1} onClick={() => updateQuantityHandler(item, item.quantity - 1)}><i className="fa-solid fa-minus"  ></i></button></span>
                                                <span><button className='btn btn-light' disabled> {item.quantity}</button></span>
                                                <span> <button className='btn btn-light' disabled={item.quantity === item.countInStock} onClick={() => updateQuantityHandler(item, item.quantity + 1)}><i className="fa-solid fa-plus"></i></button></span>
                                            </div>
                                            <div className="col-3 d-flex align-items-center justify-content-center">
                                                <span > <button className='btn btn-light' onClick={() => removerItem(item)}><i className="fa-solid fa-trash-can text-danger"></i></button></span>
                                            </div>
                                        </div>
                                    )

                                })}

                            </div>
                        }

                    </div>
                    <div className="col-md-4">
                        <div style={{ border: "1px solid gray", padding: "5px" }}>
                            <h3>Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)} items):</h3>
                            <h3>₹ {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}</h3>
                            <div>
                                <button style={{ width: "100%" }} disabled={cartItems.length === 0} onClick={() => navigate(`/signin?redirect=shiping`)}>Proceed To Checkout</button>
                            </div>
                        </div>
                    </div>


                </div>

            </div>
        </section >
    )
}

export default CartScreen