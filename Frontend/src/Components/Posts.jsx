import React, { useEffect } from "react";
import { Heart, MessageCircle, Send, Bookmark } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";
import {
  followAndUnfollowApi,
  likeAndUnLikeApi,
} from "../Services/userApiCollection";
import { allPostAsync } from "../Redux/postSlice";
import { Link } from "react-router"
import { pagePath } from "../Router/pagePath";
import { userprofileAsync } from "../Redux/userSlice";

export default function Posts() {
  const dispatch = useDispatch();
  const { allPost, isLoading } = useSelector((store) => store.post);
  const { profile } = useSelector((store) => store.user);
  const posts = allPost?.posts || [];
  const userId = profile?._id;
  const likeAndUnlike = async (id) => {
    try {
      await likeAndUnLikeApi(id);
      dispatch(allPostAsync());
    } catch (error) {
      console.error(error?.response?.message || "Like action failed");
    }
  };

  const followAndUnfollow = async (id) => {
    try {
       await followAndUnfollowApi(id);
      dispatch(allPostAsync());
      dispatch(userprofileAsync())
    } catch (error) {
      console.error(error?.response?.message || "Follow action failed");
    }
  };
  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-6 py-4">
      <div className="flex flex-col items-center gap-6">
        {posts.map((post) => {
          const isLiked =
            post.likes?.map(String).includes(String(userId))
          const isFollow = profile?.following
            ?.map(String)
            .includes(String(post.author?._id));
          return (
            <div
              key={post._id}
              className="w-full max-w-md mx-auto bg-white rounded-xl shadow border overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4">
                <Link to={`${pagePath.USERSPROFILE}/${post?.author?._id}`} className="flex items-center gap-3">
                  <img
                    src={post.author?.profilePic}
                    alt={post.author?.username}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <h3 className="font-semibold text-sm sm:text-base">
                    {post.author?.username}
                  </h3>
                </Link>
                {
                  profile?._id !== post?.author?._id &&
                  <button
                    onClick={() =>
                      followAndUnfollow(post.author?._id)
                    }
                    type="button"
                    className="px-3 py-1 text-xs sm:text-sm bg-blue-500 text-white rounded-full hover:bg-blue-600"
                  >
                    {isFollow ? "Following" : "Follow"}
                  </button>}
              </div>
              {/* Image */}
              <img
                src={post.image}
                alt="post"
                className="w-full aspect-square object-cover"
              />

              {/* Actions */}
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4 sm:gap-5">
                  <button
                    type="button"
                    onClick={() => likeAndUnlike(post._id)}
                  >
                    <Heart
                      className={`w-6 h-6 transition ${isLiked
                          ? "text-red-500 fill-red-500"
                          : "hover:text-red-500"
                        }`}
                    />
                  </button>

                  <Link to={`${pagePath.COMMENT}/${post._id}`}>
                    <MessageCircle className="w-6 h-6 hover:text-blue-500 transition" />
                  </Link>
                  <button type="button">
                    <Send className="w-6 h-6 hover:text-blue-500 transition" />
                  </button>
                </div>

                <button type="button">
                  <Bookmark className="w-6 h-6 hover:text-black transition" />
                </button>
              </div>
              {/* Likes */}
              <div className="px-4 text-sm font-semibold">
                {post.likes?.length || 0} likes
              </div>

              {/* Caption */}
              <div className="px-4 pb-4 text-sm">
                <span className="font-semibold mr-2">
                  {post.author?.username}
                </span>
                {post.caption}
              </div>

              {/* Comments */}
              <div className="px-4 pb-4 text-sm text-gray-500 hover:text-gray-700 cursor-pointer">
                View all {post.comments?.length || 0} comments
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}