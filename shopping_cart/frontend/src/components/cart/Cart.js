import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getCartProducts,
  removeProductFromCart,
} from "../../actions/products.js";
import "./Cart.css";
import ProductListItem from "../products/ProductListItem.js";

export class Cart extends Component {
  removeProductFromCart = (productId) => {
    this.props.removeProductFromCart(productId);
  };

  componentDidMount() {
    this.props.getCartProducts();
  }

  render() {
    if (!this.props.isAuthenticated) {
      return <Redirect to="/login" />;
    }
    return (
      <ul className="cart_products_list">
        <h3>Shopping cart content</h3>
        {this.props.cart_products.map((product) => (
          <ProductListItem
            key={product.id}
            product={product}
            onDeleteItem={this.removeProductFromCart}
          />
        ))}
      </ul>
    );
  }
}

const mapStateToProps = (state) => ({
  cart_products: state.products.cart_products,
  isAuthenticated: state.user.isAuthenticated,
});

export default connect(mapStateToProps, {
  getCartProducts,
  removeProductFromCart,
})(Cart);
