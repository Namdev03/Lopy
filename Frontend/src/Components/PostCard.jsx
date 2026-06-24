'use client';

import { useEffect, useState } from 'react';
import {
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  Bookmark
} from 'lucide-react';

import { getAllPostApi } from '../Services/postApiCollection';
import { axiosInstance } from '../Services/axiosInstance';
import { userApiEndPoint } from '../Router/UserEndPoints';
import { useSelector } from 'react-redux';

export default function PostCard() {
  const [postData, setPostData] = useState([]);
  const [savedPosts, setSavedPosts] = useState({});

  const { userDetails } = useSelector((store) => store.user);
  const currentUserId = userDetails?.toSend?._id;

  const getAllPost = async () => {
    try {
      const response = await getAllPostApi();
      setPostData(response?.posts || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async (id) => {
    if (!currentUserId) return;

    try {
      await axiosInstance.post(`${userApiEndPoint.LIKEUNLIKE}/${id}`);

      setPostData((prev) =>
        prev.map((post) => {
          if (post._id !== id) return post;

          const likes = post.likes || [];
          const isLiked = likes.includes(currentUserId);

          return {
            ...post,
            likes: isLiked
              ? likes.filter((u) => u !== currentUserId)
              : [...likes, currentUserId],
          };
        })
      );
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    getAllPost();
  }, []);

  return (
    <>
      {postData.map((post) => {
        const likes = post.likes || [];
        const isLiked = likes.includes(currentUserId);

        return (
          <div
            key={post._id}
            className="w-full max-w-md mx-auto bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden mb-6"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <div className="flex items-center gap-3">
                <img
                  src={post.author?.profilePic}
                  className="w-10 h-10 rounded-full object-cover"
                  alt=""
                />
                <p className="font-semibold text-sm">
                  {post.author?.username}
                </p>
              </div>

              <MoreHorizontal className="w-5 h-5 text-gray-600" />
            </div>

            {/* Image */}
            <img
              src={post.image}
              className="w-full aspect-square object-cover"
              alt=""
            />

            {/* Actions (FIXED ALIGNMENT HERE) */}
            <div className="flex items-center justify-between px-4 py-3">
              
              {/* LEFT ICONS */}
              <div className="flex items-center gap-4">
                
                <button
                  onClick={() => handleLike(post._id)}
                  className="flex items-center justify-center"
                >
                  <Heart
                    className={`w-6 h-6 transition ${
                      isLiked
                        ? 'fill-red-500 text-red-500'
                        : 'text-gray-700'
                    }`}
                  />
                </button>

                <button className="flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-gray-700" />
                </button>

                <button className="flex items-center justify-center">
                  <Share2 className="w-6 h-6 text-gray-700" />
                </button>
              </div>

              {/* RIGHT ICON */}
              <button
                onClick={() =>
                  setSavedPosts((prev) => ({
                    ...prev,
                    [post._id]: !prev[post._id],
                  }))
                }
                className="flex items-center justify-center"
              >
                <Bookmark
                  className={`w-6 h-6 ${
                    savedPosts[post._id]
                      ? 'fill-black text-black'
                      : 'text-gray-700'
                  }`}
                />
              </button>
            </div>

            {/* Likes */}
            <div className="px-4">
              <p className="font-semibold text-sm">
                {likes.length} likes
              </p>
            </div>

            {/* Caption */}
            <div className="px-4 pb-3 text-sm">
              <span className="font-semibold">
                {post.author?.username}
              </span>{' '}
              {post.caption}
            </div>

            {/* Comments */}
            <div className="px-4 pb-3 text-sm text-gray-500">
              View all {post.comments?.length || 0} comments
            </div>
          </div>
        );
      })}
    </>
  );
}