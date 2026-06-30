import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import type { Product } from "../types/types";

const productsRef = collection(db, "products");

export async function getProducts(): Promise<Product[]> {
  const snapshot = await getDocs(productsRef);

  return snapshot.docs.map((docSnap) => {
    const data = docSnap.data() as Omit<Product, "id">;
    return {
      id: docSnap.id,
      ...data,
      rating: data.rating ?? { rate: 0, count: 0 },
    };
  });
}

export async function createProduct(product: Omit<Product, "id">) {
  return addDoc(productsRef, product);
}

export async function updateProduct(id: string, product: Partial<Product>) {
  const productDoc = doc(db, "products", id);
  return updateDoc(productDoc, product);
}

export async function deleteProduct(id: string) {
  const productDoc = doc(db, "products", id);
  return deleteDoc(productDoc);
}
