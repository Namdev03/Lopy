import React, { useEffect } from "react";
import { Edit, Settings } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { usersProfileAsync } from "../Redux/userSlice";
import { useParams } from "react-router";
import UsersProfileTabs from "./UsersProfileTab";

function UsersProfile() {
  const { id } = useParams();
  console.log("userId",id);
  
  const dispatch = useDispatch();

  const { usersProfile, usersProfileLoading } = useSelector(
    (store) => store.user
  );

  useEffect(() => {
      dispatch(usersProfileAsync(id));
  }, [id, dispatch]);
  if (usersProfileLoading || !usersProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-3 sm:px-5 md:px-8 py-6">

        {/* Profile Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10">

          {/* Profile Image */}
          <div className="flex-shrink-0">
            <img
              src={usersProfile?.profilePic}
              alt="profile"
              className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-gray-200"
            />
          </div>

          {/* Info Section */}
          <div className="flex-1 w-full">

            <div className="flex flex-col lg:flex-row items-center gap-4">
              <h1 className="text-xl sm:text-2xl font-semibold">
                {usersProfile?.username}
              </h1>

              <div className="flex gap-2">
                <button className="px-4 py-2 bg-gray-100 rounded-lg">
                  <Edit size={16} className="inline mr-2" />
                  Edit Profile
                </button>

                <button className="p-2 bg-gray-100 rounded-lg">
                  <Settings size={20} />
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-6">
              <div>
                <span className="font-bold">
                  {usersProfile?.posts?.length || 0}
                </span>{" "}
                posts
              </div>

              <div>
                <span className="font-bold">
                  {usersProfile?.followers?.length || 0}
                </span>{" "}
                followers
              </div>

              <div>
                <span className="font-bold">
                  {usersProfile?.following?.length || 0}
                </span>{" "}
                following
              </div>
            </div>

            {/* Bio */}
            <div className="mt-6 text-gray-700">
              <p>{usersProfile?.bio || "No bio yet"}</p>
            </div>

          </div>
        </div>

        <UsersProfileTabs />

      </div>
    </div>
  );
}

export default UsersProfile;