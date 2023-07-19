"use client";

import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@/components/chakra-ui/react";
import { userAtom } from "@/utils/atom";
import { initApp } from "@/utils/initApp";
import { sensorConverter } from "@/utils/sensorConverter";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";

type Form = {
  macAddress: string;
  name: string;
};

export default function ModalSensorAdd() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Form>();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const user = useRecoilValue(userAtom);

  initApp();
  const db = getFirestore();

  return (
    <>
      <Button onClick={onOpen}>センサーを追加</Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent
          as="form"
          onSubmit={handleSubmit(async (data) => {
            if (!user) return;

            const colRef = collection(db, "sensor").withConverter(
              sensorConverter
            );
            const q = query(colRef, where("macAddress", "==", data.macAddress));

            const snapshot = await getDocs(q);

            if (snapshot.empty) {
              toast({
                title: "センサーが存在しません",
                status: "error",
                duration: 5000,
                isClosable: true,
              });
              onClose();
              reset();
              return;
            }
            const docRef = snapshot.docs[0].ref;
            const docData = snapshot.docs[0].data();

            if (docData.uid == user.uid) {
              toast({
                title: "既にに追加されています",
                status: "error",
                duration: 5000,
                isClosable: true,
              });
              return;
            }

            try {
              await updateDoc(docRef, {
                uid: user.uid,
                name: data.name,
              });
              toast({
                title: "センサーを追加しました",
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
            reset();
          })}
        >
          <ModalHeader>センサーを追加</ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="grid"
            placeContent="center"
            placeItems="center"
            gap={4}
            p={4}
          >
            <FormControl isInvalid={!!errors.macAddress}>
              <FormLabel>ID</FormLabel>
              <Input
                type="text"
                {...register("macAddress", {
                  required: "必須項目",
                })}
              ></Input>
              {errors.macAddress && (
                <FormErrorMessage>{errors.macAddress.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={!!errors.name}>
              <FormLabel>名前</FormLabel>
              <Input
                type="text"
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
            <Button type="submit">追加</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
