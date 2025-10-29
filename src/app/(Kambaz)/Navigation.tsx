"use client"
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function KambazNavigation() {
  const pathname = usePathname();
  const links = [
    { label: "Account",   path: "/Account",   icon: FaRegCircleUser, id: "wd-account-link" },
    { label: "Dashboard", path: "/Dashboard", icon: AiOutlineDashboard, id: "wd-dashboard-link" },
    { label: "Courses",   path: "/Courses",   icon: LiaBookSolid, id: "wd-course-link" },
    { label: "Calendar",  path: "/Calendar",  icon: IoCalendarOutline, id: "wd-calendar-link" },
    { label: "Inbox",     path: "/Inbox",     icon: FaInbox, id: "wd-inbox-link" },
    { label: "Labs",      path: "/Labs",      icon: LiaCogSolid, id: "wd-labs-link" },
  ];

  return (
    <>
      <ListGroup
        className="rounded-0 kambaz-nav"
        id="wd-kambaz-navigation"
      >
        {/* NEU Logo */}
        <ListGroupItem className="bg-dark border-0 text-center" id="wd-neu-logo">
          <Link href="https://www.northeastern.edu/" target="_blank" rel="noopener noreferrer">
            <Image src="/images/NEU.png" width={75} height={75} alt="Northeastern University" />
          </Link>
        </ListGroupItem>

        {/* Navigation Links */}
        {links.map((link) => {
          const IconComponent = link.icon;
          const isActive = pathname === link.path;
          return (
            <ListGroupItem 
              key={link.path} 
              className={`border-0 text-center ${isActive ? 'bg-white' : 'bg-dark'}`}
            >
              <Link 
                href={link.path} 
                id={link.id} 
                className="nav-link-custom"
              >
                <IconComponent className="fs-1" />
                {link.label}
              </Link>
            </ListGroupItem>
          );
        })}
      </ListGroup>
    </>
  );
}
