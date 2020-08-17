import { ADD_TO_CART, REMOVE_FROM_CART, REDUCE_ITEM_QUANTITY, INCREASE_ITEM_QUANTITY } from "../actions/cart";
import CartItem from "../../models/cart-item";
import { ADD_ORDER } from "../actions/order";
import { DELETE_PRODUCT } from "../actions/products";


const initialState = {
    items: {},
    totalAmount: 0
};

export default (state=initialState, action) => {
    let selectedItem;
    switch(action.type) {
        case ADD_TO_CART:
            const addedProduct = action.product;
            const price = addedProduct.price;
            const title = addedProduct.title;
            const imageUrl = addedProduct.imageUrl
            
            if(state.items[addedProduct.id]) {
                const updatedCartItem = new CartItem(
                    state.items[addedProduct.id].quantity + 1,
                    price,
                    title,
                    imageUrl,
                    state.items[addedProduct.id].sum + price
                );
                return {
                    ...state,
                    items: {
                        ...state.items,
                        [addedProduct.id]: updatedCartItem
                    },
                    totalAmount: state.totalAmount + price
                }
            } else {
                const newCartItem = new CartItem(1, price, title, imageUrl, price);
                return {
                    ...state,
                    items: {
                        ...state.items,
                        [addedProduct.id]: newCartItem
                    },
                    totalAmount: state.totalAmount + price
                }
            }
        case INCREASE_ITEM_QUANTITY:
            selectedItem = state.items[action.pid];
            const updatedCartItem = new CartItem(
                selectedItem.quantity + 1,
                selectedItem.price,
                selectedItem.title,
                selectedItem.imageUrl,
                selectedItem.sum + selectedItem.price
            );
            return {
                ...state,
                items: {
                    ...state.items,
                    [action.pid]: updatedCartItem
                },
                totalAmount: Math.abs(state.totalAmount + selectedItem.price)
            }
        case REMOVE_FROM_CART: 
        case DELETE_PRODUCT:
            selectedItem = state.items[action.pid];
            if(selectedItem) {
                updatedCartItems = { ...state.items };
                delete updatedCartItems[action.pid];
                return {
                    ...state,
                    items: {
                        ...updatedCartItems
                    },
                    totalAmount: Math.abs(state.totalAmount - selectedItem.price * selectedItem.quantity)
                }
            }
            return state;
        case REDUCE_ITEM_QUANTITY: 
            const selectedCartItem = state.items[action.pid];
            const currentQuantity = selectedCartItem.quantity;
            let updatedCartItems = {};
            if(currentQuantity > 1) {
                const updatedCartItem = new CartItem(
                    selectedCartItem.quantity - 1,
                    selectedCartItem.price,
                    selectedCartItem.title,
                    selectedCartItem.imageUrl,
                    selectedCartItem.sum - selectedCartItem.price 
                );
                updatedCartItems = {
                    ...state.items,
                    [action.pid]: updatedCartItem
                }
            } else {
                updatedCartItems = { ...state.items };
                delete updatedCartItems[action.pid];
            }
            return {
                ...state,
                items: updatedCartItems,
                totalAmount: Math.abs(state.totalAmount - selectedCartItem.price)
            }
        case ADD_ORDER:
            return initialState;
        default: 
            return state;
    }
}