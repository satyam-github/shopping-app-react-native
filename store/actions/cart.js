export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const REDUCE_ITEM_QUANTITY = 'REDUCE_ITEM_QUANTITY';
export const INCREASE_ITEM_QUANTITY = 'INCREASE_ITEM_QUANTITY';

export const addToCart = product => {
    return {
        type: ADD_TO_CART,
        product: product
    }
}

export const removeFromCart = productId => {
    return {
        type: REMOVE_FROM_CART,
        pid: productId
    }
}

export const reduceItemQuantity = productId => {
    return {
        type: REDUCE_ITEM_QUANTITY,
        pid: productId
    }
}

export const increaseItemQuantity = productId => {
    return {
        type: INCREASE_ITEM_QUANTITY,
        pid: productId
    }
}