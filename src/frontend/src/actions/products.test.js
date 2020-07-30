import fetchMock from "fetch-mock";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import * as productsActions from "./products";
import * as productsReducer from "../reducers/products";
import { GET_PRODUCTS } from "./types";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Product actions", () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it("Dispatches GET_PRODUCTS after fetching all products", () => {
    const response = [
      {
        id: 27,
        name: "PC 001",
        price: "1050.00",
        description: "PC RAM 8GB Intel",
        provider: "PCWare",
        product_image: "img.png",
      },
    ];

    const mock = new MockAdapter(axios);
    mock.onGet("/api/products").reply(200, { products: response });

    const expectedActions = [
      { type: GET_PRODUCTS, payload: { products: response } },
    ];

    const store = mockStore({ products: [] });

    return store.dispatch(productsActions.getProducts()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
