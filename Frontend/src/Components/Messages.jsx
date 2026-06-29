import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getMessageAsync } from "../Redux/messageSlice";
import { useDispatch } from "react-redux";

export default function MessagesPage() {
   const { id } = useParams();
   const dispatch = useDispatch()
  useEffect(()=>{
    dispatch( getMessageAsync(id))
  },[id])
  return (
    <></>
    // <div className="flex h-screen bg-gray-100 pl-0 sm:pl-2 md:pl-4 lg:pl-8">
    //   <div className="flex flex-col flex-1 bg-white">

    //     {/* Header */}
    //     <div className="flex items-center gap-3 border-b bg-white px-4 py-3 sm:px-6">
    //       <img
    //         src="https://i.pravatar.cc/40?img=5"
    //         alt="User"
    //         className="h-10 w-10 rounded-full sm:h-12 sm:w-12"
    //       />

    //       <div>
    //         <h2 className="text-base font-semibold sm:text-lg">
    //           John Doe
    //         </h2>
    //         <p className="text-xs text-green-500 sm:text-sm">
    //           Online
    //         </p>
    //       </div>
    //     </div>
    //     {/* Messages */}
    //     <div className="flex-1 overflow-y-auto bg-gray-50 px-3 py-4 sm:px-5">
    //       <div className="space-y-4">
    //         {messages.map((msg) => (
    //           <div
    //             key={msg.id}
    //             className={`flex ${
    //               msg.sender === "me"
    //                 ? "justify-end"
    //                 : "justify-start"
    //             }`}
    //           >
    //             <div
    //               className={`max-w-[80%] sm:max-w-sm md:max-w-md lg:max-w-lg px-4 py-2 rounded-2xl shadow ${
    //                 msg.sender === "me"
    //                   ? "bg-blue-600 text-white rounded-br-none"
    //                   : "bg-white text-gray-800 rounded-bl-none"
    //               }`}
    //             >
    //               <p className="break-words text-sm sm:text-base">
    //                 {msg.text}
    //               </p>

    //               <span
    //                 className={`mt-1 block text-[10px] sm:text-xs ${
    //                   msg.sender === "me"
    //                     ? "text-blue-100"
    //                     : "text-gray-400"
    //                 }`}
    //               >
    //                 {msg.time}
    //               </span>
    //             </div>
    //           </div>
    //         ))}
    //       </div>
    //     </div>

    //     {/* Input */}
    //     <div className="border-t bg-white px-3 py-3 sm:px-5 sm:py-4">
    //       <div className="flex items-center gap-2 sm:gap-3">
    //         <input
    //           type="text"
    //           placeholder="Type a message..."
    //           value={newMessage}
    //           onChange={(e) => setNewMessage(e.target.value)}
    //           onKeyDown={(e) => e.key === "Enter" && sendMessage()}
    //           className="flex-1 rounded-full border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:py-3"
    //         />

    //         <button
    //           onClick={sendMessage}
    //           className="rounded-full bg-blue-600 px-4 py-2 text-sm text-white transition hover:bg-blue-700 sm:px-6 sm:py-3"
    //         >
    //           Send
    //         </button>
    //       </div>
    //     </div>

    //   </div>
    // </div>
  );
}