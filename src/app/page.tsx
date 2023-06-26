import { getDb } from "@/actions/getDb";

export default async function Home() {
  const db = await getDb();
  db.collection("sensor");
  return <>home</>;
}
