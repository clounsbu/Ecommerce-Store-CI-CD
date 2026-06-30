import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, checkout } from "../features/cartSlice";
import { useEffect, type SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import type { CartItem } from "../types/types";
import type { RootState, AppDispatch } from "../app/store";
import {auth} from "../firebaseConfig";
import { createOrder } from "../services/OrderServices";

function ShoppingCart() {
  const cart: CartItem[] = useSelector((state: RootState) => state.cart);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const totalProducts = cart.reduce(
    (total: number, item) => total + item.count,
    0,
  );

  const totalPrice = cart.reduce(
    (total: number, item) => total + item.price * item.count,
    0,
  );
const handleCheckout = async () => {
  const user = auth.currentUser;

  if (!user) {
    alert("You must be logged in to checkout.");
    return;
  }

  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  await createOrder(user.uid, user.email || "", cart, totalPrice);

  dispatch(checkout());
  sessionStorage.removeItem("cart");

  alert("Order placed successfully!");
};

  return (
    <div className="text-center">
      <h1>Shopping Cart</h1>
      <Link to="/">
        <button>Continue Shopping</button>
      </Link>

      {cart.map((item) => (
        <div
          key={item.id}
          className="p-4 d-flex align-items-center justify-content-center shadow w-50 mx-auto gap-4"
        >
          <div>
            <img
              src={item.image}
              alt={item.title}
              width="50"
              onError={(e: SyntheticEvent<HTMLImageElement, Event>) => {
                const target = e.currentTarget;
                target.src = "https://via.placeholder.com/100";
              }}
            />

            <p>Price: ${item.price}</p>

            <p>Quantity: {item.count}</p>

            <button onClick={() => dispatch(removeFromCart(item.id))}>
              Remove
            </button>
          </div>
          <div>
            <p>{item.title}</p>
          </div>
        </div>
      ))}

      <h2>Total Products: {totalProducts}</h2>

      <h2>Total Price: ${totalPrice.toFixed(2)} </h2>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
}

export default ShoppingCart;
