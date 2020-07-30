import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProducts, addProductToCart } from "../../actions/products.js";
import "./ProductsList.css";
import ProductCard from "./ProductCard.js";

export class ProductsList extends Component {
  state = {
    searchValue: "",
  };

  addToCart = (productId) => {
    this.props.addProductToCart(productId);
  };

  componentDidMount() {
    this.props.getProducts();
  }

  debounce = (func, delay, callback) => {
    debugger
    let timeout = null
    return (...args) => {
      clearTimeout(timeout)
      timeout = setTimeout( () => func(...args), delay)
    }
  }

  onChange = (e) => {
    this.setState({ searchValue: e.target.value });
    this.debounce(this.props.getProducts, 1000)(e.target.value);

  };

  handleEnter = (e) => {
    if (e.key == "Enter") {
      this.props.getProducts(this.state.searchValue);
    }
  };

  render() {
    return (
      <React.Fragment>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <div class="input-group-text" id="basic-addon1" style={{position: "relative", width: "3rem"}}>
              <img style={{position: "absolute", height: "60%"}} src="../static/frontend/img/search-icon.png" />
            </div>
          </div>

          <input
            type="search"
            class="form-control"
            placeholder="Search"
            aria-describedby="basic-addon1"
            aria-label="Search input"
            onChange={this.onChange}
            onKeyPress={this.handleEnter}
            value={this.state.searchValue}
          ></input>
        </div>
        <ul className="products_list">
          {this.props.products.map((product) => (
            <ProductCard
              product={product}
              key={product.id}
              userActionText="Add to cart"
              onClick={this.addToCart}
            />
          ))}
        </ul>
      </React.Fragment>
    );
  }
}

ProductsList.propTypes = {
  getProducts: PropTypes.func.isRequired,
  addProductToCart: PropTypes.func.isRequired,
  products: PropTypes.array
}

const mapStateToProps = (state) => ({
  products: state.products.products,
});

export default connect(mapStateToProps, { getProducts, addProductToCart })(
  ProductsList
);
