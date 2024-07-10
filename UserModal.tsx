import React, { forwardRef } from "react";
import Link from "next/link";

interface User {
  id: number;
  user_id: string;
  name: string;
  email: string;
  password: string;
  created_at: string;
  role: string;
  gender: string;
  address?: string;
  country?: string;
  phone_number?: string;
}

interface UserModalProps {
  user: User | null;
  closeModal: () => void;
}

const UserModal = forwardRef<HTMLDialogElement, UserModalProps>(
  ({ user, closeModal }, ref) => {
    return (
      <dialog ref={ref} className="modal">
        <div className="modal-box bg-white z-50 p-4">
          <div className="flex flex-col items-center">
            <img
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              alt=""
              className="w-24 h-24 rounded-full mb-2"
            />
            <h3 className="font-bold text-lg">( {user?.role} )</h3>
            <h3 className="font-bold text-lg">{user?.name}</h3>
          </div>
          <div className="border-t border-gray-200 mt-3">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="font-medium text-gray-600">
                  <strong>Address</strong>
                </dt>
                <dd className="mt-1 ml-3 text-gray-900 sm:mt-0 sm:col-span-2">
                  {user?.address}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="font-medium text-gray-600">
                  <strong>Country</strong>
                </dt>
                <dd className="mt-1 ml-3 text-gray-900 sm:mt-0 sm:col-span-2">
                  {user?.country}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="font-medium text-gray-600">
                  <strong>Email</strong>
                </dt>
                <dd className="mt-1 ml-3 text-gray-900 sm:mt-0 sm:col-span-2">
                  {user?.email}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="font-medium text-gray-600">
                  <strong>Role</strong>
                </dt>
                <dd className="mt-1 ml-3 text-gray-900 sm:mt-0 sm:col-span-2">
                  <Link href={`/changeRole/${user?.user_id}`}>
                    {user?.role}
                  </Link>
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="font-medium text-gray-600">
                  <strong>Gender</strong>
                </dt>
                <dd className="mt-1 ml-3 text-gray-900 sm:mt-0 sm:col-span-2">
                  {user?.gender}
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <div
          className="modal-backdrop bg-black bg-opacity-50 fixed inset-0 z-40"
          onClick={closeModal}
        ></div>
      </dialog>
    );
  },
);

UserModal.displayName = "UserModal";
export default UserModal;
