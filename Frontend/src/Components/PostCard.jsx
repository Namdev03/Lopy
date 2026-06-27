const samplePosts = [
  {
    _id: "1",
    image: "https://picsum.photos/500",
    caption: "Hello world!",
    author: {
      username: "john_doe",
      profilePic: "https://i.pravatar.cc/100",
    },
    likes: ["a", "b", "c"],
    comments: [1, 2],
  },
];

import React from "react";

export default function PostCard({ posts = [] }) {
  return (
    <>
      {samplePosts.map((postItem) => (
        <div
          key={postItem._id}
          className="w-full max-w-md mx-auto bg-white rounded-lg border shadow-sm overflow-hidden mb-6"
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b">
            <img
              src={postItem?.author?.profilePic}
              alt="profile"
              className="w-10 h-10 rounded-full object-cover"
            />
            <p className="font-semibold text-sm">
              {postItem?.author?.username}
            </p>
          </div>

          {/* Image */}
          <img
            src={postItem?.image}
            alt="post"
            className="w-full aspect-square object-cover"
          />

          {/* Caption */}
          <div className="px-4 py-3 text-sm">
            <span className="font-semibold">
              {postItem?.author?.username}
            </span>{" "}
            {postItem?.caption}
          </div>

          {/* Likes (static display only) */}
          <div className="px-4 pb-3 text-sm text-gray-600">
            {postItem?.likes?.length || 0} likes
          </div>

          {/* Comments */}
          <div className="px-4 pb-3 text-sm text-gray-500">
            View all {postItem?.comments?.length || 0} comments
          </div>
        </div>
      ))}
    </>
  );
}