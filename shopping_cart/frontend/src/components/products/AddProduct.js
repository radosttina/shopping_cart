import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { addProduct } from "../../actions/products";

import "./AddProduct.css";

export class AddProduct extends Component {
  state = {
    name: "",
    price: 0,
    provider: "",
    image: null,
  };

  onChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
  }

  onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      this.setState({
        image: img,
      });
    }
  };

  onSubmit = e => {
    e.preventDefault();
    let product = {
      name: this.state.name,
      price: this.state.price,
      description: this.state.description,
      provider: this.state.provider,
      image: this.state.image,
    };
    
    this.props.addProduct(product, this.props.history);
  };

  render() {
    return (
      <div className="createproduct_form_wrapper">
        <form className="createproduct_form form" onSubmit={this.onSubmit}>
          <label htmlFor="name">Product name:</label>
          <input
            name="name"
            onChange={this.onChange}
            value={this.state.name}
          ></input>
          <label htmlFor="price">Price:</label>
          <input
            name="price"
            onChange={this.onChange}
            value={this.state.price}
          ></input>
          <label htmlFor="description">Description:</label>
          <textarea
            name="description"
            onChange={this.onChange}
            value={this.state.description}
          ></textarea>
          <label htmlFor="provider">Provider:</label>
          <input
            name="provider"
            onChange={this.onChange}
            value={this.state.provider}
          ></input>
          <label htmlFor="product_image" value={this.state.image}>
            Image:
          </label>
          <input
            type="file"
            name="product_image"
            onChange={this.onImageChange}
          ></input>
          <button type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

AddProduct.propTypes = {
  addProduct: PropTypes.func.isRequired
}

export default connect(null, { addProduct })(withRouter(AddProduct));
