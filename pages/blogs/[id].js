import React from "react";
import { API } from "aws-amplify";
import { listBlogs, getBlog } from "../../graphql/queries";

export default function Blog({ blog }) {
  console.log(blog);
  return (
    <div>{blog.name}</div>
  )
}

export async function getStaticPaths() {
  const blogData = await API.graphql({
    query: listBlogs,
  });

  const paths = blogData.data.listBlogs.items.map((blog) => ({
    params: { id: blog.id },
  }));

  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const { id } = params;
  const blogData = await API.graphql({
    query: getBlog,
    variables: { id },
  });
  return {
    props: {
      blog: blogData.data.getBlog,
    },
  };
}
