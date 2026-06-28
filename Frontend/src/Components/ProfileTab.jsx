import { useEffect, useState } from "react";
import {
  Grid3X3,
  Clapperboard,
  Bookmark,
  Heart,
  MessageCircle,
} from "lucide-react";
import { useSelector } from "react-redux";
import { userPostApi } from "../Services/postApiCollection";
import { Link } from "react-router";
import { pagePath } from "../Router/pagePath";

const ProfileTabs = () => {
const [postData,setPostData] =useState([])
const [activeTab, setActiveTab] = useState("posts");
const userPost = async () => {
  try {
    const response =await userPostApi()
    // console.log("user post response",response); 
    setPostData(response.post)
  } catch (error) {
  }
} 
useEffect(()=>{
  userPost();
},[])
const posts = postData|| [];
const saved = []; 

const data = activeTab === "posts" ? posts : saved;
  return (
    <div className="w-full mt-8">
      {/* Tabs */}
      <div className="border-t border-gray-300">
        <div className="flex justify-center items-center">
          <button
            onClick={() => setActiveTab("posts")}
            className={`flex items-center gap-2 px-4 py-4 text-xs sm:text-sm uppercase font-semibold border-t-2 transition-all
            ${
              activeTab === "posts"
                ? "border-black text-black"
                : "border-transparent text-gray-500 hover:text-black"
            }`}
          >
            <Grid3X3 size={18} />
            <span className="hidden sm:block">Posts</span>
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`flex items-center gap-2 px-4 py-4 text-xs sm:text-sm uppercase font-semibold border-t-2 transition-all
            ${
              activeTab === "saved"
                ? "border-black text-black"
                : "border-transparent text-gray-500 hover:text-black"
            }`}
          >
            <Bookmark size={18} />
            <span className="hidden sm:block">Saved</span>
          </button>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-3 gap-[2px] sm:gap-1 mt-1">
        {data.map((item) => (
          <Link to={`${pagePath.USERONEPOST}/${item._id}`}
            key={item._id}
            className="relative aspect-square overflow-hidden cursor-pointer group bg-gray-100"
          >
            <img
              src={item.image}
              alt=""
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProfileTabs;