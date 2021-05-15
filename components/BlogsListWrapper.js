import React from 'react'
import { Stack } from "@chakra-ui/react"
import Link from "next/link";

export default function BlogsListWrapper({ blogs }) {
  const displayBlogs = blogs.map((blog, index) => (
    <Link key={index} href={`/blogs/${blog.id}`}>
      {blog.name}
    </Link>
  )) 
  return (
    <Stack direction={["row", "column"]} spacing="24px">
      {displayBlogs}
    </Stack>
  )
}
