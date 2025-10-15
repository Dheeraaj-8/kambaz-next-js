"use client";

import React from "react";
import { useParams } from "next/navigation";
import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { users, enrollments } from "@/app/(Kambaz)/Database/page";
import { User } from "@/app/(Kambaz)/Database/users";
import { Enrollment } from "@/app/(Kambaz)/Database/enrollments";

export default function PeopleTable() {
  const params = useParams();
  const cid = params?.cid; // course id from route params

  // users and enrollments are now imported directly

  const filteredUsers = users.filter((usr: User) =>
    enrollments.some(
      (enrollment: Enrollment) => enrollment.user === usr._id && enrollment.course === cid
    )
  );

  return (
    <div id="wd-people-table">
      <Table striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user: User) => (
            <tr key={user._id}>
              <td className="wd-full-name text-nowrap">
                <FaUserCircle className="me-2 fs-1 text-secondary" />
                <span className="wd-first-name">{user.firstName} </span>
                <span className="wd-last-name">{user.lastName}</span>
              </td>
              <td className="wd-login-id">{user.loginId}</td>
              <td className="wd-section">{user.section}</td>
              <td className="wd-role">{user.role}</td>
              <td className="wd-last-activity">{user.lastActivity}</td>
              <td className="wd-total-activity">{user.totalActivity}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
