/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import PeopleTable from "./Table/page";
import * as client from "../../client";  // ✅ Import from Courses client

export default function People() {
  const { cid } = useParams();
  const [users, setUsers] = useState<any[]>([]);

  const fetchUsers = async () => {
    if (!cid || Array.isArray(cid)) return;
    
    try {
      // ✅ Fetch only users enrolled in this course
      const enrolledUsers = await client.findUsersForCourse(cid);
      setUsers(enrolledUsers);
    } catch (error) {
      console.error("Error fetching users for course:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [cid]);

  return (
    <div>
      <h3>People</h3>
      <PeopleTable users={users} fetchUsers={fetchUsers} />
    </div>
  );
}