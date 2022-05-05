import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Rattings from './Rattings';
import { Store } from './Store';

const Product = (props) => {
    const { product } = props;
    const { state, dispatch: ctxdispatch } = useContext(Store);
    const { cart: { cartItems } } = state
    const updateQuantity = (item) => {
        const existItem = cartItems.find(x => x._Id === product._Id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        ctxdispatch({ type: "ADD_ITEMS_IN_CART", payload: { ...item, quantity } })
    }
    return (
        <div className="card">
            <Link to={`/product/${product.slug}`}>
                <img className='card-img-top' src={product.image} alt={product.name} />
            </Link>
            <div className="card-body">
                <p className='card-title'>

                    <Link to={`/product/${product.slug}`}>

                        {product.name}</Link>
                </p>
                <p className='card-text'><strong>₹{product.price}</strong></p>
                <Rattings rating={product.rating} numReviews={product.numReviews} />
                {product.countInStock === 0
                    ?
                    <button className='btn btn-danger fw-bold' disabled>Currently Unavailable</button>
                    :
                    <button onClick={() => updateQuantity(product, 1)}>Add To Cart</button>

                }
            </div>
        </div>
    )
}

export default Product