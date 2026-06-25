import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { axiosInstance } from "../Services/axiosInstance";
import { postEndPoint } from "../Router/postEndPoint";

export default function CommentBox() {
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const getComment = async (postId) => {
    try {
      const response = await axiosInstance.get(
        `${postEndPoint.GETCOMMENT}/${postId}`
      );
      setComments(response.data?.comments || []);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };
  const newComment = async (postId) => {
    try {
      const response = await axiosInstance.post(
        `${postEndPoint.NEWCOMMENT}/${postId}`,
        { text }
      );
      alert(response.data.message);
      setText("");
      getComment(postId);
    } catch (error) {
      alert(error.response?.data?.message || error.message);
    }
  };
  useEffect(() => {
    if (id) {
      getComment(id);
    }
  }, [id]);

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="space-y-4 mb-4">
        {comments.length > 0 ? (
          comments.map((item) => (
            <div
              key={item._id}
              className="flex items-start gap-3"
            >
              <img
                src={item.author?.profilePic}
                alt="profile"
                className="w-10 h-10 rounded-full"
              />

              <div>
                <h3 className="text-sm font-semibold">
                  {item.author?.username}
                </h3>

                <p className="text-sm text-gray-700">
                  {item.text}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-sm">
            No comments yet
          </p>
        )}
      </div>

      <div className="flex gap-2 border-t pt-3">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 border px-3 py-2 rounded-lg"
          placeholder="Add a comment..."
        />

        <button
          onClick={() => newComment(id)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Post
        </button>
      </div>
    </div>
  );
}