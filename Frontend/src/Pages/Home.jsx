import React from "react";
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
  const posts = [
    {
      id: 1,
      username: "johndoe",
      profile:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43f",
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
      caption: "Beautiful sunset 🌅",
      likes: "2,341",
    },
    {
      id: 2,
      username: "sophia",
      profile:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      image:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9",
      caption: "Weekend vibes ✨",
      likes: "1,874",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 overflow-hidden rounded-full  ">
              <img
                src={logo}
                alt="Lopy Logo"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Navigation */}
            <div className="flex items-center gap-3">
              <Link to={pagePath.LOGIN} className="hidden sm:block px-4 py-2 text-sm font-medium text-gray-700 hover:text-black transition">
                Sign In
              </Link>

              <Link to={pagePath.SIGNUP} className="px-4 py-2 text-sm font-medium text-white rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 transition">
                Sign Up
              </Link>

              <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition">
                <User size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-3xl shadow-sm p-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Share Your Moments
          </h2>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Connect with friends, share photos, and explore amazing
            content from creators around the world.
          </p>

          <button className="mt-6 px-6 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-105 transition">
            Create Post
          </button>
        </div>
      </section>

      {/* Posts Feed */}
      <main className="max-w-3xl mx-auto px-4 pb-10">
        <div className="space-y-8">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden"
            >
              {/* Post Header */}
              <div className="flex items-center gap-3 p-4">
                <img
                  src={post.profile}
                  alt={post.username}
                  className="w-11 h-11 rounded-full object-cover"
                />

                <div>
                  <h3 className="font-semibold text-gray-900">
                    {post.username}
                  </h3>
                  <p className="text-xs text-gray-500">
                    2 hours ago
                  </p>
                </div>
              </div>

              {/* Post Image */}
              <img
                src={post.image}
                alt="post"
                className="w-full h-[250px] sm:h-[400px] md:h-[500px] object-cover"
              />

              {/* Actions */}
              <div className="p-4">
                <div className="flex justify-between items-center">
                  <div className="flex gap-4">
                    <button className="hover:text-red-500 transition">
                      <Heart size={24} />
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

                <p className="font-semibold mt-3">
                  {post.likes} likes
                </p>

                <p className="mt-2 text-gray-700">
                  <span className="font-semibold">
                    {post.username}
                  </span>{" "}
                  {post.caption}
                </p>

                <button className="mt-2 text-sm text-gray-500 hover:text-gray-700">
                  View all comments
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home