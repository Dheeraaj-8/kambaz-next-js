"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser, addUser } from "../reducer";
import { Form, Button, Alert } from "react-bootstrap";

export default function Signup() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    verifyPassword: "",
  });
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const { users } = useSelector((state: any) => state.accountReducer);

  const signup = () => {
    setError("");

    // Validation
    if (!credentials.username || !credentials.password || !credentials.verifyPassword) {
      setError("All fields are required");
      return;
    }

    if (credentials.password !== credentials.verifyPassword) {
      setError("Passwords do not match");
      return;
    }

    // Check if username already exists
    const existingUser = users.find(
      (u: any) => u.username === credentials.username
    );
    
    if (existingUser) {
      setError("Username already exists");
      return;
    }

    // Create new user
    const newUser = {
      _id: new Date().getTime().toString(),
      username: credentials.username,
      password: credentials.password,
      firstName: "",
      lastName: "",
      email: "",
      dob: "",
      role: "STUDENT",
      loginId: "",
      section: "",
      lastActivity: new Date().toISOString().split('T')[0],
      totalActivity: "00:00:00"
    };

    // Add user to Redux store (and localStorage via reducer)
    dispatch(addUser(newUser));
    
    // Set as current user
    dispatch(setCurrentUser(newUser));
    
    // Navigate to Dashboard
    router.push("/Dashboard");
  };

  return (
    <div className="p-4">
      <div id="wd-signup-screen" style={{ maxWidth: "300px", width: "100%" }}>
        <h3 className="fw-bold mb-3">Sign Up</h3>
        
        {error && (
          <Alert variant="danger" className="py-2 px-3 small">
            {error}
          </Alert>
        )}

        <Form>
          <Form.Control
            placeholder="Username"
            className="wd-username mb-2 p-2"
            value={credentials.username}
            onChange={(e) =>
              setCredentials({ ...credentials, username: e.target.value })
            }
            autoComplete="off"
            style={{ fontSize: "0.9rem" }}
          />
          <Form.Control
            placeholder="Password"
            type="password"
            className="wd-password mb-2 p-2"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
            autoComplete="new-password"
            style={{ fontSize: "0.9rem" }}
          />
          <Form.Control
            placeholder="Verify Password"
            type="password"
            className="wd-password-verify mb-3 p-2"
            value={credentials.verifyPassword}
            onChange={(e) =>
              setCredentials({ ...credentials, verifyPassword: e.target.value })
            }
            autoComplete="new-password"
            style={{ fontSize: "0.9rem" }}
          />
          <Button
            variant="primary"
            className="w-100 py-2 mb-2"
            onClick={signup}
            id="wd-signup-btn"
            style={{ fontSize: "0.9rem" }}
          >
            Sign up
          </Button>
          <div className="text-center">
            <Link
              href="/Account/Signin"
              id="wd-signin-link"
              className="text-decoration-none small"
            >
              Sign in
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}