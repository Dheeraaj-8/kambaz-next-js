import Link from "next/link";
import { Form, Button } from "react-bootstrap";

export default function Profile() {
  return (
    <div className="p-4">
      <div id="wd-profile-screen" style={{ maxWidth: "300px", width: "100%" }}>
        <h3 className="fw-bold mb-3">Profile</h3>
        <Form>
          <Form.Control
            defaultValue="alice"
            placeholder="Username"
            className="wd-username mb-2 p-2"
            style={{ fontSize: "0.9rem" }}
          />
          <Form.Control
            defaultValue="123"
            placeholder="Password"
            type="password"
            className="wd-password mb-2 p-2"
            style={{ fontSize: "0.9rem" }}
          />
          <Form.Control
            defaultValue="Alice"
            placeholder="First Name"
            id="wd-firstname"
            className="mb-2 p-2"
            style={{ fontSize: "0.9rem" }}
          />
          <Form.Control
            defaultValue="Wonderland"
            placeholder="Last Name"
            id="wd-lastname"
            className="mb-2 p-2"
            style={{ fontSize: "0.9rem" }}
          />
          <Form.Control
            placeholder="mm/dd/yyyy"
            type="date"
            id="wd-dob"
            className="mb-2 p-2"
            style={{ fontSize: "0.9rem" }}
          />
          <Form.Control
            defaultValue="alice@wonderland.com"
            type="email"
            id="wd-email"
            className="mb-2 p-2"
            style={{ fontSize: "0.9rem" }}
          />
          <Form.Select
            defaultValue="USER"
            id="wd-role"
            className="mb-3 p-2"
            style={{ fontSize: "0.9rem" }}
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </Form.Select>
          <Link href="/Account/Signin" id="wd-signout-btn">
            <Button variant="danger" className="w-100 py-2" style={{ fontSize: "0.9rem" }}>
              Signout
            </Button>
          </Link>
        </Form>
      </div>
    </div>
  );
}
