import React from "react";
import StoryNavbar from "../Components/StoryNavbar";
import UserSuggestions from "../Components/Suggestion";
import PostCard from "../Components/PostCard";

function MainHome() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        
        <div className="grid grid-cols-1 xl:grid-cols-[620px_320px] justify-center gap-8 xl:gap-12">
          
          {/* Feed Section */}
          <main className="w-full max-w-[620px] mx-auto">
            <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-zinc-200">
              <StoryNavbar />
            </div>

            <div className="py-4 space-y-6">
              <PostCard />
            </div>
          </main>
          {/* Suggestions Sidebar */}
          <aside className="hidden xl:block">
            <div className="sticky top-6 w-[320px]">
              <UserSuggestions />
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}

export default MainHome;