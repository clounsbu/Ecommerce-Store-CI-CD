import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { onAuthStateChanged, type User } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebaseConfig";
import { getUserOrders } from "../services/OrderServices";

function OrderHistory() {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const {
    data: orders = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["orders", user?.uid],
    queryFn: () => getUserOrders(user!.uid),
    enabled: !!user,
  });

  if (authLoading) return <h2>Checking login...</h2>;
  if (!user) return <h2>Please log in to view orders.</h2>;
  if (isLoading) return <h2>Loading orders...</h2>;
  if (error) return <h2>Error loading orders.</h2>;

  return (
    <div className="container mt-4">
      <h1>Order History</h1>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="card p-3 my-3">
            <h3>Order ID: {order.id}</h3>
            <p>Total Price: ${order.totalPrice.toFixed(2)}</p>

            <Link to={`/orders/${order.id}`}>View Details</Link>
          </div>
        ))
      )}
    </div>
  );
}

export default OrderHistory;
