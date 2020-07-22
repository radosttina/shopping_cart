import {GET_PRODUCTS, CREATE_PRODUCT, GET_CART_PRODUCTS, REMOVE_FROM_CART} from '../actions/types';

export const initialState = {
    products: [],
    cart_products: []
}

export default function(state=initialState, action) {
    switch(action.type){
        case REMOVE_FROM_CART:
        case GET_CART_PRODUCTS:
            return {
                ...state,
                cart_products: action.payload
            }
        case GET_PRODUCTS:
            return {
                ...state,
                products: action.payload
            }
        case CREATE_PRODUCT:
            return {
                ...state,
                product: action.payload
            }
        default:
            return state
    }
}