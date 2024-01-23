import { getCollection } from "@/utils/firebase";
import {
  addDoc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { NextRequest } from "next/server";
import { z } from "zod";

export async function POST(request: NextRequest) {
  const result = z
    .object({
      macAddress: z.string(),
      isOpen: z.boolean(),
    })
    .safeParse(await request.json());

  if (!result.success) {
    return new Response(null, { status: 200 });
  }

  const data = result.data;

  data.macAddress = data.macAddress.replace(".", "");

  const { ref: sr, path: sp } = getCollection("sb");
  const { ref: hr } = getCollection("hb");

  const q = query(sr, where(sp.sid, "==", data.macAddress));
  const snapshot = await getDocs(q);

  await addDoc(hr, {
    sid: data.macAddress,
    isOpen: data.isOpen,
    timestamp: serverTimestamp(),
  });

  if (snapshot.empty) {
    await addDoc(sr, {
      sid: data.macAddress,
      uid: "",
      name: "",
      isOpen: data.isOpen,
      timestamp: serverTimestamp(),
    });

    return new Response(null, { status: 200 });
  }

  const docRef = snapshot.docs[0].ref;
  await updateDoc(docRef, {
    isOpen: data.isOpen,
    timestamp: serverTimestamp(),
  });

  return new Response(null, { status: 200 });
}
