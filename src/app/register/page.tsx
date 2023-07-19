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
  useToast,
} from "@/components/chakra-ui/react";
import AuthRedirector from "@/components/client/AuthRedirector";
import { initApp } from "@/utils/initApp";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

type Form = {
  email: string;
  emailConfirmation: string;
  password: string;
  passwordConfirmation: string;
};

export default function Register() {
  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<Form>();

  const [isShow, setIsShow] = useState(false);

  initApp();
  const auth = getAuth();
  const router = useRouter();
  const toast = useToast();

  return (
    <AuthRedirector isExists={true}>
      <SimpleGrid
        as="form"
        placeContent="center"
        placeItems="center"
        gap={4}
        p={4}
        onSubmit={handleSubmit(async (data) => {
          try {
            await createUserWithEmailAndPassword(
              auth,
              data.email,
              data.password
            );
            toast({
              title: "アカウント登録が完了しました",
              status: "error",
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
              onBlur: () => {
                if (getValues("emailConfirmation")) {
                  trigger("emailConfirmation");
                }
              },
              pattern: {
                value: /^[\w\-._]+@[\w\-._]+\.[A-Za-z]+/,
                message: "入力形式がメールアドレスではありません",
              },
            })}
          ></Input>
          {errors.email && (
            <FormErrorMessage>{errors.email.message}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={!!errors.emailConfirmation}>
          <FormLabel>メールアドレスの確認</FormLabel>
          <Input
            type="email"
            placeholder="user@example.com"
            {...register("emailConfirmation", {
              required: "必須項目",
              pattern: {
                value: /^[\w\-._]+@[\w\-._]+\.[A-Za-z]+/,
                message: "入力形式がメールアドレスではありません",
              },
              validate: (value) => {
                return (
                  value === getValues("email") || "メールアドレスが一致しません"
                );
              },
            })}
          ></Input>
          {errors.emailConfirmation && (
            <FormErrorMessage>
              {errors.emailConfirmation.message}
            </FormErrorMessage>
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
                onBlur: () => {
                  if (getValues("passwordConfirmation")) {
                    trigger("passwordConfirmation");
                  }
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
        <FormControl isInvalid={!!errors.passwordConfirmation}>
          <FormLabel>パスワードの確認</FormLabel>
          <InputGroup>
            <Input
              maxLength={16}
              type={isShow ? "text" : "password"}
              {...register("passwordConfirmation", {
                required: "必須項目",
                minLength: {
                  value: 8,
                  message: "8~16文字",
                },
                maxLength: {
                  value: 16,
                  message: "8~16文字",
                },
                validate: (value) => {
                  return (
                    value === getValues("password") ||
                    "パスワードが一致しません"
                  );
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
          {errors.passwordConfirmation && (
            <FormErrorMessage>
              {errors.passwordConfirmation.message}
            </FormErrorMessage>
          )}
        </FormControl>
        <Button type="submit" colorScheme="blue">
          Register
        </Button>
      </SimpleGrid>
    </AuthRedirector>
  );
}
