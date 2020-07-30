import React from "react";
import Cart from "./Cart";
import renderer from "react-test-renderer";
import { render } from "../../../test-utils";
import { HashRouter as Router, Route } from "react-router-dom";

test("Cart should render cart products list for authenticated users.", () => {
  const initialState = {
    products: { cart_products: [{ id: 1, name: "Product" }] },
    user: { isAuthenticated: true },
  };

  const component = render(
    <Router>
      <Route exact path="/">
        <Cart />
      </Route>
    </Router>,
    { initialState: initialState }
  );

  let tree = component.container;
  expect(tree).toMatchSnapshot();
});

test("Cart should not show cart product if the user is not authenticated.", () => {
  const initialState = {
    products: { cart_products: [{ id: 1, name: "Product" }] },
    user: { isAuthenticated: false },
  };

  const component = render(
    <Router>
      <Route exact path="/">
        <Cart />
      </Route>
    </Router>,
    { initialState: initialState }
  );

  let tree = component.container;
  expect(tree).toMatchSnapshot();
});
