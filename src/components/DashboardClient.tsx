"use client";

import { Sensor } from "@/types/Sensor";
import { getCollection } from "@/utils/firebase";
import {
  Timestamp,
  Unsubscribe,
  addDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import SensorCard from "./SensorCard";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";

export default function DashboardClient({ uid }: { uid: string }) {
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [nameState, setNameState] = useState("");
  const [sidState, setSidState] = useState("");

  const { ref, path } = getCollection("sb");

  const q = query(ref, where(path.uid, "==", uid));

  useEffect(() => {
    let unsub: Unsubscribe | undefined;

    unsub = onSnapshot(q, (snapshot) => {
      console.log("Dashboard: onSnapshot");
      setSensors(snapshot.docs.map((doc) => doc.data()));
    });

    return () => {
      if (unsub) unsub();
    };
  }, []);

  return (
    <main className=" container flex min-h-[calc(100dvh_-_3.75rem)] flex-col gap-4 p-4">
      <div className=" flex-none">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>Add Sensor</Button>
          </DialogTrigger>
          <DialogContent className=" place-self-center">
            <DialogHeader className=" p-4">Add Sensor</DialogHeader>
            <div className=" flex place-content-center place-items-center gap-4 place-self-center p-4">
              <Input
                placeholder="name"
                value={nameState}
                onChange={(v) => setNameState(v.target.value)}
              />
              <Input
                placeholder="mac address"
                value={sidState}
                onChange={(v) => setSidState(v.target.value)}
              />
            </div>
            <DialogFooter className=" flex flex-row gap-4 p-4">
              <div className=" flex-grow"></div>
              <Button
                onClick={() => {
                  setIsOpen(false);
                  setNameState("");
                  setSidState("");
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={async () => {
                  await addDoc(ref, {
                    sid: sidState,
                    uid: uid,
                    name: nameState,
                    isOpen: false,
                    timestamp: Timestamp.now(),
                    tokens: [...sensors[0]?.tokens],
                    history: [
                      {
                        isOpen: false,
                        timestamp: Timestamp.now(),
                      },
                    ],
                  });
                  setIsOpen(false);
                  setNameState("");
                  setSidState("");
                }}
              >
                Submit
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className=" grid flex-grow grid-cols-[repeat(auto-fit,_minmax(8rem,_1fr))] place-content-center place-items-center gap-4">
        {sensors
          .sort((a, b) => (a.name < b.name ? -1 : 1))
          .map((sensor, i) => (
            <SensorCard sensor={sensor} key={i} />
          ))}
      </div>
    </main>
  );
}
