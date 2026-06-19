import React from "react";
import {
  Grid,
  Bookmark,
  Tag,
  Settings,
  Edit,
  PlusCircle,
} from "lucide-react";
import { useSelector } from "react-redux";

const UserProfilePage = () => {
  const userDetails = useSelector((state) => state.user.userDetails);
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Profile Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <img
              src={userDetails?.toSend?.profilepic}
              alt="profile"
              className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-gray-200"
            />
          </div>

          {/* Profile Details */}
          <div className="flex-1 w-full">
            {/* Username Row */}
            <div className="flex flex-col md:flex-row items-center md:items-center gap-4">
              <h1 className="text-2xl font-bold-600">{userDetails?.toSend?.username}</h1>

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
                      <span className="font-bold">
                {userDetails?.toSend?.posts?.length || 0}
              </span> posts
              </div>
              <div>
                <span className="font-bold">{userDetails?.toSend?.followers?.length || 0}</span> followers
              </div>
              <div>
                <span className="font-bold">{userDetails?.toSend?.following?.length || 0}</span> following
              </div>
            </div>

            {/* Bio */}
            <div className="mt-6 text-center md:text-left">
              <p className="text-gray-600">
               {userDetails?.toSend?.bio}
              </p>
              <a
                href="/"
                className="text-blue-600 font-medium"
              >
               {userDetails?.toSend?.email}
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
      </div>
    </div>
  );
};

export default UserProfilePage;