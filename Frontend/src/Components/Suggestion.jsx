import React, { useEffect, useState } from "react";
import { axiosInstance } from "../Services/axiosInstance";
import { userApiEndPoint } from "../Router/UserEndPoints";

export default function UserSuggestions() {
  const [userData, setUserData] = useState([]);

  const suggesteUserApi = async () => {
    try {
      const response = await axiosInstance.get(
        userApiEndPoint.SUGGESTUSER
      );

      // console.log("Response Data:", response.data.suggestUsers);

      setUserData(response.data.suggestUsers);
    } catch (error) {
      console.error(
        error.response?.data?.message || error.message
      );
    }
  };

  useEffect(() => {
    suggesteUserApi();
  }, []);

  return (
    <div className="w-full max-w-sm bg-white rounded-2xl p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-zinc-500">
          Suggested for you
        </h2>
        <button className="text-xs font-semibold hover:text-zinc-500 transition">
          See All
        </button>
      </div>

      {/* Users */}
      <div className="space-y-4">
        {userData.map((user) => (
          <div
            key={user._id}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <img
                src={user.profilepic}
                alt={user.username}
                className="w-11 h-11 rounded-full object-cover"
              />

              <div>
                <h3 className="text-sm font-semibold text-zinc-900">
                  {user.username}
                </h3>
              </div>
            </div>

            <button className="text-sm font-semibold text-blue-500 hover:text-blue-700 transition">
              Follow
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}