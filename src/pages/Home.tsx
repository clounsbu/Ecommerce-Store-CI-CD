import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProducts } from "../services/productService";
import type { Product } from "../types/types";
import type { RootState } from "../app/store";
import ProductCard from "../components/ProductCard/ProductCard";
import { deleteProduct } from "../services/productService";
import ProductForm from "../components/ProductForm/ProductForm";

function Home() {
  const [showProductForm, setShowProductForm] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const cart = useSelector((state: RootState) => state.cart);
  const totalProducts = cart.reduce((total, item) => total + item.count, 0);

  const queryClient = useQueryClient();

  async function handleDelete(id: string) {
    await deleteProduct(id);
    queryClient.invalidateQueries({ queryKey: ["products"] });
  }

  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading products</div>;
  }

  // Get unique categories from products
  const categories = ["all", ...new Set(products.map((p) => p.category))];

  // Filter products based on selected category
  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="container">
      <nav className="navbar">
        <h3>Grey Ghost Shopping Center</h3>

        <Link to="/cart">
          <button>Cart ({totalProducts})</button>
        </Link>
      </nav>
      <button
        className="btn btn-success my-3"
        onClick={() => {
          setShowProductForm(!showProductForm);
          if (showProductForm) {
            setProductToEdit(null);
          }
        }}
      >
        {showProductForm ? "Cancel" : "Add Product"}
      </button>
      {showProductForm && (
        <ProductForm
          productToEdit={productToEdit}
          onProductAdded={() => {
            setShowProductForm(false);
            setProductToEdit(null);
          }}
        />
      )}
      <div className="my-3">
        <label htmlFor="category-filter" className="me-2">
          Filter by Category:
        </label>
        <select
          id="category-filter"
          className="form-select d-inline-block w-auto"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>
      <div className="d-flex flex-wrap gap-3 justify-content-center">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={() => {
              setProductToEdit(product);
              setShowProductForm(true);
            }}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
