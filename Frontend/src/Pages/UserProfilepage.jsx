import React from "react";
import {
  Grid,
  Bookmark,
  Tag,
  Settings,
  Edit,
  PlusCircle,
} from "lucide-react";

const UserProfilePage = () => {
  const posts = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    image: `https://picsum.photos/500/500?random=${i + 1}`,
  }));

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Profile Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <img
              src="https://i.pravatar.cc/300"
              alt="profile"
              className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-gray-200"
            />
          </div>

          {/* Profile Details */}
          <div className="flex-1 w-full">
            {/* Username Row */}
            <div className="flex flex-col md:flex-row items-center md:items-center gap-4">
              <h1 className="text-2xl font-light">john_doe</h1>

              <div className="flex gap-2">
                <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition">
                  <Edit size={16} className="inline mr-2" />
                  Edit Profile
                </button>

                <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition">
                  <Settings size={20} />
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="flex justify-center md:justify-start gap-8 mt-6">
              <div>
                <span className="font-bold">120</span> posts
              </div>
              <div>
                <span className="font-bold">12.5k</span> followers
              </div>
              <div>
                <span className="font-bold">430</span> following
              </div>
            </div>

            {/* Bio */}
            <div className="mt-6 text-center md:text-left">
              <h3 className="font-semibold">John Doe</h3>
              <p className="text-gray-600 mt-1">
                Frontend Developer 💻
              </p>
              <p className="text-gray-600">
                Building beautiful web experiences 🚀
              </p>
              <a
                href="/"
                className="text-blue-600 font-medium"
              >
                www.johndoe.com
              </a>
            </div>
          </div>
        </div>

        {/* Story Highlights */}
        <div className="flex gap-6 overflow-x-auto py-8 mt-4">
          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className="flex flex-col items-center min-w-fit"
            >
              <div className="w-20 h-20 rounded-full border-2 border-gray-300 p-1">
                <img
                  src={`https://picsum.photos/200?random=${item}`}
                  alt=""
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <span className="text-sm mt-2">Story {item}</span>
            </div>
          ))}

          <div className="flex flex-col items-center min-w-fit">
            <div className="w-20 h-20 rounded-full border-2 border-gray-300 flex items-center justify-center">
              <PlusCircle size={30} />
            </div>
            <span className="text-sm mt-2">New</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-t border-gray-200 mt-4">
          <div className="flex justify-center gap-8">
            <button className="flex items-center gap-2 py-4 border-t-2 border-black text-sm font-medium">
              <Grid size={18} />
              POSTS
            </button>

            <button className="flex items-center gap-2 py-4 text-gray-500 text-sm">
              <Bookmark size={18} />
              SAVED
            </button>

            <button className="flex items-center gap-2 py-4 text-gray-500 text-sm">
              <Tag size={18} />
              TAGGED
            </button>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-3 gap-1 md:gap-4 mt-2">
          {posts.map((post) => (
            <div
              key={post.id}
              className="aspect-square overflow-hidden cursor-pointer group relative"
            >
              <img
                src={post.image}
                alt="post"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />

              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white font-semibold transition">
                ❤️ 1.2k
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;