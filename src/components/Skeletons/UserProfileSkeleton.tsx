import React from "react";

function UserProfileSkeleton() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* Header */}
      <div className="bg-neutral-900 h-40 relative">
        <div className="absolute bottom-[-50px] left-4 w-28 h-28 bg-gray-700 rounded-full border-4 border-neutral-950 animate-pulse"></div>
      </div>

      {/* Profile Info */}
      <div className="mt-12 px-4">
        <div className="mt-4">
          <div className="w-48 h-6 bg-gray-700 rounded-md animate-pulse"></div>
          <div className="w-36 h-4 bg-gray-700 rounded-md mt-2 animate-pulse"></div>
        </div>

        {/* Follow Stats */}
        <div className="flex space-x-6 mt-6">
          <div className="flex flex-col items-center">
            <div className="w-16 h-6 bg-gray-700 rounded-md animate-pulse"></div>
            <div className="w-12 h-4 bg-gray-700 rounded-md mt-2 animate-pulse"></div>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-6 bg-gray-700 rounded-md animate-pulse"></div>
            <div className="w-12 h-4 bg-gray-700 rounded-md mt-2 animate-pulse"></div>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-6 bg-gray-700 rounded-md animate-pulse"></div>
            <div className="w-12 h-4 bg-gray-700 rounded-md mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex mt-8 border-b border-neutral-700">
        <div className="flex-1 text-center py-4">
          <div className="w-20 h-6 mx-auto bg-gray-700 rounded-md animate-pulse"></div>
        </div>
        <div className="flex-1 text-center py-4">
          <div className="w-20 h-6 mx-auto bg-gray-700 rounded-md animate-pulse"></div>
        </div>
        <div className="flex-1 text-center py-4">
          <div className="w-20 h-6 mx-auto bg-gray-700 rounded-md animate-pulse"></div>
        </div>
      </div>

      {/* Tweet Skeletons */}
      <div className="mt-6 space-y-6 px-4">
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className="bg-neutral-900 p-4 rounded-lg shadow-md animate-pulse"
            >
              <div className="flex space-x-4">
                <div className="w-12 h-12 bg-gray-700 rounded-full"></div>
                <div className="flex-1">
                  <div className="w-40 h-4 bg-gray-700 rounded-md"></div>
                  <div className="w-32 h-4 bg-gray-700 rounded-md mt-2"></div>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="w-full h-4 bg-gray-700 rounded-md"></div>
                <div className="w-3/4 h-4 bg-gray-700 rounded-md"></div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default UserProfileSkeleton;
