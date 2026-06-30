import { useEffect, useState } from "react";
import { axiosInstance } from "../Services/axiosInstance";
import { userApiEndPoint } from "../Router/UserEndPoints";
import { useSelector } from "react-redux";
import {Link} from "react-router"
import { pagePath } from "../Router/pagePath";
export default function FollowersFollowing() {
  const { profile } = useSelector((store) => store.user);

  const [activeTab, setActiveTab] = useState("followers");

  const [data, setData] = useState({
    followers: [],
    following: [],
  });

  useEffect(() => {
    handleContact();
  }, []);

  const handleContact = async () => {
    try {
      const response = await axiosInstance.get(
        userApiEndPoint.FOLLOWERSFOLLOWING
      );

      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const list =
    activeTab === "followers"
      ? data.followers
      : data.following;

  return (
    <div className="max-w-3xl mx-auto p-5">

      {/* User Info */}
      <div className="border rounded p-4 flex items-center gap-4">
        <img
          src={profile?.profilepic || "https://via.placeholder.com/100"}
          alt=""
          className="w-20 h-20 rounded-full object-cover"
        />

        <div>
          <h2 className="text-xl font-semibold">
            {profile?.username}
          </h2>

          <p className="text-gray-500">
            {profile?.bio}
          </p>

          <div className="flex gap-6 mt-2 text-sm">
            <span>
              <b>{profile?.followers?.length || 0}</b> Followers
            </span>

            <span>
              <b>{profile?.following?.length || 0}</b> Following
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b mt-6">
        <button
          onClick={() => setActiveTab("followers")}
          className={`px-5 py-2 ${
            activeTab === "followers"
              ? "border-b-2 border-blue-600 font-semibold text-blue-600"
              : "text-gray-600"
          }`}
        >
          Followers
        </button>
        <button
          onClick={() => setActiveTab("following")}
          className={`px-5 py-2 ${
            activeTab === "following"
              ? "border-b-2 border-blue-600 font-semibold text-blue-600"
              : "text-gray-600"
          }`}
        >
          Following
        </button>
      </div>

      {/* List */}
      <div className="mt-4">
        {list.length > 0 ? (
          list.map((user) => (
            <div
              key={user._id}
              className="flex justify-between items-center border-b py-4"
            >
              <Link to={`${pagePath.USERSPROFILE}/${user._id}`} className="flex items-center gap-3">
                <img
                  src={user.profilepic || "https://via.placeholder.com/100"}
                  alt=""
                  className="w-12 h-12 rounded-full object-cover"
                />

                <div>
                  <h3 className="font-medium">{user.username}</h3>
                  <p className="text-sm text-gray-500">
                    @{user.username}
                  </p>
                </div>
              </Link>

              <div className="flex gap-2">
                <button className="px-4 py-1 bg-blue-500 text-white rounded">
                  Following
                </button>

                <Link to={`${pagePath.MESSAGE}/${user._id}`} className="px-4 py-1 border rounded">
                  Message
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 text-gray-500">
            No {activeTab} found
          </div>
        )}
      </div>
    </div>
  );
}