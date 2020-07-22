import React from "react";
import ProductCard from "./ProductCard";
import renderer from "react-test-renderer";
import { render } from "../../../test-utils";

test("ProductCard should render product details.", () => {
  const product = { id: 1, name: "Product", "price": 1000.00};

  const component = render(
    <ProductCard product={product} onClick={()=>{}}></ProductCard>
  );

  let tree = component.container;
  expect(tree).toMatchSnapshot();
});