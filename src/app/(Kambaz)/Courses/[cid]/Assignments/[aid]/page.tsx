"use client";
import { Form, Button, Row, Col, Card, Container } from "react-bootstrap";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAssignment, updateAssignment } from "../reducer";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const assignments = useSelector((state: any) => state.assignmentsReducer.assignments);
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const isNew = aid === "New";
  const existingAssignment = !isNew ? assignments.find((a: any) => a._id === aid) : null;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState(100);
  const [dueDate, setDueDate] = useState("");
  const [availableFrom, setAvailableFrom] = useState("");
  const [availableUntil, setAvailableUntil] = useState("");

  const isFacultyOrAdmin = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";
  const isStudent = currentUser?.role === "STUDENT";

  useEffect(() => {
    if (!currentUser) {
      router.push("/Account/Signin");
      return;
    }
    if (isNew && !isFacultyOrAdmin) {
      router.push(`/Courses/${cid}/Assignments`);
    }
  }, [currentUser, isNew, isFacultyOrAdmin, router, cid]);

  useEffect(() => {
    if (existingAssignment) {
      setName(existingAssignment.title || "");
      setDescription(existingAssignment.description || "");
      setPoints(existingAssignment.points || 100);
      setDueDate(existingAssignment.dueDate || "");
      setAvailableFrom(existingAssignment.availableFromDate || "");
      setAvailableUntil(existingAssignment.availableUntilDate || "");
    }
  }, [existingAssignment]);

  const handleSave = () => {
    const assignmentData = {
      course: cid as string,
      name,
      description,
      points,
      dueDate,
      availableFromDate: availableFrom,
      availableUntilDate: availableUntil,
    };

    if (isNew) {
      dispatch(addAssignment(assignmentData));
    } else if (existingAssignment) {
      dispatch(updateAssignment({ ...existingAssignment, title: name, ...assignmentData }));
    }
    router.push(`/Courses/${cid}/Assignments`);
  };

  if (!currentUser) return null;

  if (!isNew && !existingAssignment) {
    return (
      <Container className="mt-3">
        <div className="alert alert-warning">Assignment not found.</div>
        <Button variant="secondary" onClick={() => router.push(`/Courses/${cid}/Assignments`)}>
          Back to Assignments
        </Button>
      </Container>
    );
  }

  // STUDENT READ-ONLY VIEW
  if (isStudent && !isNew) {
    return (
      <Container className="mt-3">
        <Card>
          <Card.Header className="bg-light">
            <h4 className="mb-0">{existingAssignment?.title}</h4>
          </Card.Header>
          <Card.Body>
            <div className="mb-4">
              <h6 className="fw-bold">Description:</h6>
              <p className="text-muted" style={{ whiteSpace: "pre-wrap" }}>
                {existingAssignment?.description || "No description provided."}
              </p>
            </div>

            <div className="mb-3">
              <h6 className="fw-bold">Points:</h6>
              <p>{existingAssignment?.points || 100}</p>
            </div>

            {existingAssignment?.dueDate && (
              <div className="mb-3">
                <h6 className="fw-bold">Due Date:</h6>
                <p>{new Date(existingAssignment.dueDate).toLocaleString()}</p>
              </div>
            )}

            {existingAssignment?.availableFromDate && (
              <div className="mb-3">
                <h6 className="fw-bold">Available From:</h6>
                <p>{new Date(existingAssignment.availableFromDate).toLocaleString()}</p>
              </div>
            )}

            {existingAssignment?.availableUntilDate && (
              <div className="mb-3">
                <h6 className="fw-bold">Available Until:</h6>
                <p>{new Date(existingAssignment.availableUntilDate).toLocaleString()}</p>
              </div>
            )}

            <hr />
            <div className="mb-3">
              <h6 className="fw-bold">Submission:</h6>
              <p className="text-muted fst-italic">Submission functionality coming soon...</p>
            </div>
          </Card.Body>
        </Card>

        <div className="mt-3">
          <Button variant="secondary" onClick={() => router.push(`/Courses/${cid}/Assignments`)}>
            Back to Assignments
          </Button>
        </div>
      </Container>
    );
  }

  // FACULTY/ADMIN EDITABLE VIEW
  return (
    <div id="wd-assignments-editor" className="container mt-3">
      <div className="mb-3">
        <Form.Label className="fw-bold">Assignment Name</Form.Label>
        <Form.Control
          type="text"
          id="wd-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Assignment Name"
        />
      </div>

      <div className="mb-3">
        <Form.Label className="fw-bold">Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={10}
          id="wd-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Assignment Description"
        />
      </div>

      <div className="mb-3">
        <Form.Label className="fw-bold">Points</Form.Label>
        <Form.Control
          type="number"
          id="wd-points"
          value={points}
          onChange={(e) => setPoints(Number(e.target.value))}
        />
      </div>

      <div className="border rounded p-3 mb-4">
        <Form.Label className="fw-bold">Assign</Form.Label>

        <div className="mb-3">
          <Form.Label className="fw-bold">Due</Form.Label>
          <Form.Control
            type="datetime-local"
            id="wd-due-date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <Row>
          <Col md={6}>
            <Form.Label className="fw-bold">Available from</Form.Label>
            <Form.Control
              type="datetime-local"
              id="wd-available-from"
              value={availableFrom}
              onChange={(e) => setAvailableFrom(e.target.value)}
            />
          </Col>
          <Col md={6}>
            <Form.Label className="fw-bold">Until</Form.Label>
            <Form.Control
              type="datetime-local"
              id="wd-available-until"
              value={availableUntil}
              onChange={(e) => setAvailableUntil(e.target.value)}
            />
          </Col>
        </Row>
      </div>

      <hr />
      <div className="d-flex justify-content-end gap-2">
        <Button variant="secondary" onClick={() => router.push(`/Courses/${cid}/Assignments`)} id="wd-cancel-btn">
          Cancel
        </Button>
        <Button variant="danger" onClick={handleSave} id="wd-save-btn">
          Save
        </Button>
      </div>
    </div>
  );
}