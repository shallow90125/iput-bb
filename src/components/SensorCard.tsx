import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sensor } from "@/types/Sensor";
import Link from "next/link";

export default function SensorCard({ sensor }: { sensor: Sensor }) {
  return (
    <Link
      href={`/dashboard/${sensor.sid}`}
      className=" rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
    >
      <Card
        className={
          sensor.isOpen
            ? " rounded-md border-none bg-amber-800 hover:bg-amber-800/90"
            : " rounded-md border-none bg-blue-800 hover:bg-blue-800/90"
        }
      >
        <CardHeader>
          <CardTitle>{sensor.name}</CardTitle>
          <CardDescription>
            {`${sensor.timestamp
              .toDate()
              .toLocaleDateString()} ${sensor.timestamp
              .toDate()
              .toLocaleTimeString()} ~ ${sensor.isOpen ? "Open" : "Closed"}`}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
