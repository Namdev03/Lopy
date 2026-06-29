import React, { useEffect } from "react";
import { Heart, MessageCircle, Send, Bookmark } from "lucide-react";
import { Link, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { pagePath } from "../Router/pagePath";
import { followAndUnfollowApi, likeAndUnLikeApi } from "../Services/userApiCollection";
import { allPostAsync, userOnePostAsync } from "../Redux/postSlice";

export default function PostCard() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const { userId } = useSelector((store) => store.user);
  const { userOnePost } = useSelector((store) => store.post);
console.log(userId);

  useEffect(() => {
    if (id) {
      dispatch(userOnePostAsync(id));
    }
  }, [dispatch, id]);
  const likeAndUnlike = async (postId) => {
    try {
        const respose =await likeAndUnLikeApi(postId)
      dispatch(userOnePostAsync(postId));
      dispatch(allPostAsync())
    } catch (error) {
      alert(error?.response?.data?.message || error.message);
    }
  };

  if (!userOnePost) {
    return (
      <div className="text-center py-10">
        Loading...
      </div>
    );
  }

  const isLiked = userOnePost.likes?.some(
    (likeId) => String(likeId) === String(userId)
  );
console.log(isLiked);

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow border overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <img
            src={userOnePost.author?.profilePic}
            alt={userOnePost.author?.username}
            className="w-10 h-10 rounded-full object-cover"
          />
          <h3 className="font-semibold text-sm sm:text-base">
            {userOnePost.author?.username}
          </h3>
        </div>
      </div>

      {/* Image */}
      <img
        src={userOnePost.image}
        alt="Post"
        className="w-full aspect-square object-cover"
      />

      {/* Actions */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => likeAndUnlike(userOnePost._id)}
          >
            <Heart
              className={`w-6 h-6 transition ${
                isLiked
                  ? "text-red-500 fill-red-500"
                  : "hover:text-red-500"
              }`}
            />
          </button>

          <Link to={`${pagePath.COMMENT}/${userOnePost._id}`}>
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
        {userOnePost.likes?.length || 0} likes
      </div>

      {/* Caption */}
      <div className="px-4 pb-4 text-sm">
        <span className="font-semibold mr-2">
          {userOnePost.author?.username}
        </span>
        {userOnePost.caption}
      </div>

      {/* Comments */}
      <div className="px-4 pb-4 text-sm text-gray-500 hover:text-gray-700 cursor-pointer">
        View all {userOnePost.comments?.length || 0} comments
      </div>
    </div>
  );
}