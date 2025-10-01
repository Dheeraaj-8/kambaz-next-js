import { Button } from "react-bootstrap";
import { FaBan, FaCheckCircle } from "react-icons/fa";
import { 
  BiImport, 
  BiTargetLock 
} from "react-icons/bi";
import { 
  MdHomeFilled, 
  MdAnnouncement, 
  MdBarChart, 
  MdNotifications 
} from "react-icons/md";
import { RiBarChart2Fill } from "react-icons/ri";

export default function CourseStatus() {
  return (
    <div id="wd-course-status" style={{ minWidth: "300px" }}>
      <h2>Course Status</h2>
      
      {/* Unpublish and Published buttons side by side */}
      <div className="d-flex gap-2 mt-3 mb-3">
        <Button variant="light" className="flex-fill border">
          <FaBan className="me-2" />
          Unpublish
        </Button>
        <Button variant="success" className="flex-fill">
          <FaCheckCircle className="me-2" />
          Published
        </Button>
      </div>
      
      {/* Vertical list of action buttons */}
      <div className="d-flex flex-column gap-1">
        <Button variant="light" className="w-100 text-start border">
          <BiImport className="me-2" />
          Import Existing Content
        </Button>
        <Button variant="light" className="w-100 text-start border">
          <BiTargetLock className="me-2" />
          Import from Commons
        </Button>
        <Button variant="light" className="w-100 text-start border">
          <MdHomeFilled className="me-2" />
          Choose Home Page
        </Button>
        <Button variant="light" className="w-100 text-start border">
          <RiBarChart2Fill className="me-2" />
          View Course Stream
        </Button>
        <Button variant="light" className="w-100 text-start border">
          <MdAnnouncement className="me-2" />
          New Announcement
        </Button>
        <Button variant="light" className="w-100 text-start border">
          <MdBarChart className="me-2" />
          New Analytics
        </Button>
        <Button variant="light" className="w-100 text-start border">
          <MdNotifications className="me-2" />
          View Course Notifications
        </Button>
      </div>
    </div> 
  );
}