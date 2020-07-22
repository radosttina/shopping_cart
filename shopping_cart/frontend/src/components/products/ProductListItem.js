import React, { Component } from "react";
import PropTypes from "prop-types";

export class ProductListItem extends Component {
  render() {
    return (
      <li key={this.props.product.id} className="product_list_item">
        <span> {this.props.product.name} </span>
        <button className="remove_from_cart_btn" onClick={this.props.onDeleteItem.bind(this, this.props.product.id)}>Remove</button>
      </li>
    );
  }
}

ProductListItem.propTypes = {
  product: PropTypes.object.isRequired
}

export default ProductListItem;
