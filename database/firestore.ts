import { getFirestore } from "firebase/firestore";
import { firebaseApp } from "../services/firebase";

//firebase db
export const db = getFirestore(firebaseApp);