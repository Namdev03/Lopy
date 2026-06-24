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

export default function PostCard() {
  const [postData, setPostData] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const getAllPost = async () => {
    try {
      const response = await getAllPostApi();
      setPostData(response.posts);
      // console.log(response.posts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPost();
  }, []);

  return (
    <>
      {postData.map((post) => (
        <div
          key={post._id}
          className="w-full max-w-md mx-auto bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200 mb-6"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <img
                src={post.author?.profilePic}
                alt={post.author?.username}
                className="w-10 h-10 rounded-full object-cover border border-gray-200"
              />

              <div className="flex flex-col">
                <p className="text-sm font-semibold text-gray-900">
                  {post.author?.username}
                </p>
              </div>
            </div>

            <button className="p-2 hover:bg-gray-100 rounded-full">
              <MoreHorizontal className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Post Image */}
          <div className="w-full aspect-square overflow-hidden bg-gray-100">
            <img
              src={post.image}
              alt="Post"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <Heart
                  className={`w-6 h-6 ${
                    isLiked ? 'fill-red-500 text-red-500' : 'text-gray-700'
                  }`}
                />
              </button>

              <button className="p-2 hover:bg-gray-100 rounded-full">
                <MessageCircle className="w-6 h-6 text-gray-700" />
              </button>

              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Share2 className="w-6 h-6 text-gray-700" />
              </button>
            </div>

            <button
              onClick={() => setIsSaved(!isSaved)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <Bookmark
                className={`w-6 h-6 ${
                  isSaved ? 'fill-black text-black' : 'text-gray-700'
                }`}
              />
            </button>
          </div>

          {/* Likes */}
          <div className="px-4 py-2">
            <p className="text-sm font-semibold">
              {post.likes?.length || 0} likes
            </p>
          </div>

          {/* Caption */}
          <div className="px-4 pb-3">
            <p className="text-sm">
              <span className="font-semibold">
                {post.author?.username}
              </span>{' '}
              {post.caption}
            </p>
          </div>

          {/* Comments */}
          <div className="px-4 pb-3">
            <button className="text-sm text-gray-500">
              View all {post.comments?.length || 0} comments
            </button>
          </div>

          {/* Date */}
          <div className="px-4 py-3 border-t border-gray-100">
            <p className="text-xs text-gray-500">
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      ))}
    </>
  );
}