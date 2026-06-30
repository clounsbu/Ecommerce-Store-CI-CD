import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import type { Product } from "../../types/types";
import { createProduct, updateProduct } from "../../services/productService";

type ProductFormProps = {
  onProductAdded?: () => void;
  productToEdit?: Product | null;
};

function ProductForm({ onProductAdded, productToEdit }: ProductFormProps) {
  const queryClient = useQueryClient();

  const [title, setTitle] = useState(productToEdit?.title || "");
  const [image, setImage] = useState(productToEdit?.image || "");
  const [price, setPrice] = useState(productToEdit?.price.toString() || "");
  const [category, setCategory] = useState(productToEdit?.category || "");
  const [description, setDescription] = useState(
    productToEdit?.description || "",
  );
  const [rating, setRating] = useState(
    productToEdit?.rating?.rate?.toString() || "",
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const productData = {
      title,
      image,
      price: Number(price),
      category,
      description,
      rating: {
        rate: rating ? Number(rating) : 0,
        count: productToEdit?.rating?.count || 0,
      },
    };

    if (productToEdit) {
      await updateProduct(productToEdit.id as string, productData);
    } else {
      await createProduct(productData);
    }

    queryClient.invalidateQueries({ queryKey: ["products"] });

    setTitle("");
    setPrice("");
    setCategory("");
    setDescription("");
    setImage("");
    setRating("");

    onProductAdded?.();
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex flex-column gap-2 mb-4">
      <h2>{productToEdit ? "Edit Product" : "Add Product"}</h2>

      <input
        type="text"
        placeholder="Product title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="number"
        placeholder="Rating"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        min={0}
        max={5}
        step={0.1}
      />

      <button type="submit">
        {productToEdit ? "Update Product" : "Add Product"}
      </button>
    </form>
  );
}

export default ProductForm;
