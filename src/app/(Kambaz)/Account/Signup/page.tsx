import Link from "next/link";
import { Form, Button } from "react-bootstrap";

export default function Signup() {
  return (
    <div className="p-4">
      <div id="wd-signup-screen" style={{ maxWidth: "300px", width: "100%" }}>
        <h3 className="fw-bold mb-3">Sign Up</h3>
        <Form>
          <Form.Control
            placeholder="Username"
            className="wd-username mb-2 p-2"
            autoComplete="off"
            style={{ fontSize: "0.9rem" }}
          />
          <Form.Control
            placeholder="Password"
            type="password"
            className="wd-password mb-2 p-2"
            autoComplete="new-password"
            style={{ fontSize: "0.9rem" }}
          />
          <Form.Control
            placeholder="Verify Password"
            type="password"
            className="wd-password-verify mb-3 p-2"
            autoComplete="new-password"
            style={{ fontSize: "0.9rem" }}
          />
          <Link href="/Account/Profile" id="wd-signup-btn">
            <Button variant="primary" className="w-100 py-2 mb-2" style={{ fontSize: "0.9rem" }}>
              Sign up
            </Button>
          </Link>
          <div className="text-center">
            <Link href="/Account/Signin" id="wd-signin-link" className="text-decoration-none small">
              Sign in
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

