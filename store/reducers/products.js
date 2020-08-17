import PRODUCTS from '../../data/dummy-data';
import { DELETE_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT } from '../actions/products';
import Product from '../../models/product';

const initialState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1')
}

export default (state= initialState, action) => {
    switch(action.type) {
        case CREATE_PRODUCT:
            // const tempObj = {
            //    title: action.productData.title,
            //    image: action.productData.imageUrl,
            //    desc: action.productData.description,
            //    price: action.productData.price 
            // };
            // console.log(tempObj);
            const newProduct = new Product(
                new Date().toString(),
                'u1',
                action.productData.title,
                action.productData.imageUrl,
                action.productData.description,
                action.productData.price 
            );
            console.log(newProduct);
            return {
                availableProducts: state.availableProducts.concat(newProduct),
                userProducts: state.userProducts.concat(newProduct)
            } 
        case UPDATE_PRODUCT:
            const userProductIndex = state.userProducts.findIndex(
                product => product.id === action.pid
            );
            const availableProductIndex = state.availableProducts.findIndex(
                product => product.id === action.pid
            );
            const updatedProduct = new Product(
                action.pid,
                state.userProducts[userProductIndex].ownerId,
                action.productData.title,
                action.productData.imageUrl,
                action.productData.description,
                action.productData.price
            );
            
            const updatedUserProducts = state.userProducts;
            const updatedAvailableProducts = state.availableProducts;
            updatedUserProducts.splice(userProductIndex, 1, updatedProduct);
            updatedAvailableProducts.splice(availableProductIndex, 1, updatedProduct);
            // console.log("Updated Available products", updatedAvailableProducts);
            return {
                userProducts: updatedUserProducts,
                availableProducts: updatedAvailableProducts
            }
        case DELETE_PRODUCT: 
            return {
                ...state,
                availableProducts: state.availableProducts.filter(
                    product => product.id != action.pid
                ),
                userProducts: state.userProducts.filter(
                    product => product.id != action.pid
                )
            }
    }
    return state;
}