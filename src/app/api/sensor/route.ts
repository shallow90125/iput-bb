import { initApp } from "@/actions/initApp";
import { FieldValue, getFirestore } from "firebase-admin/firestore";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  initApp();
  const db = getFirestore();

  const newData = await request.json();
  const snapshot = await db
    .collection("sensor")
    .where("macAddress", "==", newData.macAddress)
    .get();

  if (snapshot.empty) {
    await db.collection("sensor").add({
      macAddress: newData.macAddress,
      isOpen: newData.isOpen,
      updatedAt: FieldValue.serverTimestamp(),
    });
    return new Response(null, { status: 200 });
  }

  const ref = snapshot.docs[0].ref;
  await ref.update({
    macAddress: newData.macAddress,
    isOpen: newData.isOpen,
    updatedAt: FieldValue.serverTimestamp(),
  });

  return new Response(null, { status: 200 });
}
