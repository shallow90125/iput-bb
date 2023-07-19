"use client";

import {
  Avatar,
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  SimpleGrid,
  Text,
  useToast,
} from "@/components/chakra-ui/react";
import { userAtom } from "@/utils/atom";
import { initApp } from "@/utils/initApp";
import { HamburgerIcon } from "@chakra-ui/icons";
import { getAuth, signOut } from "firebase/auth";
import Link from "next/link";
import { useRecoilValue } from "recoil";

export default function LoginField() {
  initApp();
  const auth = getAuth();
  const user = useRecoilValue(userAtom);
  const toast = useToast();
  return user ? (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="menu"
        variant="outline"
        icon={<HamburgerIcon />}
      >
        <Avatar size="sm" />
      </MenuButton>
      <MenuList>
        <MenuItem>
          <SimpleGrid>
            <Text>Login as</Text>
            <Text>{user?.email}</Text>
          </SimpleGrid>
        </MenuItem>
        <MenuDivider />
        <MenuItem display="grid" placeContent="stretch" placeItems="stretch">
          <Link href="/dashboard">Dashboard</Link>
        </MenuItem>
        <MenuDivider />
        <MenuItem
          color="red"
          onClick={async () => {
            await signOut(auth);
            toast({
              title: "正常にログアウトしました",
              status: "success",
              duration: 5000,
              isClosable: true,
            });
          }}
        >
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  ) : (
    <Button as={Link} href="/login">
      Login
    </Button>
  );
}
