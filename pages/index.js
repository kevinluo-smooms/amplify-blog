import { useState, useEffect } from "react";
import { API } from "aws-amplify";
import { listBlogs } from "../graphql/queries";
import BlogsListWrapper from "../components/BlogsListWrapper";

export default function Home() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  async function fetchBlogs() {
    const blogData = await API.graphql({
      query: listBlogs,
    });
    setBlogs(blogData.data.listBlogs.items);
  }

  return (
    <div>
      <h1>Blogs</h1>
      <BlogsListWrapper blogs={blogs}/>
    </div>
  );
}
