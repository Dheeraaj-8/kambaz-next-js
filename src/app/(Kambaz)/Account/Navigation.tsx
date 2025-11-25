"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Nav } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const pathname = usePathname();

  const isActive = (link: string) => pathname.includes(link);

  return (
    <Nav className="flex-column fs-5">

      {/* SIGNIN / SIGNUP IF LOGGED OUT */}
      {!currentUser && (
        <>
          <Nav.Link
            as={Link}
            href="/Account/Signin"
            className={`py-2 nav-custom ${isActive("Signin") ? "active-link" : ""}`}
          >
            Signin
          </Nav.Link>

          <Nav.Link
            as={Link}
            href="/Account/Signup"
            className={`py-2 nav-custom ${isActive("Signup") ? "active-link" : ""}`}
          >
            Signup
          </Nav.Link>
        </>
      )}

      {/* PROFILE IF LOGGED IN */}
      {currentUser && (
        <Nav.Link
          as={Link}
          href="/Account/Profile"
          className={`py-2 nav-custom ${isActive("Profile") ? "active-link" : ""}`}
        >
          Profile
        </Nav.Link>
      )}

      {/* ADMIN ONLY → USERS */}
      {currentUser && currentUser.role === "ADMIN" && (
        <Nav.Link
          as={Link}
          href="/Account/Users"
          className={`py-2 nav-custom ${
            pathname.endsWith("Users") ? "active-link" : ""
          }`}
        >
          Users
        </Nav.Link>
      )}
    </Nav>
  );
}
