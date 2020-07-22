import React from "react";
import Header from "./Header";
import renderer from "react-test-renderer";
import { render } from "../../../test-utils";
import { HashRouter as Router, Route } from "react-router-dom";

test("Header should render links for unauthenticated users.", () => {
  const initialState = {
    user: {
      isAuthenticated: false,
      isAdmin: false,
      username: null,
    },
  };

  const component = render(
    <Router>
      <Header />
    </Router>,
    { initialState: initialState }
  );

  let tree = component.container;
  expect(tree).toMatchSnapshot();
});

test("Header should render links for authenticated non-admin users.", () => {
  const initialState = {
    user: {
      isAuthenticated: true,
      isAdmin: false,
      username: "User",
    },
  };

  const component = render(
    <Router>
      <Header />
    </Router>,
    { initialState: initialState }
  );

  let tree = component.container;
  expect(tree).toMatchSnapshot();
});

test("Header should render links for authenticated admin users.", () => {
  const initialState = {
    user: {
      isAuthenticated: true,
      isAdmin: false,
      username: "Admin",
    },
  };

  const component = render(
    <Router>
      <Header />
    </Router>,
    { initialState: initialState }
  );

  let tree = component.container;
  expect(tree).toMatchSnapshot();
});

