import { FirestoreDataConverter } from "firebase/firestore";

export const sensorConverter: FirestoreDataConverter<Sensor> = {
  fromFirestore(snapshot, options): Sensor {
    const data = snapshot.data(options);

    return {
      macAddress: data.macAddress,
      isOpen: data.isOpen,
      name: data.name,
      uid: data.uid,
    };
  },
  toFirestore(data: Sensor) {
    return {
      macAddress: data.macAddress,
      isOpen: data.isOpen,
      name: data.name,
      uid: data.uid,
    };
  },
};
