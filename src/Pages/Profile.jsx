import React, { useContext } from "react";
import profileImg from "../assets/default-profile-img.jpg";
import { IoPencil } from "react-icons/io5";
import AppLayout from "../Layouts/AppLayout";
import Button from "../Components/Button";
import { AuthContext } from "../Context/AuthContext";

export default function Profile() {
  const { user } = useContext(AuthContext);

  return (
    <AppLayout>
      <div className="flex flex-col px-5 py-3 lg:px-20">
        <section className="container mx-auto w-[350px] p-2">
          <div className="flex gap-4 my-4">
            <div className="relative w-12 h-12">
              <img
                src={user?.avatar || profileImg}
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
              <button className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-md text-gray-500 hover:text-[#9747FF]">
                <IoPencil size={10} />
              </button>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h1 className="font-semibold text-lg">
                  {user?.fullName || "Anonymous User"}
                </h1>
              </div>
              <p className="text-gray-600 text-sm">
                {user?.email || "No email provided"}
              </p>
            </div>
          </div>

          <hr className="border-gray-300 mb-6" />

          <section className="space-y-4">
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

            <div className="flex justify-between items-center">
              <span className="text-gray-700">Password</span>
              <span className="text-[#9747FF]">********</span>
            </div>
            <hr className="border-gray-300" />

            <div className="flex justify-between">
              <span className="text-gray-700">Events hosted</span>
              <span className="font-medium">{user?.eventsHosted?.length || 0}</span>
            </div>
            <hr className="border-gray-300" />

            <div className="flex justify-between">
              <span className="text-gray-700">Events attended</span>
              <span className="font-medium">{user?.eventsAttended?.length || 0}</span>
            </div>

            <hr className="border-gray-300 mb-6" />
          </section>

          <Button content="Edit" className="my-4 w-[80px]" />
        </section>
      </div>
    </AppLayout>
  );
}
