import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { describe, expect, it, vi } from "vitest";
import ProductCard from "../components/ProductCard/ProductCard";
import cartReducer from "../features/cartSlice";
import type { Product } from "../types/types";

vi.mock("@smastrom/react-rating", () => ({
  Rating: () => <div data-testid="rating" />,
}));

const product: Product = {
  id: "1",
  title: "Test Product",
  price: 19.99,
  description: "A test product",
  category: "electronics",
  image: "https://example.com/product.png",
  rating: { rate: 4.5, count: 20 },
};

function renderProductCard() {
  const store = configureStore({
    reducer: {
      cart: cartReducer,
    },
  });

  return {
    store,
    ...render(
      <Provider store={store}>
        <ProductCard product={product} onDelete={vi.fn()} onEdit={vi.fn()} />
      </Provider>,
    ),
  };
}

describe("ProductCard", () => {
  it("renders product details and the add to cart button", () => {
    renderProductCard();

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText(/Price:/)).toHaveTextContent("Price: 19.99");
    expect(
      screen.getByRole("button", { name: /add to cart/i }),
    ).toBeInTheDocument();
  });

  it("adds the product to the cart when the button is clicked", () => {
    const { store } = renderProductCard();

    fireEvent.click(screen.getByRole("button", { name: /add to cart/i }));

    expect(store.getState().cart).toHaveLength(1);
    expect(store.getState().cart[0]).toMatchObject({ id: "1", count: 1 });
  });
});
