import { useEffect, useState } from 'react';
import {
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  Bookmark,
} from 'lucide-react';

import { axiosInstance } from '../Services/axiosInstance';
import { userApiEndPoint } from '../Router/UserEndPoints';
import { useDispatch, useSelector } from 'react-redux';
import { allPostAsync } from '../Redux/postSlice';
// import Loading from './Loading';
import { useNavigate } from 'react-router'
import { pagePath } from '../Router/pagePath';
export default function PostCard() {
  const [savedPosts, setSavedPosts] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userDetails } = useSelector(
    (store) => store.user
  );

  const { loading, post } = useSelector(
    (store) => store.post
  );
  const currentUserId =
    userDetails?.toSend?._id;

  useEffect(() => {
    dispatch(allPostAsync());
  }, [dispatch]);

  const handleLike = async (id) => {
    if (!currentUserId) return;
    try {
      await axiosInstance.post(
        `${userApiEndPoint.LIKEUNLIKE}/${id}`
      );
      dispatch(allPostAsync());
    } catch (error) {
      console.log(
        error.response?.data || error.message
      );
    }
  };

  // if (loading) {
  //   return <Loading />;
  // }

  return (
    <>
      {post?.map((item) => {
        const likes = item.likes || [];
        const isLiked = likes.includes(
          currentUserId
        );

        return (
          <div
            key={item._id}
            className="w-full max-w-md mx-auto bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden mb-6"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <div className="flex items-center gap-3">
                <img
                  src={item.author?.profilePic}
                  alt={item.author?.username}
                  className="w-10 h-10 rounded-full object-cover"
                />

                <p className="font-semibold text-sm">
                  {item.author?.username}
                </p>
              </div>

              <MoreHorizontal className="w-5 h-5 text-gray-600" />
            </div>

            {/* Post Image */}
            <img
              src={item.image}
              alt="post"
              className="w-full aspect-square object-cover"
            />

            {/* Actions */}
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => handleLike(item._id)}
                >
                  <Heart
                    className={`w-6 h-6 transition ${isLiked
                      ? 'fill-red-500 text-red-500'
                      : 'text-gray-700'
                      }`}
                  />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    navigate(`${pagePath.COMMENT}/${item._id}`)
                  
                  }
                >
                  <MessageCircle className="w-6 h-6 text-gray-700" />
                </button>

                <button type="button">
                  <Share2 className="w-6 h-6 text-gray-700" />
                </button>
              </div>
              <button
                type="button"
                onClick={() =>
                  setSavedPosts((prev) => ({
                    ...prev,
                    [item._id]:
                      !prev[item._id],
                  }))
                }
              >
                <Bookmark
                  className={`w-6 h-6 ${savedPosts[item._id]
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
                {item.author?.username}
              </span>{' '}
              {item.caption}
            </div>

            {/* Comments */}
            <div className="px-4 pb-3 text-sm text-gray-500">
              View all {item.comments?.length || 0}{' '}
              comments
            </div>
          </div>
        );
      })}
    </>
  );
}