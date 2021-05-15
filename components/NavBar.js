import React from "react";
import Link from "next/link";
import { Stack } from "@chakra-ui/react";

export default function NavBar({ signedInUser }) {
  return (
    <Stack direction={["column", "row"]} spacing="24px">
      <Link href="/">Home</Link>
      <Link href="/create-blog">Create Blog</Link>
      <Link href="/profile">Profile</Link>
      {signedInUser && <Link href="/my-blogs">My Blogs</Link>}
    </Stack>
  );
}
