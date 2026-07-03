import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "@jest/globals";
import { Provider } from "react-redux";
import { configureStore, PreloadedState } from "@reduxjs/toolkit";
import cartReducer from "../features/cartSlice";
import ProductCard from "../components/ProductCard/ProductCard";
import type { RootState } from "../app/store";
import type { Product } from "../types/types";

// Mock the Rating component to avoid SVG errors in jsdom
jest.mock("@smastrom/react-rating", () => ({
  Rating: () => <div>Rating</div>,
}));

// Mock Product for testing
const mockProduct: Product = {
  id: "1",
  title: "Test Product",
  price: 29.99,
  description: "A test product",
  category: "electronics",
  image: "https://via.placeholder.com/100",
  rating: { rate: 4.5, count: 100 },
};

// Helper function to create a test store
const createTestStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: {
      cart: cartReducer,
    },
    preloadedState: preloadedState as any,
  });
};

describe("Cart Integration Test - Add Product to Cart", () => {
  let store: ReturnType<typeof createTestStore>;

  beforeEach(() => {
    store = createTestStore({ cart: [] });
  });

  it("should add a product to the cart when Add to Cart button is clicked", () => {
    const mockOnDelete = jest.fn();
    const mockOnEdit = jest.fn();

    render(
      <Provider store={store}>
        <ProductCard
          product={mockProduct}
          onDelete={mockOnDelete}
          onEdit={mockOnEdit}
        />
      </Provider>,
    );

    // Verify the Add to Cart button is rendered
    const addToCartButton = screen.getByText("Add to Cart");
    expect(addToCartButton).toBeInTheDocument();

    // Click the Add to Cart button
    fireEvent.click(addToCartButton);

    // Get the updated cart state
    const state = store.getState();
    const cartItems = state.cart;

    // Assert that the product was added to the cart
    expect(cartItems).toHaveLength(1);
    expect(cartItems[0]).toMatchObject({
      id: mockProduct.id,
      title: mockProduct.title,
      price: mockProduct.price,
      count: 1,
    });
  });

  it("should increment count when the same product is added twice", () => {
    const mockOnDelete = jest.fn();
    const mockOnEdit = jest.fn();

    const { rerender } = render(
      <Provider store={store}>
        <ProductCard
          product={mockProduct}
          onDelete={mockOnDelete}
          onEdit={mockOnEdit}
        />
      </Provider>,
    );

    // First click
    fireEvent.click(screen.getByText("Add to Cart"));

    // Verify first addition
    let state = store.getState();
    expect(state.cart).toHaveLength(1);
    expect(state.cart[0].count).toBe(1);

    // Second click (rerender to ensure fresh component state)
    rerender(
      <Provider store={store}>
        <ProductCard
          product={mockProduct}
          onDelete={mockOnDelete}
          onEdit={mockOnEdit}
        />
      </Provider>,
    );

    fireEvent.click(screen.getByText("Add to Cart"));

    // Verify count was incremented
    state = store.getState();
    expect(state.cart).toHaveLength(1);
    expect(state.cart[0].count).toBe(2);
  });
});
