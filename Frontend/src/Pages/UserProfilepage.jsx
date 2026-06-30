import React, { useEffect, useState } from "react";
import {
  Grid,
  Bookmark,
  Tag,
  Settings,
  Edit,
  PlusCircle,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { userProfileApi } from "../Services/userApiCollection";
import ProfileTabs from "../Components/ProfileTab";
import { logoutAsync, userprofileAsync } from "../Redux/userSlice";
import { Link } from "react-router";
import { pagePath } from "../Router/pagePath";

const UserProfilePage = () => {

const dispatch = useDispatch()
  const {profile,isLoggedIn } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(userprofileAsync())
  },[dispatch]);
  if (!profile) {
    return <h2 className="text-center mt-10">Loading...</h2>;
  }
  return ( 
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-3 sm:px-5 md:px-8 py-6">
        {/* Profile Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10">

          <div className="flex-shrink-0">
            <img
              src={profile?.profilepic}
              alt="profile"
              className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-gray-200"
            />
          </div>

          <div className="flex-1 w-full">

            <div className="flex flex-col lg:flex-row items-center gap-4">
              <h1 className="text-xl sm:text-2xl font-semibold">
                {profile?.username}
              </h1>

              <div className="flex gap-2">
                <Link to={pagePath.EDITPROFILE} className="px-4 py-2 bg-gray-100 rounded-lg">
                  <Edit size={16} className="inline mr-2" />
                  Edit Profile
                </Link>
                  
                {/* <button className="p-2 bg-gray-100 rounded-lg">
                  <Settings size={20} />
                </button> */}
                 <button onClick={()=>dispatch(logoutAsync())} className="p-2 bg-gray-100 rounded-lg">
                  Logout
                </button>
              </div>
            </div>
            <div className="flex gap-8 mt-6">
              <div>
                <span className="font-bold">
                  {profile?.posts?.length || 0}
                </span>{" "}
                posts
              </div>

              <div>
                <span className="font-bold">
                  {profile?.followers?.length || 0}
                </span>
                <Link to={pagePath.FOLLOWERSFOLLOWING
                }>
                followers
                </Link>
                
              </div>

              <div>
                <span className="font-bold">
                  {profile?.following?.length || 0}
                </span>{" "}
              <Link to={pagePath.FOLLOWERSFOLLOWING}>
                Following
                </Link>
              </div>
            </div>

            <div className="mt-6">
              <p>{profile?.bio}</p>
            </div>

          </div>
        </div>

        <ProfileTabs/>
      </div>
    </div>
  );
};

export default UserProfilePage;