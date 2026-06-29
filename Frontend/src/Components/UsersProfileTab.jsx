import { useState } from "react";
import {
  Grid3X3,
  Bookmark,
} from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import { pagePath } from "../Router/pagePath";

const UsersProfileTabs = () => {
  const { usersProfile } = useSelector((store) => store.user);

  const [activeTab, setActiveTab] = useState("posts"); // ✅ FIXED

  const posts = usersProfile?.posts || [];
  const saved = [];
 
  const data = activeTab === "posts" ? posts : saved;
  return (
    <div className="w-full mt-8">

      {/* Tabs */}
      <div className="border-t border-gray-300">
        <div className="flex justify-center items-center">

          {/* POSTS */}
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

          {/* SAVED */}
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

      {/* GRID */}
      <div className="grid grid-cols-3 gap-[2px] sm:gap-1 mt-1">
        {data.map((item) => (
          <Link
            to={`${pagePath.USERONEPOST}/${item._id}`}
            key={item._id}
            className="relative aspect-square overflow-hidden cursor-pointer group bg-gray-100"
          >
            <img
              src={item.image}
              alt="post"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
        ))}
      </div>

    </div>
  );
};

export default UsersProfileTabs;