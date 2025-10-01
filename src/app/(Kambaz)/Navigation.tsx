import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import Link from "next/link";

export default function KambazNavigation() {
  return (
    <>
      <ListGroup
        className="rounded-0 kambaz-nav"
        id="wd-kambaz-navigation"
      >
        {/* NEU Logo */}
        <ListGroupItem className="bg-dark border-0 text-center" id="wd-neu-logo">
          <img src="/images/NEU.png" width="75px" alt="Northeastern University" />
        </ListGroupItem>

        {/* Account */}
        <ListGroupItem className="border-0 bg-dark text-center">
          <Link href="/Account" id="wd-account-link" className="nav-link-custom">
            <FaRegCircleUser className="fs-1" />
            Account
          </Link>
        </ListGroupItem>

        {/* Dashboard (active example) */}
        
        <ListGroupItem className="border-0 bg-dark text-center">
          <Link href="/Dashboard" id="wd-dashboard-link" className="nav-link-custom active">
            <AiOutlineDashboard className="fs-1" />
            Dashboard
          </Link>
        </ListGroupItem>

        {/* Courses */}
        <ListGroupItem className="border-0 bg-dark text-center">
          <Link href="/Courses" id="wd-course-link" className="nav-link-custom">
            <LiaBookSolid className="fs-1" />
            Courses
          </Link>
        </ListGroupItem>

        {/* Calendar */}
        <ListGroupItem className="border-0 bg-dark text-center">
          <Link href="/Calendar" id="wd-calendar-link" className="nav-link-custom">
            <IoCalendarOutline className="fs-1" />
            Calendar
          </Link>
        </ListGroupItem>

        {/* Inbox */}
        <ListGroupItem className="border-0 bg-dark text-center">
          <Link href="/Inbox" id="wd-inbox-link" className="nav-link-custom">
            <FaInbox className="fs-1" />
            Inbox
          </Link>
        </ListGroupItem>

        {/* Labs */}
        <ListGroupItem className="border-0 bg-dark text-center">
          <Link href="/Labs" id="wd-labs-link" className="nav-link-custom">
            <LiaCogSolid className="fs-1" />
            Labs
          </Link>
        </ListGroupItem>
      </ListGroup>
    </>
  );
}
