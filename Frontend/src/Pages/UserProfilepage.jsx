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
      <div className="max-w-6xl mx-auto px-3 sm:px-5 md:px-8 py-6">
        {/* Profile Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10">
          
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <img
              src={userDetails?.toSend?.profilepic}
              alt="profile"
              className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-gray-200"
            />
          </div>

          {/* Profile Details */}
          <div className="flex-1 w-full">
            
            {/* Username + Buttons */}
            <div className="flex flex-col lg:flex-row items-center lg:items-center gap-4">
              <h1 className="text-xl sm:text-2xl font-semibold break-all text-center lg:text-left">
                {userDetails?.toSend?.username}
              </h1>

              <div className="flex flex-wrap justify-center lg:justify-start gap-2">
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
            <div className="flex flex-wrap justify-center md:justify-start gap-4 sm:gap-8 mt-6 text-sm sm:text-base">
              <div>
                <span className="font-bold">
                  {userDetails?.toSend?.posts?.length || 0}
                </span>{" "}
                posts
              </div>

              <div>
                <span className="font-bold">
                  {userDetails?.toSend?.followers?.length || 0}
                </span>{" "}
                followers
              </div>

              <div>
                <span className="font-bold">
                  {userDetails?.toSend?.following?.length || 0}
                </span>{" "}
                following
              </div>
            </div>

            {/* Bio */}
            <div className="mt-6 text-center md:text-left">
              <p className="text-gray-600 break-words">
                {userDetails?.toSend?.bio}
              </p>

              <p className="text-blue-600 font-medium break-all mt-2">
                {userDetails?.toSend?.email}
              </p>
            </div>
          </div>
        </div>

        {/* Story Highlights */}
        <div className="flex gap-4 sm:gap-6 overflow-x-auto py-8 mt-4 scrollbar-hide">
          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className="flex flex-col items-center min-w-fit"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-gray-300 p-1">
                <img
                  src={`https://picsum.photos/200?random=${item}`}
                  alt=""
                  className="w-full h-full rounded-full object-cover"
                />
              </div>

              <span className="text-xs sm:text-sm mt-2">
                Story {item}
              </span>
            </div>
          ))}

          <div className="flex flex-col items-center min-w-fit">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-gray-300 flex items-center justify-center">
              <PlusCircle size={24} />
            </div>

            <span className="text-xs sm:text-sm mt-2">
              New
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-t border-gray-200 mt-4">
          <div className="flex justify-start sm:justify-center gap-6 sm:gap-10 overflow-x-auto whitespace-nowrap">
            <button className="flex items-center gap-2 py-4 border-t-2 border-black text-xs sm:text-sm font-medium">
              <Grid size={18} />
              POSTS
            </button>

            <button className="flex items-center gap-2 py-4 text-gray-500 text-xs sm:text-sm">
              <Bookmark size={18} />
              SAVED
            </button>

            <button className="flex items-center gap-2 py-4 text-gray-500 text-xs sm:text-sm">
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