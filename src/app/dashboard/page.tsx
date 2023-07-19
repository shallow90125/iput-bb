"use client";

import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  useDisclosure,
  useToast,
} from "@/components/chakra-ui/react";
import AuthRedirector from "@/components/client/AuthRedirector";
import ModalSensorAdd from "@/components/client/ModalSensorAdd";
import SpinnerProvider from "@/components/client/SpinnerProvider";
import Lock from "@/components/server/Lock";
import Unlock from "@/components/server/Unlock";
import { initAtom, sensorsAtom, userAtom } from "@/utils/atom";
import { initApp } from "@/utils/initApp";
import { sensorConverter } from "@/utils/sensorConverter";
import {
  Unsubscribe,
  collection,
  deleteField,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";

type Form = {
  name: string;
};

export default function Dashboard() {
  const toast = useToast();
  const router = useRouter();
  const user = useRecoilValue(userAtom);
  const isInit = useRecoilValue(initAtom);
  const [sensors, setSensors] = useRecoilState(sensorsAtom);
  const [editSensor, setEditSensor] = useState<Sensor>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Form>({ defaultValues: { name: editSensor?.name } });

  initApp();
  const db = getFirestore();
  const colRef = collection(db, "sensor").withConverter(sensorConverter);

  useEffect(() => {
    if (!isInit) return;
    let unsubscribe: Unsubscribe;
    startTransition(() => {
      if (!user) return;
      const q = query(colRef, where("uid", "==", user.uid));
      unsubscribe = onSnapshot(q, (snapshot) => {
        console.log("Dashboard: onSnapshot");
        setSensors(snapshot.docs.map((doc) => doc.data()));
      });
    });
    return () => {
      try {
        unsubscribe();
      } catch (error) {}
    };
  }, [isInit]);

  return (
    <AuthRedirector isExists={false}>
      <SpinnerProvider atom={initAtom} state={false}>
        <Flex
          flexDirection="column"
          placeContent="stretch"
          placeItems="stretch"
          gap={4}
          p={4}
        >
          <SimpleGrid placeContent="center">
            <ModalSensorAdd />
          </SimpleGrid>
          <SimpleGrid placeContent="stretch" placeItems="stretch" gap={4}>
            <Flex px={5} gap={4} placeItems="center">
              <Heading size="md" flexGrow={1}>
                名前
              </Heading>
              <Heading size="md">開</Heading>
              <Lock />
              <Heading size="md">閉</Heading>
              <Unlock />
            </Flex>
            {sensors.length ? (
              sensors.map((sensor) => (
                <Card
                  key={sensor.macAddress}
                  variant="outline"
                  onClick={() => {
                    setEditSensor(sensor);
                    onOpen();
                  }}
                >
                  <CardBody display="flex">
                    <Heading size="md" placeSelf="center">
                      {sensor.name}
                    </Heading>
                    <Box flexGrow={1}></Box>
                    {sensor.isOpen ? <Unlock /> : <Lock />}
                  </CardBody>
                </Card>
              ))
            ) : (
              <SimpleGrid placeContent="center">
                <Text>センサーがありません</Text>
              </SimpleGrid>
            )}
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
              <ModalOverlay />
              <ModalContent
                as="form"
                onSubmit={handleSubmit(async (data) => {
                  if (!editSensor) return;
                  const q = query(
                    colRef,
                    where("macAddress", "==", editSensor.macAddress)
                  );
                  const snapshot = await getDocs(q);

                  if (snapshot.empty) {
                    onClose();
                    return;
                  }

                  const docRef = snapshot.docs[0].ref;

                  try {
                    await updateDoc(docRef, {
                      name: data.name,
                      updatedAt: serverTimestamp(),
                    });
                    toast({
                      title: "センサーを編集しました",
                      status: "success",
                      duration: 5000,
                      isClosable: true,
                    });
                  } catch (error) {
                    toast({
                      title: `${error}`,
                      status: "error",
                      duration: 5000,
                      isClosable: true,
                    });
                  }

                  onClose();
                })}
              >
                <ModalHeader>センサーを編集</ModalHeader>
                <ModalCloseButton />
                <ModalBody
                  display="grid"
                  placeContent="center"
                  placeItems="center"
                  gap={4}
                  p={4}
                >
                  <FormControl isInvalid={!!errors.name}>
                    <FormLabel>名前</FormLabel>
                    <Input
                      type="text"
                      defaultValue={editSensor?.name}
                      {...register("name", {
                        required: "必須項目",
                      })}
                    ></Input>
                    {errors.name && (
                      <FormErrorMessage>{errors.name.message}</FormErrorMessage>
                    )}
                  </FormControl>
                </ModalBody>
                <ModalFooter gap={4}>
                  <Button onClick={onClose}>キャンセル</Button>
                  <Button
                    color="red"
                    onClick={async () => {
                      if (!editSensor) return;
                      const q = query(
                        colRef,
                        where("macAddress", "==", editSensor.macAddress)
                      );
                      const snapshot = await getDocs(q);

                      if (snapshot.empty) {
                        onClose();
                        return;
                      }

                      const docRef = snapshot.docs[0].ref;

                      try {
                        await updateDoc(docRef, {
                          name: deleteField(),
                          uid: deleteField(),
                          updatedAt: serverTimestamp(),
                        });
                        toast({
                          title: "センサーを削除しました",
                          status: "success",
                          duration: 5000,
                          isClosable: true,
                        });
                      } catch (error) {
                        toast({
                          title: `${error}`,
                          status: "error",
                          duration: 5000,
                          isClosable: true,
                        });
                      }
                      onClose();
                    }}
                  >
                    削除
                  </Button>
                  <Button type="submit">追加</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </SimpleGrid>
        </Flex>
      </SpinnerProvider>
    </AuthRedirector>
  );
}
