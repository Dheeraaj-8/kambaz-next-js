"use client";
import { useState, useEffect } from "react";
import PeopleTable from "../../Courses/[cid]/People/Table";
import * as client from "../client";
import FormControl from "react-bootstrap/esm/FormControl";
import { FaPlus } from "react-icons/fa";

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const filterUsersByName = async (name: string) => {
    setName(name);
    if (name) {
      const users = await client.findUsersByPartialName(name);
      setUsers(users);
    } else {
      fetchUsers();
    }
  };


  const filterUsersByRole = async (role: string) => {
    console.log("Filtering by role:", role);
    setRole(role);
    if (role) {
      const filteredUsers = await client.findUsersByRole(role);
      console.log("Received filtered users:", filteredUsers);
      console.log("Number of users:", filteredUsers.length);
      setUsers(filteredUsers);
    } else {
      fetchUsers();
    }
  };

  const fetchUsers = async () => {
    try {
      const allUsers = await client.findAllUsers();
      console.log("Fetched all users:", allUsers.length);
      setUsers(allUsers);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  console.log("Current users state:", users.length, users);

  const createUser = async () => {
    const user = await client.createUser({
      firstName: "New",
      lastName: `User${users.length + 1}`,
      username: `newuser${Date.now()}`,
      password: "password123",
      email: `email${users.length + 1}@neu.edu`,
      section: "S101",
      role: "STUDENT",
    });
    setUsers([...users, user]);
  };


  return (
    <div className="p-3">
      <button onClick={createUser} className="float-end btn btn-danger wd-add-people">
        <FaPlus className="me-2" />
        Users
      </button>
      <h3>Users</h3>
      <FormControl onChange={(e) => filterUsersByName(e.target.value)} placeholder="Search people"
        className="float-start w-25 me-2 wd-filter-by-name" />
      <select
        value={role}
        onChange={(e) => filterUsersByRole(e.target.value)}
        className="form-select float-start w-25 wd-select-role"
      >
        <option value="">All Roles</option>
        <option value="STUDENT">Students</option>
        <option value="TA">Assistants</option>
        <option value="FACULTY">Faculty</option>
        <option value="ADMIN">Administrators</option>
      </select>

      <PeopleTable users={users} fetchUsers={fetchUsers} />
    </div>
  );
}