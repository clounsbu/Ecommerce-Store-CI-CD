// src/services/orderService.ts
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import type { CartItem } from "../types/types";

export interface Order {
  id: string;
  userId: string;
  userEmail: string;
  items: CartItem[];
  totalPrice: number;
  createdAt: any;
}

function getSecondsFromTimestamp(value: any): number {
  if (!value) return 0;
  // Firestore Timestamp has `seconds`
  if (
    typeof value === "object" &&
    "seconds" in value &&
    typeof value.seconds === "number"
  ) {
    return value.seconds;
  }
  // Firestore Timestamp may have toDate()
  if (value && typeof value.toDate === "function") {
    const d = value.toDate();
    if (d instanceof Date) return Math.floor(d.getTime() / 1000);
  }
  // JS Date
  if (value instanceof Date) return Math.floor(value.getTime() / 1000);
  // Milliseconds number
  if (typeof value === "number") return Math.floor(value / 1000);
  return 0;
}

export async function createOrder(
  userId: string,
  userEmail: string,
  items: CartItem[],
  totalPrice: number,
) {
  return addDoc(collection(db, "orders"), {
    userId,
    userEmail,
    items,
    totalPrice,
    createdAt: serverTimestamp(),
  });
}

export async function getUserOrders(userId: string): Promise<Order[]> {
  const q = query(collection(db, "orders"), where("userId", "==", userId));

  const snapshot = await getDocs(q);

  return snapshot.docs
    .map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    }))
    .sort((a, b) => {
      const aTime = getSecondsFromTimestamp((a as any).createdAt);
      const bTime = getSecondsFromTimestamp((b as any).createdAt);
      return bTime - aTime;
    }) as Order[];
}

export async function getOrderById(orderId: string): Promise<Order | null> {
  const orderDoc = await getDoc(doc(db, "orders", orderId));

  if (!orderDoc.exists()) {
    return null;
  }

  return {
    id: orderDoc.id,
    ...orderDoc.data(),
  } as Order;
}
