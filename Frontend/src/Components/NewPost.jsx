import React, { useState } from "react";
import { useSelector } from "react-redux";
import { axiosInstance } from "../Services/axiosInstance";
import { postEndPoint } from "../Router/postEndPoint";
import { useNavigate } from "react-router";
import { pagePath } from "../Router/pagePath";

export default function NewPost() {
  const { userDetails } = useSelector((store) => store.user);

  const userId = userDetails?.toSend?._id;

  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate()
  const addPost = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append("image", image);
      formData.append("caption", caption);
      formData.append("userId", userId);
      const response = await axiosInstance.post(
        postEndPoint.NEWPOST,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert(response.data.message);

      setCaption("");
      setImage(null);
      setPreview(null);
      navigate(pagePath.MAINHOME)
    } catch (error) {
      alert(
        error?.response?.data?.message ||
          "Failed to create post"
      );
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6">
          Create New Post
        </h1>

        <form
          onSubmit={addPost}
          className="space-y-5"
        >
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>

          {/* Preview */}
          <div className="w-full h-72 border rounded-xl overflow-hidden bg-gray-50 flex justify-center items-center">
            {preview ? (
              <img
                src={preview}
                alt="preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-400">
                Image Preview
              </span>
            )}
          </div>

          {/* Caption */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Caption
            </label>

            <textarea
              rows="4"
              value={caption}
              onChange={(e) =>
                setCaption(e.target.value)
              }
              placeholder="Write a caption..."
              className="w-full border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
}

