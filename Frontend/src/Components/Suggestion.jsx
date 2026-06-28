import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";
import {
  followAndUnfollowApi,
} from "../Services/userApiCollection";
import { suggestedUserAsync, userprofileAsync } from "../Redux/userSlice";

export default function Suggestion() {
  const dispatch = useDispatch()
const {suggestedUsers,suggestionLoading,profile} = useSelector((store)=>store.user)
const users = suggestedUsers?.suggestUsers ||[];
if (suggestionLoading) {
  return <p>Loading....</p>
}
 const followAndUnfollow = async (id) => {
  try {
    const response = await followAndUnfollowApi(id)
    dispatch(userprofileAsync())
  } catch (error) {
   alert( error.response.message)
  }
 }
return (
  <div className="w-full max-w-sm mx-auto bg-white rounded-2xl p-4">
    <div className="space-y-4">
      {users.map((user) => {
        const isFollow = profile?.following
          ?.map(String)
          .includes(String(user._id));

        return (
          <div
            key={user._id}
            className="flex items-center justify-between gap-3"
          >
            {/* Left */}
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <img
                src={user.profilepic}
                alt={user.username}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover flex-shrink-0"
              />

              <div className="min-w-0">
                <h3 className="text-sm sm:text-base font-semibold text-zinc-900 truncate">
                  {user.username}
                </h3>

                {/* Optional bio/name */}
                {/* <p className="text-xs text-zinc-500 truncate">
                  {user.fullName}
                </p> */}
              </div>
            </div>

            {/* Right */}
            <button
              onClick={() => followAndUnfollow(user._id)}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition whitespace-nowrap ${
                isFollow
                  ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              {isFollow ? "Following" : "Follow"}
            </button>
          </div>
        );
      })}
    </div>
  </div>
);
}