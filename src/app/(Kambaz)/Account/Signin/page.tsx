"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { FormControl, Button, Alert } from "react-bootstrap";

export default function Signin() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const { users } = useSelector((state: any) => state.accountReducer);
  
  const signin = () => {
    setError("");

    if (!credentials.username || !credentials.password) {
      setError("Please enter username and password");
      return;
    }

    const user = users.find(
      (u: any) =>
        u.username === credentials.username &&
        u.password === credentials.password
    );
    
    if (!user) {
      setError("Invalid username or password");
      return;
    }
    
    dispatch(setCurrentUser(user));
    router.push("/Dashboard");
  };

  return (
    <div className="p-4">
      <div id="wd-signin-screen" style={{ maxWidth: "300px", width: "100%" }}>
        <h3 className="fw-bold mb-3">Sign in</h3>
        
        {error && (
          <Alert variant="danger" className="py-2 px-3 small">
            {error}
          </Alert>
        )}

        <FormControl
          value={credentials.username}
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
          className="mb-2 p-2"
          placeholder="username"
          id="wd-username"
          style={{ fontSize: "0.9rem" }}
        />
        <FormControl
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          className="mb-2 p-2"
          placeholder="password"
          type="password"
          id="wd-password"
          style={{ fontSize: "0.9rem" }}
        />
        <Button onClick={signin} id="wd-signin-btn" className="w-100 mb-2" style={{ fontSize: "0.9rem" }}>
          Sign in
        </Button>
        <div className="text-center">
          <Link id="wd-signup-link" href="/Account/Signup" className="text-decoration-none small">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}