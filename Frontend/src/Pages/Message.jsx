import React, { useEffect, useState } from "react";
import { axiosInstance } from "../Services/axiosInstance";
import { messageApiEndPoint } from "../Router/messageApiEndPoint";
import { useSelector } from "react-redux";
import{Link} from "react-router"
import { pagePath } from "../Router/pagePath";
export default function Message() {
  const [conversations, setConversations] = useState([]);

  const { userId } = useSelector((store) => store.user);

  const usersApi = async () => {
    try {
      const response = await axiosInstance.get(
        messageApiEndPoint.GETUSERS
      );

      setConversations(response.data.conversations || []);
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    usersApi();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      
      {/* CONTAINER */}
      <div className="w-full max-w-2xl bg-white shadow-lg">

        {/* HEADER */}
        <div className="p-4 border-b">
          <h1 className="text-2xl font-bold text-gray-800">
            Messages
          </h1>
        </div>

        {/* CHAT LIST */}
        <div>
          {conversations.map((conversation) => {
            const otherUser = conversation.participants.find(
              (participant) =>
                participant._id.toString() !== userId.toString()
            );

            return (
              <Link to={`${pagePath.MESSAGE}/${otherUser?._id}`}
                key={otherUser?._id}
                className="flex items-center gap-4 p-4 border-b hover:bg-gray-50 cursor-pointer transition"
              >
                {/* PROFILE IMAGE */}
                <img
                  src={
                    otherUser?.profilepic 
                  }
                  alt={otherUser?.username}
                  className="w-12 h-12 rounded-full object-cover"
                />

                {/* USER INFO */}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">
                    {otherUser?.username}
                  </h3>
                  <p className="text-sm text-gray-500 truncate">
                    Click to start chatting...
                  </p>
                </div>

                {/* RIGHT SIDE DOT */}
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}