"use client";
import { useEffect, useState, useRef } from "react";
import { useSession } from "next-auth/react";
import UserModal from "../components/modal/UserModal";
import SignIn from "../signIn/page";

// Define the User interface
interface User {
  id: number;
  user_id: string;
  name: string;
  email: string;
  password: string;
  created_at: string;
  role: string;
  gender: string;
}

// UsersPage component
const UsersPage = () => {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [sortCriteria, setSortCriteria] = useState<"name" | "role">("name");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch("/api/CRUD/getUsers");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  const openModal = (user: User) => {
    setSelectedUser(user);
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
    setSelectedUser(null);
  };

  const handleSortChange = (criteria: "name" | "role") => {
    setSortCriteria(criteria);
  };

  const handleSort = (a: User, b: User) => {
    if (sortCriteria === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortCriteria === "role") {
      return a.role.localeCompare(b.role);
    }

    return 0;
  };

  const filteredUsers = users
    .filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .sort(handleSort);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <SignIn />;
  }

  return (
    <div className="flex justify-center items-start h-screen pt-20">
      <div className="w-full max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
          <h1 className="text-lg font-semibold text-gray-900 mb-3">
            User&nbsp;List
          </h1>
          <div className="flex gap-4 mb-3">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="px-4 py-2 mb-4 rounded-md bg-base-100 m-1 font-semibold"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                </svg>

              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
              >
                <li>
                  <a onClick={() => handleSortChange("name")}>Sort by Name</a>
                </li>
                <li>
                  <a onClick={() => handleSortChange("role")}>Sort by Role</a>
                </li>
              </ul>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Users..."
              className="input rounded-full bg-gray-100 w-80 mb-3 shrink-0 focus:outline-none"
            />
          </div>
        </div>

        {filteredUsers.length > 0 ? (
          <ul
            role="list"
            className="divide-y divide-gray-100 transition-all duration-500 ease-in-out"
          >
            {filteredUsers.map((user) => (
              <li key={user.id} className="flex justify-between gap-x-6 py-5">
                <div
                  onClick={() => openModal(user)}
                  className="flex justify-between gap-x-6 py-5 w-full hover:bg-gray-100 transition duration-300 ease-in-out"
                >
                  <img
                    className="h-12 w-12 flex-none rounded-full bg-gray-50"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    alt=""
                  />
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      {user.name}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      {user.email}
                    </p>
                  </div>
                  <div
                    className="hidden shrink-0 sm:flex sm:flex-col sm:items-end"
                    style={{ marginLeft: "40rem" }}
                  >
                    <p className="text-sm leading-6 text-gray-500">
                      {user.role}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center text-gray-500 py-10">No User Found</div>
        )}
      </div>
      <UserModal ref={modalRef} user={selectedUser} closeModal={closeModal} />
    </div>
  );
};

export default UsersPage;
