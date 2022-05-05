import { createContext, useReducer } from "react";

export const Store = createContext()
const initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem("cartItems")) : []
    }
}

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD_ITEMS_IN_CART":
            const newItem = action.payload;
            const existItem = state.cart.cartItems.find(item => item._Id === newItem._Id)
            const cartItems = existItem
                ? (
                    state.cart.cartItems.map(x => x._Id === existItem._Id ? newItem : x))
                : ([...state.cart.cartItems, newItem])
            localStorage.setItem('cartItems', JSON.stringify(cartItems))
            return { ...state, cart: { ...state.cart, cartItems } }

        case "REMOVE_ITEM": {
            const deleteItem = action.payload;
            const cartItems = state.cart.cartItems.filter(item => item._Id !== deleteItem._Id);
            localStorage.setItem('cartItems', JSON.stringify(cartItems))

            return { ...state, cart: { ...state.cart, cartItems } }
        }

        default: return state;
    }
}


export const StoreProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    return <Store.Provider value={{ state, dispatch }}>{props.children}</Store.Provider>
} 
