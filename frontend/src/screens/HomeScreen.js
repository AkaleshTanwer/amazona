import React, { useEffect, useReducer } from 'react'
import axios from "axios";
import Product from '../components/Product';
import { Helmet } from 'react-helmet-async';
import GetError from '../components/GetError';
const reducer = (state, action) => {
    switch (action.type) {
        case "FETCH_REQUEST": return { ...state, loading: true };
        case "FETCH_SUCCESS": return { ...state, loading: false, products: action.payload };
        case "FETCH_ERROR": return { ...state, error: action.payload, loading: false }
        default: return state;
    }
}
const HomeScreen = () => {

    const [{ loading, error, products }, dispatch] = useReducer(reducer, { loading: true, error: "", products: [] })
    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch({ type: "FETCH_REQUEST" })
                const result = await axios.get('/api/products');
                dispatch({ type: "FETCH_SUCCESS", payload: result.data })


            } catch (error) {
                dispatch({ type: "FETCH_ERROR", payload: GetError(error) })
            }
        }
        fetchData();
    }, [])
    return (

        <section>
            <div className="container">
                <Helmet>
                    <title>Amazona</title>
                </Helmet>
                <h1>Featured Products</h1>
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
                                products.map(product => {
                                    return (
                                        <div className="col-sm-6 col-md-4 col-lg-3 " key={product.slug}>
                                            <Product product={product} />

                                        </div>
                                    )
                                })
                            )}
                </div>
            </div>
        </section>
    )
}

export default HomeScreen