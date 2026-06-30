import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Edit, Settings } from "lucide-react";
import { Link, useParams } from "react-router";

import { usersProfileAsync } from "../Redux/userSlice";
import { followAndUnfollowApi } from "../Services/userApiCollection";
import UsersProfileTabs from "./UsersProfileTab";
import { pagePath } from "../Router/pagePath";

function UsersProfile() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { usersProfile, usersProfileLoading, userId } = useSelector(
    (store) => store.user
  );
  
  useEffect(() => {
    if (id) {
      dispatch(usersProfileAsync(id));
    }
  }, [dispatch, id]);
    if (!usersProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    );
  }
  const isFollow = usersProfile?.followers?.some(
    (followerId) => String(followerId) === String(userId)
  );
  const handleFollow = async () => {
    try {
      await followAndUnfollowApi(id);
      dispatch(usersProfileAsync(id));
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-3 sm:px-5 md:px-8 py-6">
        {/* Profile Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <img
              src={usersProfile.profilepic}
              alt={usersProfile.username}
              className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-gray-200"
            />
          </div>
          {/* Profile Info */}
          <div className="flex-1 w-full">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <h1 className="text-xl sm:text-2xl font-semibold">
                {usersProfile.username}
              </h1>

              {/* Show Follow button only if not own profile */}
              <div className="flex items-center gap-3 flex-wrap">
                {String(userId) !== String(usersProfile._id) && (
                  <>
                    <button
                      onClick={handleFollow}
                      className={`px-5 py-2 rounded-lg text-white transition ${isFollow
                          ? "bg-gray-600 hover:bg-gray-700"
                          : "bg-blue-500 hover:bg-blue-600"
                        }`}
                    >
                      {isFollow ? "Following" : "Follow"}
                    </button>
                    <Link to={`${pagePath.MESSAGE}/${id}`}
                      className="px-5 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition"
                    >
                      Message
                    </Link>
                  </>
                )}
              </div>
            </div>
            {/* Stats */}
            <div className="flex gap-8 mt-6">
              <div>
                <span className="font-bold">
                  {usersProfile.posts?.length || 0}
                </span>{" "}
                posts
              </div>

              <div>
                <span className="font-bold">
                  {usersProfile.followers?.length || 0}
                </span>{" "}
                <Link to={`${pagePath.USERSFOLLOWERSFOLLONG}/${usersProfile._id}`}>
                followers
                </Link>
              </div>

              <div>
                <span className="font-bold">
                  {usersProfile.following?.length || 0}
                </span>{" "}
                <Link to={`${pagePath.USERSFOLLOWERSFOLLONG}/${usersProfile._id}`}>
                following
                </Link>
              </div>
            </div>

            {/* Bio */}
            <div className="mt-6">
              <p className="text-gray-700">
                {usersProfile.bio || "No bio yet"}
              </p>
            </div>
          </div>
        </div>

        <UsersProfileTabs />
      </div>
    </div>
  );
}

export default UsersProfile;