import React, { forwardRef, useImperativeHandle, useRef, useState } from "react";

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

interface EditUserModalProps {
  user: User | null;
  closeModal: () => void;
  saveUser: (user: User) => void;
}

const EditUserProfileModal = forwardRef<HTMLDialogElement, EditUserModalProps>(
  ({ user, closeModal, saveUser }, ref) => {
    const dialogRef = useRef<HTMLDialogElement | null>(null);
    const [editUser, setEditUser] = useState<User | null>(user);

    useImperativeHandle(ref, () => dialogRef.current!);

    if (!editUser) {
      return null;
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setEditUser((prevUser) => prevUser ? { ...prevUser, [name]: value } : null);
    };

    const handleSubmit = () => {
      if (editUser) {
        saveUser(editUser);
        closeModal();
      }
    };

    const handleBackdropClick = (event: React.MouseEvent<HTMLDialogElement, MouseEvent>) => {
      if (event.target === event.currentTarget) {
        closeModal();
      }
    };

    return (
      <dialog ref={dialogRef} className="modal" onClick={handleBackdropClick}>
        <div className="modal-box bg-white z-50 p-4">
          <div className="flex flex-col items-center">
            <h3 className="font-bold text-lg">Edit Profile</h3>
          </div>
          <form className="mt-4 space-y-4">
            <div className="flex flex-col">
              <label className="text-gray-600">Name</label>
              <input
                type="text"
                name="name"
                value={editUser.name}
                onChange={handleInputChange}
                className="input input-bordered"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                value={editUser.email}
                onChange={handleInputChange}
                className="input input-bordered"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-600">Address</label>
              <input
                type="text"
                name="address"
                value={editUser.address ?? ""}
                onChange={handleInputChange}
                className="input input-bordered"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-600">Country</label>
              <input
                type="text"
                name="country"
                value={editUser.country ?? ""}
                onChange={handleInputChange}
                className="input input-bordered"
              />
            </div>
          </form>
          <button
            onClick={handleSubmit}
            className="mt-4 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
          <button
            onClick={closeModal}
            className="mt-2 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Cancel
          </button>
        </div>
      </dialog>
    );
  }
);

EditUserProfileModal.displayName = "EditUserProfileModal";
export default EditUserProfileModal;
