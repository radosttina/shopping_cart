import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loginUser } from "../../actions/users";
import { Redirect } from "react-router-dom";

class LoginUser extends Component {
  state = {
    username: "",
    password: ""
  };

  onChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.loginUser({
        username: this.state.username,
        password: this.state.password
    });
  };

  render() {
    if (this.props.isAuthenticated) {
        return(
            <Redirect to="/"/>
        )
    }

    return (
      <div>
        <form className="form" onSubmit={this.onSubmit}>
          <h2>Login</h2>
          <label htmlFor="username">Username:</label>
          <input
            name="username"
            onChange={this.onChange}
            value={this.state.name}
          ></input>
          <label htmlFor="password">Password:</label>
          <input
            name="password"
            type="password"
            onChange={this.onChange}
            value={this.state.password1}
          ></input>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
    isAuthenticated: state.user.isAuthenticated
});

export default connect(mapStateToProps, { loginUser })(LoginUser);
