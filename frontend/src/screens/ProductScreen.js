import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react'
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom'
import GetError from '../components/GetError';
import Rattings from '../components/Rattings';
import { Store } from '../components/Store';
const reducer = (state, action) => {
    switch (action.type) {
        case "FETCH_REQUEST": return { ...state, loading: true };
        case "FETCH_SUCCESS": return { ...state, loading: false, product: action.payload };
        case "FETCH_ERROR": return { ...state, error: action.payload, loading: false }
        default: return state;
    }
}
const ProductScreen = () => {
    const params = useParams();
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const navigate = useNavigate();

    const { slug } = params;
    const [{ loading, error, product }, dispatch] = useReducer(reducer, { loading: true, error: "", product: {} })
    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch({ type: "FETCH_REQUEST" })
                const result = await axios.get(`/api/product/slug/${slug}`);
                dispatch({ type: "FETCH_SUCCESS", payload: result.data })
            } catch (error) {
                dispatch({ type: "FETCH_ERROR", payload: GetError(error) })
            }
        }
        fetchData();
    }, [slug])
    const addToCartHandler = async () => {
        const existItem = state.cart.cartItems.find(item => item._Id === product._Id)
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/product/${product._Id}`)
        if (data.countInStock < quantity) {
            window.alert('sorry , product is out of stock')
            return;
        }
        ctxDispatch({ type: "ADD_ITEMS_IN_CART", payload: { ...product, quantity } })
        navigate('/cart')
    }
    return (
        <>
            <section>
                <div className="container">
                    <Helmet>
                        <title>{product.slug}</title>
                    </Helmet>
                    <div className="row">
                        {loading ? (
                            <div className='d-flex justify-content-center align-items-center'>

                                <div className="spinner-border" role={"status"}>
                                    <span className='visually-hidden'>loading...</span>
                                </div>
                            </div>
                        ) :
                            error ? (<div className='alert alert-danger'>{error}</div>) :
                                (
                                    <>
                                        <div className="col-md-6">
                                            <div>
                                                <img width="100%" src={product.image} alt={product.name} />
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div>
                                                <h2>{product.name}</h2>
                                                <hr />
                                                <Rattings rating={product.rating} numReviews={product.numReviews} />
                                                <hr />
                                                <p><strong>Description:</strong> {product.description}</p>
                                                <hr />
                                            </div>

                                        </div>
                                        <div className="col-md-3">
                                            <div style={{ display: "flex", justifyContent: "space-between", border: "1px solid gray", padding: "10px 10px" }}>
                                                <div>
                                                    <strong>Price : </strong>
                                                </div>
                                                <div>
                                                    <strong className='text-end'><span>₹{product.price}</span></strong>
                                                </div>
                                            </div>
                                            <div style={{ display: "flex", justifyContent: "space-between", border: "1px solid gray", borderTop: "0", padding: "10px 10px" }}>
                                                <div>
                                                    <strong>status : </strong>
                                                </div>
                                                <div>
                                                    <strong className='text-end'>
                                                        {product.countInStock > 0 ? (<span className="badge bg-success">In Stock</span>) : (<span className="badge bg-danger">Out Of Stock</span>)}

                                                    </strong>
                                                </div>
                                            </div>
                                            {product.countInStock > 0 && (
                                                <div style={{ border: "1px solid gray", borderTop: "0", padding: "10px 10px" }}>
                                                    <button style={{ width: "100%" }} onClick={addToCartHandler}>Add to Cart</button>
                                                </div>
                                            )}


                                        </div>
                                    </>
                                )}
                    </div>
                </div>
            </section>
        </>
    )
}

export default ProductScreen