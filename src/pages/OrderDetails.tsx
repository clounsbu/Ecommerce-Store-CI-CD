import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getOrderById } from "../services/OrderServices";

function OrderDetails() {
  const { orderId } = useParams();

  const {
    data: order,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getOrderById(orderId!),
    enabled: !!orderId,
  });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Error loading order.</h2>;
  }

  if (!order) {
    return <h2>Order not found.</h2>;
  }

  return (
    <div className="container mt-4">
      <h1>Order Details</h1>

      <h4>Order ID</h4>
      <p>{order.id}</p>

      <h4>Total Price</h4>
      <p>${order.totalPrice.toFixed(2)}</p>

      <h4>Products</h4>

      {order.items.map((item) => (
        <div key={item.id} className="card p-3 mb-3">
          <h5>{item.title}</h5>

          <img src={item.image} width="120" alt={item.title} />

          <p>Price: ${item.price}</p>

          <p>Quantity: {item.count}</p>
        </div>
      ))}
    </div>
  );
}

export default OrderDetails;
