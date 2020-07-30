import axios from "axios";

import {
  GET_PRODUCTS,
  CREATE_PRODUCT,
  GET_CART_PRODUCTS,
  ADD_TO_CART,
  REMOVE_FROM_CART,
} from "./types";
import { tokenConfig } from "./users.js";
import { returnErrors, createMessage } from "./messages";

export const getProducts = (searchValue="") => (dispatch, getState) => {
  const searchParams = searchValue ? "?search=" + searchValue : "";
  return axios
    .get("/api/products" + searchParams)
    .then((res) => {
      dispatch({
        type: GET_PRODUCTS,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const addProduct = (product, history) => (dispatch, getState) => {
  const formData = new FormData();

  for (let item in product) {
    if (item === "image") {
      formData.append("product_image", product[item]);
    } else {
      formData.append(item, product[item]);
    }
  }

  axios
    .post("/api/products/", formData, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: CREATE_PRODUCT,
        payload: res.data,
      });
      dispatch(
        createMessage({ productCreated: "Product created successfully!" })
      );
      history.push("/");
    })
    .catch((err) => {
      err.response && dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const getCartProducts = () => (dispatch, getState) => {
  axios.get("/api/cart/products", tokenConfig(getState))
  .then((res) => {
    dispatch({
      type: GET_CART_PRODUCTS,
      payload: res.data,
    });
  })
  .catch((err) => {
    err.response && dispatch(returnErrors(err.response.data, err.response.status));
  });
};

export const addProductToCart = (product_id) => (dispatch, getState) => {
  axios
    .post("/api/cart/update", { product_id: product_id }, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: ADD_TO_CART,
        payload: res.data,
      });
      dispatch(createMessage({ productCreated: "Product added to cart!" }));
    });
};

export const removeProductFromCart = (product_id) => (dispatch, getState) => {
  let config = tokenConfig(getState);
  config["data"] = { product_id: product_id };
  axios.delete("/api/cart/update", config).then((res) => {
    dispatch({
      type: REMOVE_FROM_CART,
      payload: res.data,
    });
    dispatch(createMessage({ productCreated: "Product removed from cart!" }));
  });
};
