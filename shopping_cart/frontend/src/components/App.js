import React, { Component } from "react";
import "../components/css/Forms.css";
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import ReactDOM from "react-dom";

import Header from "./layout/Header.js";
import Alerts from "./layout/Alerts.js";
import ProductsList from "./products/ProductsList.js";
import AddProduct from "./products/AddProduct.js";
import RegisterUser from "./users/RegisterUser.js";
import LoginUser from "./users/LoginUser.js";
import Cart from './cart/Cart.js';

import { Provider } from "react-redux";
import store from "../store";

const alertOptions = {
  timeout: 3000,
  position: 'bottom center'
}

class App extends Component {
  render() {
    return (
      <Router>
        <Provider store={store}>
          <Header />
          <AlertProvider template={AlertTemplate} {...alertOptions}>
            <Alerts />
            <div className="container" style={{paddingTop: "5rem"}}>
              <Route exact path="/" component={ProductsList} />
              <Route exact path="/add-product" component={AddProduct} />
              <Route exact path="/register" component={RegisterUser} />
              <Route exact path="/login" component={LoginUser} />
              <Route exact path="/cart" component={Cart} />
            </div>
          </AlertProvider>
        </Provider>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));

export default App;
