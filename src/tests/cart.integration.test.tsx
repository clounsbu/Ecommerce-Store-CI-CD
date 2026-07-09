import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ProductCard from "../components/ProductCard/ProductCard";
import ShoppingCart from "../pages/ShoppingCart";
import cartReducer from "../features/cartSlice";
import type { Product } from "../types/types";
import { MemoryRouter } from "react-router-dom";

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

function renderCartFlow() {
  const store = configureStore({
    reducer: {
      cart: cartReducer,
    },
  });

  return render(
    <Provider store={store}>
      <MemoryRouter>
        <ProductCard product={product} onDelete={() => {}} onEdit={() => {}} />
        <ShoppingCart />
      </MemoryRouter>
    </Provider>,
  );
}

describe("Cart integration", () => {
  beforeEach(() => {
    sessionStorage.clear();
    vi.restoreAllMocks();
  });

  it("updates the cart when a product is added", () => {
    renderCartFlow();

    fireEvent.click(screen.getByRole("button", { name: /add to cart/i }));

    expect(screen.getByText(/Quantity: 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Products: 1/i)).toBeInTheDocument();
  });
});
