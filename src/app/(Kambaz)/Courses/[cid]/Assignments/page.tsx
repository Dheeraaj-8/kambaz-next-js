"use client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from "react";
import { MdOutlineAssignment } from "react-icons/md";
import { FaCheckCircle, FaTrash } from "react-icons/fa";
import {
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
  ListGroup,
  Modal,
} from "react-bootstrap";
import { deleteAssignment } from "./reducer";

export default function Assignments() {
  const { cid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const assignments = useSelector((state: any) => state.assignmentsReducer.assignments);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const courseAssignments = assignments.filter((a: any) => a.course === cid);
  
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [assignmentToDelete, setAssignmentToDelete] = useState<string | null>(null);

  // Check if user is faculty or admin
  const isFacultyOrAdmin = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  const handleDeleteClick = (assignmentId: string) => {
    setAssignmentToDelete(assignmentId);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (assignmentToDelete) {
      dispatch(deleteAssignment(assignmentToDelete));
      setShowDeleteModal(false);
      setAssignmentToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setAssignmentToDelete(null);
  };

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
        
        {/* Only show action buttons for faculty/admin */}
        {isFacultyOrAdmin && (
          <Col md="auto" className="ms-auto d-flex gap-2">
            <Button 
              variant="danger" 
              onClick={() => router.push(`/Courses/${cid}/Assignments/New`)}
            >
              + Assignment
            </Button>
            <Button variant="success">SHOW BY DATE</Button>
            <Button variant="outline-secondary">SHOW BY TYPE</Button>
          </Col>
        )}
      </Row>

      {/* Assignments List */}
      <h5 className="mb-3">▼ Assignments</h5>
      <ListGroup className="assignment-list">
        {courseAssignments.length > 0 ? (
          courseAssignments.map((a: { _id: Key | null | undefined; course: any; title: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; availableFromDate: string | number | Date; dueDate: string | number | Date; points: any; }) => (
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
                    {a.availableFromDate ? `Not available until ${new Date(a.availableFromDate).toLocaleDateString()}` : "Available now"}
                  </div>
                  <div className="text-muted small">
                    {a.dueDate ? `Due ${new Date(a.dueDate).toLocaleDateString()} | ` : ""}
                    {a.points || 100} pts
                  </div>
                </div>
              </div>

              {/* Right side actions - Only show for faculty/admin */}
              <div className="d-flex align-items-center gap-2">
                {isFacultyOrAdmin && (
                  <FaTrash
                    className="text-danger fs-5"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDeleteClick(a._id?.toString() ?? "")}
                  />
                )}
                <FaCheckCircle className="text-success fs-4 flex-shrink-0" />
              </div>
            </ListGroup.Item>
          ))
        ) : (
          <ListGroup.Item className="text-muted fst-italic">
            No assignments available for this course.
          </ListGroup.Item>
        )}
      </ListGroup>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={handleCancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to remove this assignment? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}