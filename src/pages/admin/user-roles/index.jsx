import React, { useEffect, useState } from "react";
import MainLayout from "../../../layouts/MainLayout";
import axios from "axios";

// Set the base URL for Axios based on environment variable
const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000", // Fallback to localhost if no environment variable
}); 

const UserRolesPage = () => {
  const [roles, setRoles] = useState([]);
  const [users, setUsers] = useState([]); // To display users with their roles
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newRole, setNewRole] = useState("");
  const [roleDescription, setRoleDescription] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  // Fetch roles
  const fetchRoles = async () => {
    try {
      const response = await API.get("/api/user/role"); // Adjust endpoint if needed
      setRoles(response.data);
    } catch (err) {
      setError("Failed to fetch roles. Please try again.");
    }
  };

  // Fetch users
  const fetchUsers = async () => {
    try {
      const response = await API.get("/api/user"); // Adjust endpoint if needed
      setUsers(response.data);
    } catch (err) {
      setError("Failed to fetch users. Please try again.");
    }
  };

  // Add a new role
  const addRole = async () => {
    if (!newRole) {
      alert("Role name cannot be empty!");
      return;
    }

    try {
      const response = await API.post("/api/user/role", {
        name: newRole,
        description: roleDescription,
      });
      setRoles([...roles, response.data]); // Add the new role to the list
      setNewRole("");
      setRoleDescription("");
      alert("Role added successfully!");
    } catch (err) {
      alert("Failed to add role. Please try again.");
    }
  };

  // Assign a role to a user
  const assignRoleToUser = async () => {
    if (!selectedUser || !selectedRole) {
      alert("Please select a user and a role!");
      return;
    }

    try {
      await API.put("/api/users/role", { userId: selectedUser, role: selectedRole });
      alert("Role assigned successfully!");
      fetchUsers(); // Refresh the user list to reflect the new role assignment
    } catch (err) {
      alert("Failed to assign role. Please try again.");
    }
  };

  // Delete a role
  const deleteRole = async (roleName) => {
    if (!window.confirm(`Are you sure you want to delete the role: ${roleName}?`)) return;

    try {
      await API.delete(`/api/user-roles/${roleName}`);
      setRoles(roles.filter((role) => role.name !== roleName)); // Remove deleted role from the list
      alert("Role deleted successfully!");
    } catch (err) {
      alert("Failed to delete role. Please try again.");
    }
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchRoles(), fetchUsers()])
      .catch((err) => setError("Failed to fetch data. Please try again."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Manage User Roles</h1>

        {/* Add Role Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Add a New Role</h2>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Role Name"
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              className="border rounded px-4 py-2 w-1/3"
            />
            <input
              type="text"
              placeholder="Role Description"
              value={roleDescription}
              onChange={(e) => setRoleDescription(e.target.value)}
              className="border rounded px-4 py-2 w-1/2"
            />
            <button
              onClick={addRole}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add Role
            </button>
          </div>
        </div>

        {/* Assign Role to User Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Assign Role to User</h2>
          <div className="flex gap-4">
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="border rounded px-4 py-2 w-1/3"
            >
              <option value="">Select User</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name} ({user.email})
                </option>
              ))}
            </select>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="border rounded px-4 py-2 w-1/3"
            >
              <option value="">Select Role</option>
              {roles.map((role) => (
                <option key={role.name} value={role.name}>
                  {role.name}
                </option>
              ))}
            </select>
            <button
              onClick={assignRoleToUser}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Assign Role
            </button>
          </div>
        </div>

        {/* Role List Section */}
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-4">Existing Roles</h2>
            <ul className="list-disc pl-6">
              {roles.map((role) => (
                <li key={role.name} className="mb-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-bold">{role.name}</h3>
                      <p className="text-gray-600">{role.description || "No description provided."}</p>
                    </div>
                    <button
                      onClick={() => deleteRole(role.name)}
                      className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* User List Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Users and Their Roles</h2>
          <ul className="list-disc pl-6">
            {users.map((user) => (
              <li key={user._id} className="mb-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold">{user.name}</h3>
                    <p className="text-gray-600">Role: {user.role || "No role assigned"}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </MainLayout>
  );
};

export default UserRolesPage;
