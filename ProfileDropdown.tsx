"use client";
import { useState, useRef } from "react";
import { LogoutButton } from "./loginout";
import { useSession } from "next-auth/react";
import Link from "next/link";
import UserProfileModal from "./modal/UserProfileModal";
import EditUserProfileModal from "./modal/EditUserProfileModal";

const ProfileDropdown = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(session?.user || null);
  const modalRef = useRef<HTMLDialogElement>(null);
  const editUserProfileModalRef = useRef<HTMLDialogElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const openUserModal = () => {
    setIsUserModalOpen(true);
    modalRef.current?.showModal();
  };

  const closeUserModal = () => {
    setIsUserModalOpen(false);
    modalRef.current?.close();
  };

  const openEditModal = () => {
    closeUserModal();
    setIsEditModalOpen(true);
    editUserProfileModalRef.current?.showModal();
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    editUserProfileModalRef.current?.close();

    modalRef.current?.showModal();
  };

  const saveUser = async (user: any) => {
    try {
      const response = await fetch('/api/CRUD/updateProfile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      const updatedUser = await response.json();

      closeEditModal();
      setSelectedUser(updatedUser);
      
      // Reopen the user profile modal with the updated user info
      modalRef.current?.showModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center px-3 py-2 absolute top-[-1px] right-0 text-sm font-medium text-gray-700 w-56 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition duration-150 ease-in-out"
      >
        <img
          src={
            session?.user?.image ??
            "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
          }
          alt="User Avatar"
          className="w-10 h-10 rounded-full"
        />    <div className="relative inline-block">
        <div className="group">
        <span className="ml-2">{session?.user?.name ?? "Profile"}</span>
          <div className="hidden group-hover:block absolute right-0 top-10 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-20">
            <div className="py-2 px-2 text-sm text-gray-800 font-medium border-b border-gray-200">
              <p className="font-semibold">Logged in as:</p>
              <p>{session.user.name}</p>
              <p className="text-xs text-gray-500">{session.user.role}</p>
              <p className="my-2 flex items-center hover:bg-gray-100 rounded-md"></p>
            </div>
          </div>
        </div>
      </div>
      </button>
      {isOpen && (
        <div className="absolute right-0 top-10 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-20">
          <div className="py-2 px-4 text-sm text-gray-800 font-medium border-b border-gray-200">
         <p onClick={openUserModal} className="block w-full text-left py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
            <h1 className="text-s text-black-500">My account</h1>
          
        </p>
        <p><Link href={"/about"} className="block w-full text-left py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
            <h1 className="text-s text-black-500">About..</h1>
          </Link>
        </p>
          </div>
          <LogoutButton className="block w-full text-left py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200" />
        </div>
      )}
      <UserProfileModal
          ref={modalRef}
          user={session?.user}
          closeModal={closeUserModal}
          openEditModal={openEditModal}
      />
      <EditUserProfileModal
          ref={editUserProfileModalRef}
          user={session?.user}
          closeModal={closeEditModal}
          saveUser={saveUser}
      />
    </div>
  );
};

export default ProfileDropdown;
