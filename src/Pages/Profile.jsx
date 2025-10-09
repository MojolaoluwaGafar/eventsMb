import React, { useContext, useEffect } from "react";
import profileImg from "../assets/default-profile-img.jpg";
import { IoPencil } from "react-icons/io5";
import AppLayout from "../Layouts/AppLayout";
import { AuthContext } from "../Context/AuthContext";
import { EventContext } from "../Context/EventContext";

export default function Profile() {
  const { user, token } = useContext(AuthContext);
  const { userEvents, loadingUserEvents, refreshUserEvents } = useContext(EventContext);

  console.log("User events from context:", userEvents);

  // 🔄 Refresh user events when profile loads
  useEffect(() => {
    if (user && token) {
      refreshUserEvents(user._id, token);
    }
  }, [user, token]);

  if (loadingUserEvents) {
    return <div className="text-center mt-10 text-lg font-medium">Loading your profile...</div>;
  }

  const getInitials = (fullName) => {
    if (!fullName) return "";
    return fullName
      .split(" ")
      .slice(0, 2)
      .map((name) => name[0])
      .join("")
      .toUpperCase();
  };

  const hostedCount = Array.isArray(userEvents?.hosting) ? userEvents.hosting.length : 0;
  const attendedCount = Array.isArray(userEvents?.attending) ? userEvents.attending.length : 0;
  const purchasedCount = Array.isArray(userEvents?.purchasedTickets)
    ? userEvents.purchasedTickets.length
    : 0;

  return (
    <AppLayout>
      <div className="flex flex-col px-8 py-3 lg:px-20">
        <section className="container mx-auto w-full max-w-sm p-2">
          {/* Header */}
          <header className="flex gap-4 my-4">
            <div className="relative w-12 h-12">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt="Profile"
                  onError={(e) => (e.target.src = profileImg)}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-gray-300 flex items-center justify-center text-black border border-purple-800 font-bold">
                  {getInitials(user?.fullName)}
                </div>
              )}

              <button
                aria-label="Edit profile picture"
                className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-md text-gray-500 hover:text-[#9747FF]"
              >
                <IoPencil size={10} />
              </button>
            </div>

            <div className="flex flex-col">
              <h1 className="font-semibold text-lg">{user?.fullName || "Anonymous User"}</h1>
              <p className="text-gray-600 text-sm">{user?.email || "No email provided"}</p>
            </div>
          </header>

          <hr className="border-gray-300 mb-6" />

          {/* Info */}
          <article className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-700">Name</span>
              <span className="font-medium">{user?.fullName || "-"}</span>
            </div>
            <hr className="border-gray-300" />

            <div className="flex justify-between">
              <span className="text-gray-700">Email account</span>
              <span className="font-medium">{user?.email || "-"}</span>
            </div>
            <hr className="border-gray-300" />

            <div className="flex justify-between">
              <span className="text-gray-700">Password</span>
              <span className="font-medium text-purple-800">**********</span>
            </div>
            <hr className="border-gray-300" />

            <div className="flex justify-between">
              <span className="text-gray-700">Events hosted</span>
              <span className="font-medium">{hostedCount}</span>
            </div>
            <hr className="border-gray-300" />

            <div className="flex justify-between">
              <span className="text-gray-700">Events attended</span>
              <span className="font-medium">{attendedCount}</span>
            </div>
            <hr className="border-gray-300" />

            <div className="flex justify-between">
              <span className="text-gray-700">Total Tickets Purchased</span>
              <span className="font-medium">{purchasedCount}</span>
            </div>
          </article>
        </section>
      </div>
    </AppLayout>
  );
}
