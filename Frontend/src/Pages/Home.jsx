import React, { useState } from "react";
import logo from "../assets/Lopy.jpeg";
import { pagePath } from "../Router/pagePath";
import { Link } from "react-router";
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  User,
} from "lucide-react";

const Home = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      username: "johndoe",
      profile:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43f",
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
      caption: "Beautiful sunset 🌅",
      likes: 2341,
      liked: false,
      comments: [
        {
          id: 1,
          username: "alex",
          text: "Amazing picture 😍",
        },
      ],
      newComment: "",
    },
    {
      id: 2,
      username: "sophia",
      profile:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      image:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9",
      caption: "Weekend vibes ✨",
      likes: 1874,
      liked: false,
      comments: [],
      newComment: "",
    },
  ]);

  // Like / Unlike
  const handleLike = (id) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  // Comment input
  const handleCommentChange = (id, value) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id
          ? {
              ...post,
              newComment: value,
            }
          : post
      )
    );
  };

  // Add comment
  const addComment = (id) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id !== id) return post;

        if (!post.newComment.trim()) return post;

        return {
          ...post,
          comments: [
            ...post.comments,
            {
              id: Date.now(),
              username: "You",
              text: post.newComment,
            },
          ],
          newComment: "",
        };
      })
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              to={pagePath.SIGNUP}
              className="w-12 h-12 sm:w-14 sm:h-14 overflow-hidden rounded-full"
            >
              <img
                src={logo}
                alt="Lopy Logo"
                className="w-full h-full object-cover"
              />
            </Link>

            {/* Navigation */}
            <div className="flex items-center gap-3">
              <Link
                to={pagePath.LOGIN}
                className="hidden sm:block px-4 py-2 text-sm font-medium text-gray-700 hover:text-black transition"
              >
                Sign In
              </Link>

              <Link
                to={pagePath.SIGNUP}
                className="px-4 py-2 text-sm font-medium text-white rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 transition"
              >
                Sign Up
              </Link>

              <Link
                to={pagePath.LOGIN}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
              >
                <User size={20} />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-3xl shadow-sm p-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Share Your Moments
          </h2>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Connect with friends, share photos, and explore amazing
            content from creators around the world.
          </p>

          <Link
            to={pagePath.SIGNUP}
            className="inline-block mt-6 px-6 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-105 transition"
          >
            Create Post
          </Link>
        </div>
      </section>

      {/* Feed */}
      <main className="max-w-3xl mx-auto px-4 pb-10">
        <div className="space-y-8">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center gap-3 p-4">
                <img
                  src={post.profile}
                  alt={post.username}
                  className="w-11 h-11 rounded-full object-cover"
                />

                <div>
                  <h3 className="font-semibold">{post.username}</h3>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>

              {/* Image */}
              <img
                src={post.image}
                alt="Post"
                className="w-full h-[250px] sm:h-[400px] md:h-[500px] object-cover"
              />

              {/* Actions */}
              <div className="p-4">
                <div className="flex justify-between items-center">
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleLike(post.id)}
                    >
                      <Heart
                        size={24}
                        className={`transition ${
                          post.liked
                            ? "fill-red-500 text-red-500"
                            : "hover:text-red-500"
                        }`}
                      />
                    </button>

                    <button className="hover:text-blue-500 transition">
                      <MessageCircle size={24} />
                    </button>

                    <button className="hover:text-green-500 transition">
                      <Send size={24} />
                    </button>
                  </div>

                  <button>
                    <Bookmark size={24} />
                  </button>
                </div>

                {/* Likes */}
                <p className="font-semibold mt-3">
                  {post.likes.toLocaleString()} likes
                </p>

                {/* Caption */}
                <p className="mt-2">
                  <span className="font-semibold">
                    {post.username}
                  </span>{" "}
                  {post.caption}
                </p>

                {/* Comments */}
                <div className="mt-3 space-y-2">
                  {post.comments.map((comment) => (
                    <p key={comment.id}>
                      <span className="font-semibold">
                        {comment.username}
                      </span>{" "}
                      {comment.text}
                    </p>
                  ))}
                </div>

                {/* Add Comment */}
                <div className="flex gap-2 mt-4">
                  <input
                    type="text"
                    value={post.newComment}
                    onChange={(e) =>
                      handleCommentChange(
                        post.id,
                        e.target.value
                      )
                    }
                    placeholder="Add a comment..."
                    className="flex-1 border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-pink-400"
                  />

                  <button
                    onClick={() => addComment(post.id)}
                    className="px-4 rounded-lg bg-pink-500 text-white hover:bg-pink-600"
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;