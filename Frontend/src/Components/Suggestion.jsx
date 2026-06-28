import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Loading from "./Loading";
export default function UserSuggestions() {
const {suggestedUsers,suggestionLoading} = useSelector((store)=>store.user)
const users = suggestedUsers?.suggestUsers ||[];
 console.log(suggestionLoading);
if (suggestionLoading) {
  return <p>Loading....</p>
}
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
        {users.map((user) => (
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