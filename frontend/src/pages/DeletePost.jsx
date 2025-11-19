import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function DeletePost() {
  const { id } = useParams();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const deletePost = async () => {
      try {
        await axios.delete(
          `https://cms-backend-hgpt.onrender.com/api/posts/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        alert("Post deleted!");
        window.location.href = "/posts";

      } catch (err) {
        alert("Error deleting post");
      }
    };

    deletePost();
  }, [id, token]);

  return (
    <h2 style={{ padding: "20px", color: "white" }}>Deleting post...</h2>
  );
}
