"use client";

import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
  Text,
  useToast,
} from "@/components/chakra-ui/react";
import { userAtom } from "@/utils/atom";
import { initApp } from "@/utils/initApp";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";

type Form = {
  email: string;
  password: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>();

  const [isShow, setIsShow] = useState(false);
  const user = useRecoilValue(userAtom);

  initApp();
  const auth = getAuth();
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    if (user) router.replace("/");
  });

  return (
    <SimpleGrid
      as="form"
      placeContent="center"
      placeItems="center"
      gap={4}
      p={4}
      onSubmit={handleSubmit(async (data) => {
        try {
          await signInWithEmailAndPassword(auth, data.email, data.password);
          toast({
            title: "正常にログインされました",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          router.push("/");
        } catch (error) {
          toast({
            title: `${error}`,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      })}
    >
      <FormControl isInvalid={!!errors.email}>
        <FormLabel>メールアドレス</FormLabel>
        <Input
          type="email"
          placeholder="user@example.com"
          {...register("email", {
            required: "必須項目",
          })}
        ></Input>
        {errors.email && (
          <FormErrorMessage>{errors.email.message}</FormErrorMessage>
        )}
      </FormControl>
      <FormControl isInvalid={!!errors.password}>
        <FormLabel>パスワード</FormLabel>
        <InputGroup>
          <Input
            maxLength={16}
            type={isShow ? "text" : "password"}
            {...register("password", {
              required: "必須項目",
              minLength: {
                value: 8,
                message: "8~16文字",
              },
              maxLength: {
                value: 16,
                message: "8~16文字",
              },
            })}
          ></Input>
          <InputRightElement placeContent="center" placeItems="center">
            <IconButton
              variant="unstyled"
              aria-label="show"
              placeContent="center"
              placeItems="center"
              icon={isShow ? <ViewIcon /> : <ViewOffIcon />}
              onClick={() => setIsShow(!isShow)}
            />
          </InputRightElement>
        </InputGroup>
        {errors.password && (
          <FormErrorMessage>{errors.password.message}</FormErrorMessage>
        )}
      </FormControl>
      <Button type="submit">Login</Button>
      <Link href="/register">
        <Text>またはアカウントを登録する</Text>
      </Link>
    </SimpleGrid>
  );
}
