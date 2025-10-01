import Link from "next/link";
import { MdOutlineAssignment } from "react-icons/md";
import { Form, Button } from "react-bootstrap";

export default function Assignments() {
  return (
    <div id="wd-assignments">
      {/* Top Row: Search and Buttons */}
      <div className="assignments-top-bar">
        <div className="input-group" style={{ maxWidth: "300px" }}>
          <span className="input-group-text">🔍</span>
          <Form.Control
            type="text"
            placeholder="Search..."
            id="wd-search-input"
          />
        </div>
        <div className="d-flex gap-2">
          <Button variant="success">SHOW BY DATE</Button>
          <Button variant="outline-secondary">SHOW BY TYPE</Button>
        </div>
      </div>

      {/* Upcoming Assignments Section */}
      <div className="assignments-section">
        <div className="assignments-section-header">
          <span>▼ Upcoming Assignments</span>
        </div>

        {/* Assignment List */}
        <ul className="list-group">
          {[
            { id: 123, title: "A2", meta: "Due Oct 1 at 11:59pm | -/375 pts" },
            { id: 124, title: "Q2", meta: "Available until Oct 1 at 11:59pm | Due Oct 1 at 11:59pm | -/23 pts" },
            { id: 125, title: "Q3", meta: "Not available until Oct 1 at 12am | Due Oct 8 at 11:59pm | -/32 pts" },
            { id: 126, title: "A3", meta: "Due Oct 15 at 11:59pm | -/198 pts" },
            { id: 127, title: "Q4", meta: "Not available until Oct 8 at 12am | Due Oct 15 at 11:59pm | -/17 pts" },
            { id: 128, title: "Q5", meta: "Not available until Oct 15 at 12am | Due Oct 22 at 11:59pm | -/31 pts" },
            { id: 129, title: "A4", meta: "Due Oct 29 at 11:59pm | -/126 pts" }
          ].map(item => (
            <li className="list-group-item" key={item.id}>
              <div className="d-flex align-items-start">
                <MdOutlineAssignment className="me-3 mt-1 fs-4 text-muted" />
                <div className="flex-fill">
                  <Link href={`/Courses/1234/Assignments/${item.id}`} className="fw-bold text-dark text-decoration-none">
                    {item.title}
                  </Link>
                  <div className="text-muted small">{item.meta}</div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
