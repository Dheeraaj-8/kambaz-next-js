"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Nav, NavItem, NavLink } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setCurrentUser } from "./reducer";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const pathname = usePathname();
  const dispatch = useDispatch();
  
  // Load user from localStorage on client mount
  useEffect(() => {
    if (!currentUser && typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        dispatch(setCurrentUser(JSON.parse(storedUser)));
      }
    }
  }, [currentUser, dispatch]);
  
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
              className="list-group-item text-danger border-0"
              style={isActive ? {
                borderLeft: '3px solid #000000',
                color: '#000000',
                fontWeight: 600
              } : undefined}
            >
              {link.label}
            </NavLink>
          </NavItem>
        );
      })}
    </Nav>
  );
}