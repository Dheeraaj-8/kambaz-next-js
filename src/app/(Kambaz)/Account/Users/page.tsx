/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import PeopleTable from "../../Courses/[cid]/People/Table/page";
import * as client from "../client";
import { FormControl } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";

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
    setRole(role);
    if (role) {
      const users = await client.findUsersByRole(role);
      setUsers(users);
    } else {
      fetchUsers();
    }
  };

  const fetchUsers = async () => {
    const users = await client.findAllUsers();
    setUsers(users);
  };

  const createUser = async () => {
    try {
      console.log("Creating new user...");
      const user = await client.createUser({
        firstName: "New",
        lastName: `User${users.length + 1}`,
        username: `newuser${Date.now()}`,
        password: "password123",
        email: `email${users.length + 1}@neu.edu`,
        section: "S101",
        role: "STUDENT",
      });
      console.log("User created:", user);
      setUsers([user, ...users]);  // ✅ Add to beginning for visibility
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Failed to create user. Check console for details.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <button 
        onClick={createUser} 
        className="float-end btn btn-danger wd-add-people mb-2"
      >
        <FaPlus className="me-2" />
        People
      </button>
      
      <h3>Users</h3>
      
      <FormControl 
        onChange={(e) => filterUsersByName(e.target.value)} 
        placeholder="Search people"
        className="float-start w-25 me-2 wd-filter-by-name" 
      />
      
      <select 
        value={role} 
        onChange={(e) => filterUsersByRole(e.target.value)}
        className="form-select float-start w-25 wd-select-role mb-3"
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