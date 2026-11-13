import bcrypt from "bcrypt";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../data/data.js";
import { generateToken } from "../utils/token-generator.js";

const usersCollection = collection(db, "users");

export const createUser = async (req, res) => {
  const { email, password } = req.body ?? {};
  if (typeof email !== "string" || !email.trim() || typeof password !== "string" || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const existingUsers = await getDocs(
    query(usersCollection, where("email", "==", normalizedEmail)),
  );
  if (!existingUsers.empty) {
    return res.status(409).json({ message: "Email is already registered" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { email: normalizedEmail, password: hashedPassword };
  const userDocument = await addDoc(usersCollection, user);

  res.status(201).json({
    message: "User created successfully",
    user: { id: userDocument.id, email: normalizedEmail },
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body ?? {};
  if (typeof email !== "string" || !email.trim() || typeof password !== "string" || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const userSnapshot = await getDocs(
    query(usersCollection, where("email", "==", email.trim().toLowerCase())),
  );
  const userDocument = userSnapshot.docs[0];

  if (!userDocument) {
    return res.sendStatus(401);
  }

  const user = userDocument.data();
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.sendStatus(401);
  }
  const token = generateToken({ id: userDocument.id, email: user.email });
  res.json({ token });
};
