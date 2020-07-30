import React, { Component } from "react";
import PropTypes from "prop-types";

export class ProductCard extends Component {
  render() {
    return (
      <li key={this.props.product.id} className="product_item">
        <span> {this.props.product.name} </span>
        <span> {this.props.product.price} </span>
        <img className="product_item_image" src={this.props.product.product_image} />
        <button className="add_to_cart_btn" onClick={this.props.onClick.bind(this, this.props.product.id)}>{this.props.userActionText}</button>
      </li>
    );
  }
}

ProductCard.propTypes = {
  product: PropTypes.object.isRequired
}

export default ProductCard;
