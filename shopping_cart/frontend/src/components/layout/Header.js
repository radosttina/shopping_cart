import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect, ReactReduxContext } from "react-redux";
import { logoutUser } from "../../actions/users.js";
import PropTypes from "prop-types";
import "./Header.css";

class Header extends Component {
  render() {
    const guestLinks = (
      <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
        <li className="nav-item">
          <Link to="/register" className="nav-link">
            Register
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
      </ul>
    );

    const userLinks = (
      <React.Fragment>
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          {this.props.isAdmin ? (
            <li className="nav-item">
              <Link to="/add-product" className="nav-link">
                Add Product
              </Link>
            </li>
          ) : (
            ""
          )}

          <li className="nav-item">
            <Link to="/cart" className="nav-link glyphicon glyphicon-shopping-cart">
              <span className="glyphicon glyphicon-shopping-cart">Cart</span>
            </Link>
          </li>
        </ul>
        <span>{this.props.username ? `Hi, ${this.props.username}  ` : ""}</span>
        <button className="nav-link logout_btn" onClick={this.props.logoutUser}>
          Logout
        </button>
      </React.Fragment>
    );

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between nav-bar-position">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo03"
          aria-controls="navbarTogglerDemo03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <Link to="/" className="navbar-brand">
          Shoppify
        </Link>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          {this.props.isAuthenticated ? userLinks : guestLinks}
        </div>
      </nav>
    );
  }
}

Header.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  isAdmin: PropTypes.bool,
  username: PropTypes.string
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
  isAdmin: state.user.is_superuser,
  username: state.user.username,
});

export default connect(mapStateToProps, { logoutUser })(Header);
