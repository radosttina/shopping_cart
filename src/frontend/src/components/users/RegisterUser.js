import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { registerUser } from "../../actions/users";

class RegisterUser extends Component {
  state = {
    username: "",
    email: "",
    password1: "",
    password2: "",
  };

  onChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.password1 === this.state.password2) {
      const newUser = {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password1,
      };

      this.props.registerUser(newUser);
    } else {
      console.log("Passwords do not match!");
    }
  };

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <form className="form" onSubmit={this.onSubmit}>
          <h2>Register</h2>
          <label htmlFor="username">Username:</label>
          <input
            name="username"
            onChange={this.onChange}
            value={this.state.name}
          ></input>
          <label htmlFor="email">Email:</label>
          <input
            name="email"
            onChange={this.onChange}
            value={this.state.email}
          ></input>
          <label htmlFor="password1">Password:</label>
          <input
            name="password1"
            type="password"
            onChange={this.onChange}
            value={this.state.password1}
          ></input>
          <label htmlFor="password2" type="password">
            Confirm Password:
          </label>
          <input
            name="password2"
            type="password"
            onChange={this.onChange}
            value={this.state.password2}
          ></input>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
});

export default connect(mapStateToProps, { registerUser })(RegisterUser);
