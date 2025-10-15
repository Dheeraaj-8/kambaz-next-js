"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AccountNavigation() {
  const pathname = usePathname();
  
  const links = [
    { href: "/Account/Signin", id: "wd-account-signin-link", label: "Signin" },
    { href: "/Account/Signup", id: "wd-account-signup-link", label: "Signup" },
    { href: "/Account/Profile", id: "wd-account-profile-link", label: "Profile" },
  ];

  return (
    <div id="wd-account-navigation" className="list-group fs-5 rounded-0">
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link 
            key={link.href}
            href={link.href} 
            id={link.id} 
            className={`list-group-item text-danger border-0 ${isActive ? 'active' : ''}`}
          >
            {link.label}
          </Link>
        );
      })}
    </div>
  );
}
