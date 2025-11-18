import { useEffect, useState } from "react";
import axios from "axios";

export default function PostsList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/posts")
      .then((res) => setPosts(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div style={{ width: "800px", margin: "auto", paddingTop: "20px" }}>
      <h2>All Published Posts</h2>

      {posts.length === 0 && <p>No posts yet.</p>}

      {posts.map((post) => (
        <div
          key={post.id}
          style={{
            padding: "15px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            marginBottom: "10px",
          }}
        >
          <h3>{post.title}</h3>
          <p>Category: {post.category?.name || "No category"}</p>
          <p>Author: {post.author?.username}</p>
          <p>Date: {new Date(post.createdAt).toLocaleString()}</p>

          <a href={`/posts/${post.id}`}>View Post</a>
        </div>
      ))}
    </div>
  );
}
