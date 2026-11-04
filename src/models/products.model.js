import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

import { db } from "../data/data.js";

const productsCollection = collection(db, "products");

export const getAllProducts = async () => {
  const querysnapshot = await getDocs(productsCollection);
  const products = [];
  querysnapshot.forEach((doc) => {
    products.push({
      id: doc.id,
      ...doc.data(),
    });
  });
  return products;
};

export const getProductById = async (id) => {
  const snapshot = await getDoc(doc(productsCollection, id));
  return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
};

export const createProduct = async (product) => {
  const newProduct = await addDoc(productsCollection, product);
  return { id: newProduct.id, ...product };
};

export const deleteProduct = async (id) => {
  await deleteDoc(doc(productsCollection, id));
};

export const updateProduct = async (id, product) => {
  await updateDoc(doc(productsCollection, id), product);
  return { id, ...product };
};
