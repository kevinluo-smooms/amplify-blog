import { withAuthenticator } from "@aws-amplify/ui-react";
import { useState } from "react";
import { API } from "aws-amplify";
import { useRouter } from "next/router";
import { createBlog } from "../graphql/mutations";

const initialState = { name: "" };

function CreateNewBlog() {
  const [blog, setBlog] = useState(initialState);
  const { name } = blog;
  const router = useRouter();

  function onChange(e) {
    setBlog(() => ({ ...blog, [e.target.name]: e.target.value }));
  }

  async function createNewBlog() {
    if (!name) return;

    const newBlog = await API.graphql({
      query: createBlog,
      variables: { input: blog },
      authMode: "AMAZON_COGNITO_USER_POOLS", // overriding default authMode (API key)
    });

    router.push(`/blogs/${newBlog.data.createBlog.id}`);
  }

  return (
    <div>
      <h1>Create New Blog</h1>
      <input
        onChange={onChange}
        name="name"
        placeholder="Name"
        value={blog.name}
      />

      <button type="button" onClick={createNewBlog}>
        Create Blog
      </button>
    </div>
  );
}

export default withAuthenticator(CreateNewBlog);
