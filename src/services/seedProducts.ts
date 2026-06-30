// src/services/seedProducts.ts
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import type { Product } from "../types/types";

export async function seedProductsFromFakeStore() {
  const response = await fetch("https://fakestoreapi.com/products");
  const products: Product[] = await response.json();

  for (const product of products) {
    await addDoc(collection(db, "products"), {
      title: product.title,
      price: product.price,
      category: product.category,
      description: product.description,
      image: product.image,
      rating: product.rating,
    });
  }

  alert("Products added to Firestore!");
}
