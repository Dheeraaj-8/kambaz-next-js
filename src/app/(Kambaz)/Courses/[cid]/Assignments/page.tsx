"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { MdOutlineAssignment } from "react-icons/md";
import { Container, Row, Col, InputGroup, FormControl, Button, ListGroup } from "react-bootstrap";
import { assignments } from "@/app/(Kambaz)/Database/assignments";

export default function Assignments() {
  const { cid } = useParams(); // course id from route

  // Filter assignments for the current course only
  const courseAssignments = assignments.filter(a => a.course === cid);

  return (
    <Container id="wd-assignments" className="mt-3">
      {/* Top Row */}
      <Row className="align-items-center mb-3">
        <Col md={4}>
          <InputGroup>
            <InputGroup.Text>🔍</InputGroup.Text>
            <FormControl type="text" placeholder="Search..." id="wd-search-input" />
          </InputGroup>
        </Col>
        <Col md="auto" className="ms-auto d-flex gap-2">
          <Button variant="success">SHOW BY DATE</Button>
          <Button variant="outline-secondary">SHOW BY TYPE</Button>
        </Col>
      </Row>

      {/* Assignment List */}
      <Row>
        <Col>
          <h5 className="mb-3">▼ Assignments</h5>
          <ListGroup>
            {courseAssignments.length > 0 ? (
              courseAssignments.map((assignment) => (
                <ListGroup.Item key={assignment._id}>
                  <Row className="align-items-start">
                    <Col xs="auto" className="pt-1">
                      <MdOutlineAssignment className="fs-4 text-muted" />
                    </Col>
                    <Col>
                      <Link
                        href={`/Courses/${assignment.course}/Assignments/${assignment._id}`}
                        className="fw-bold text-dark text-decoration-none"
                      >
                        {assignment.title}
                      </Link>
                      <div className="text-muted small">Course: {assignment.course}</div>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))
            ) : (
              <ListGroup.Item className="text-muted fst-italic">
                No assignments available for this course.
              </ListGroup.Item>
            )}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}
