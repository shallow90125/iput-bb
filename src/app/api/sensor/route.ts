import { initApp } from "@/utils/init-app";
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  initApp();
  const db = getFirestore();

  const newData: { macAddress: string; isOpen: boolean } = await request.json();

  const colRef = collection(db, "sensor");
  const q = query(colRef, where("macAddress", "==", newData.macAddress));
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    await addDoc(colRef, {
      macAddress: newData.macAddress,
      isOpen: newData.isOpen,
      updatedAt: serverTimestamp(),
    });

    return new Response(null, { status: 200 });
  }

  const docRef = snapshot.docs[0].ref;
  await updateDoc(docRef, {
    macAddress: newData.macAddress,
    isOpen: newData.isOpen,
    updatedAt: serverTimestamp(),
  });

  return new Response(null, { status: 200 });
}
