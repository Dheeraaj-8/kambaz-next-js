"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Nav, NavItem, NavLink } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const pathname = usePathname();
  
  // Conditionally show links based on login status
  const links = currentUser 
    ? [{ href: "/Account/Profile", label: "Profile", id: "wd-account-profile-link" }]
    : [
        { href: "/Account/Signin", label: "Signin", id: "wd-account-signin-link" },
        { href: "/Account/Signup", label: "Signup", id: "wd-account-signup-link" },
      ];

  return (
    <Nav variant="pills" className="list-group fs-5 rounded-0" id="wd-account-navigation">
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <NavItem key={link.href}>
            <NavLink
              as={Link}
              href={link.href}
              active={isActive}
              id={link.id}
              className={`list-group-item text-danger border-0 ${isActive ? 'account-nav-active' : ''}`}
            >
              {link.label}
            </NavLink>
          </NavItem>
        );
      })}
    </Nav>
  );
}