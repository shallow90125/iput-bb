import { getCollection } from "@/utils/firebase";
import { initFirebaseAdmin } from "@/utils/init-firebase-admin";
import { getMessaging } from "firebase-admin/messaging";
import {
  Timestamp,
  addDoc,
  getDocs,
  query,
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

  data.macAddress = data.macAddress.replace(/:/g, "");

  const { ref, path } = getCollection("sb");

  const q = query(ref, where(path.sid, "==", data.macAddress));
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    await addDoc(ref, {
      sid: data.macAddress,
      uid: "",
      name: "",
      isOpen: data.isOpen,
      timestamp: Timestamp.now(),
      tokens: [],
      history: [{ isOpen: data.isOpen, timestamp: Timestamp.now() }],
    });

    return new Response(null, { status: 200 });
  }

  const docRef = snapshot.docs[0].ref;
  const docData = snapshot.docs[0].data();

  const history = [...docData.history];

  history.push({ isOpen: data.isOpen, timestamp: Timestamp.now() });

  await updateDoc(docRef, {
    isOpen: data.isOpen,
    timestamp: Timestamp.now(),
    history: history,
  });

  if (data.isOpen && !!docData.tokens.length) {
    initFirebaseAdmin();
    const messaging = getMessaging();

    await messaging.sendEachForMulticast({
      notification: {
        title: "WinsoR",
        body: `The monitoring window "${docData.name}" has opened!`,
      },
      tokens: docData.tokens,
    });
  }

  return new Response(null, { status: 200 });
}
