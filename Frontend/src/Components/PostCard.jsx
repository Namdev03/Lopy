'use client';

import { useEffect, useState } from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal, Bookmark } from 'lucide-react';
import { getAllPostApi } from '../Services/postApiCollection';

export default function PostCard({ 
  author = "Sarah Anderson",
  authorHandle = "@sarahdesigns",
  authorImage = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
  postImage = "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=600&h=600&fit=crop",
  caption = "Beautiful sunset at the beach 🌅 Nothing beats golden hour with amazing company!",
  likes = 1243,
  comments = 45,
  timestamp = "2 hours ago"
}) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [currentLikes, setCurrentLikes] = useState(likes);
   
  const handleLike = () => {
    setIsLiked(!isLiked);
    setCurrentLikes(isLiked ? currentLikes - 1 : currentLikes + 1);
  };
  const [postData,setPostData]=useState([]);
const getAllPost = async () => {
    try {
        const response = await getAllPostApi()
        console.log("response is",response.posts);
        
         setPostData(response.posts) 
         console.log("post authe is",response.posts.author);
         
    } catch (error) {
        error.response?.message;
    }
}
useEffect(()=>{
    getAllPost();
},[])
  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
      
      {/* Header - Profile Section */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <img
            src={postData?.author?.profilepic}
            alt={author}
            className="w-10 h-10 rounded-full object-cover border border-gray-200"
          />
          <div className="flex flex-col">
            <p className="text-sm font-semibold text-gray-900">{postData?.author?.username}</p>
            <p className="text-xs text-gray-500">{authorHandle}</p>
          </div>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <MoreHorizontal className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Image Section */}
      <div className="w-full aspect-square overflow-hidden bg-gray-100">
        <img
          src={postImage}
          alt="Post"
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Action Buttons - Like, Comment, Share */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <button
            onClick={handleLike}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors group"
          >
            <Heart
              className={`w-6 h-6 transition-all duration-200 ${
                isLiked
                  ? 'fill-red-500 text-red-500'
                  : 'text-gray-700 group-hover:text-red-500'
              }`}
            />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors group">
            <MessageCircle className="w-6 h-6 text-gray-700 group-hover:text-gray-900" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors group">
            <Share2 className="w-6 h-6 text-gray-700 group-hover:text-gray-900" />
          </button>
        </div>
        <button
          onClick={() => setIsSaved(!isSaved)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors group"
        >
          <Bookmark
            className={`w-6 h-6 transition-all duration-200 ${
              isSaved
                ? 'fill-gray-900 text-gray-900'
                : 'text-gray-700 group-hover:text-gray-900'
            }`}
          />
        </button>
      </div>

      {/* Likes Count */}
      <div className="px-4 py-2">
        <p className="text-sm font-semibold text-gray-900">
          {currentLikes.toLocaleString()} {currentLikes === 1 ? 'like' : 'likes'}
        </p>
      </div>

      {/* Caption */}
      <div className="px-4 py-1 pb-3">
        <p className="text-sm text-gray-900">
          <span className="font-semibold">{author}</span>{' '}
          <span className="text-gray-700">{caption}</span>
        </p>
      </div>

      {/* Comments Preview */}
      <div className="px-4 pb-3">
        <button className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
          View all {comments} comments
        </button>
      </div>

      {/* Timestamp */}
      <div className="px-4 py-3 border-t border-gray-100">
        <p className="text-xs text-gray-500 uppercase tracking-wide">{timestamp}</p>
      </div>
    </div>
  );
}
