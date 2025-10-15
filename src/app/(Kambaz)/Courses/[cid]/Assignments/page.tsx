"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { MdOutlineAssignment } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import {
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
  ListGroup,
} from "react-bootstrap";
import { assignments } from "@/app/(Kambaz)/Database/assignments";

export default function Assignments() {
  const { cid } = useParams();
  const courseAssignments = assignments.filter((a) => a.course === cid);

  return (
    <Container id="wd-assignments" className="mt-3">
      {/* Top Row */}
      <Row className="align-items-center mb-3">
        <Col md={4}>
          <InputGroup>
            <InputGroup.Text>🔍</InputGroup.Text>
            <FormControl type="text" placeholder="Search..." />
          </InputGroup>
        </Col>
        <Col md="auto" className="ms-auto d-flex gap-2">
          <Button variant="success">SHOW BY DATE</Button>
          <Button variant="outline-secondary">SHOW BY TYPE</Button>
        </Col>
      </Row>

      {/* Assignments List */}
      <h5 className="mb-3">▼ Assignments</h5>
      <ListGroup className="assignment-list">
        {courseAssignments.length > 0 ? (
          courseAssignments.map((a) => (
            <ListGroup.Item
              key={a._id}
              className="assignment-item d-flex align-items-center justify-content-between py-3"
            >
              <div className="d-flex align-items-start gap-3 flex-grow-1">
                <MdOutlineAssignment className="fs-4 text-muted mt-1" />
                <div>
                  <Link
                    href={`/Courses/${a.course}/Assignments/${a._id}`}
                    className="fw-bold text-dark text-decoration-none"
                  >
                    {a.title}
                  </Link>
                  <div className="assignment-subtitle text-danger small">
                    Multiple Modules | Not available until October 15, 2025
                  </div>
                  <div className="text-muted small">
                    Due October 22, 2025 | 100 pts
                  </div>
                </div>
              </div>

              {/* Right checkmark */}
              <FaCheckCircle className="text-success fs-4 ms-3 flex-shrink-0" />
            </ListGroup.Item>
          ))
        ) : (
          <ListGroup.Item className="text-muted fst-italic">
            No assignments available for this course.
          </ListGroup.Item>
        )}
      </ListGroup>
    </Container>
  );
}
