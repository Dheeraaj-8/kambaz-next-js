/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { setAssignments } from "../reducer";
import * as client from "../../../client";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  
  // ✅ Redirect students away
  useEffect(() => {
    if (currentUser && currentUser.role !== "FACULTY") {
      router.push(`/Courses/${cid}/Assignments`);
    }
  }, [currentUser, cid, router]);
  
  const [assignment, setAssignment] = useState({
    title: "",
    description: "",
    points: 100,
    dueDate: "",
    availableFromDate: "",
    availableUntilDate: "",
  });

  // ✅ Helper function to format Date to YYYY-MM-DD
  const formatDateForInput = (date: any) => {
    if (!date) return "";
    const d = new Date(date);
    if (isNaN(d.getTime())) return "";
    return d.toISOString().split('T')[0];
  };

  useEffect(() => {
    if (aid !== "new") {
      const existingAssignment = assignments.find((a: any) => a._id === aid);
      if (existingAssignment) {
        setAssignment({
          title: existingAssignment.title || "",
          description: existingAssignment.description || "",
          points: existingAssignment.points || 100,
          dueDate: formatDateForInput(existingAssignment.dueDate),
          availableFromDate: formatDateForInput(existingAssignment.availableFromDate),
          availableUntilDate: formatDateForInput(existingAssignment.availableUntilDate),
        });
      }
    }
  }, [aid, assignments]);

  const handleSave = async () => {
    if (!cid || Array.isArray(cid)) return;
    
    // ✅ Convert date strings to Date objects before sending
    const assignmentToSave = {
      ...assignment,
      dueDate: assignment.dueDate ? new Date(assignment.dueDate) : null,
      availableFromDate: assignment.availableFromDate ? new Date(assignment.availableFromDate) : null,
      availableUntilDate: assignment.availableUntilDate ? new Date(assignment.availableUntilDate) : null,
    };
    
    if (aid === "new") {
      const newAssignment = await client.createAssignment(cid, assignmentToSave);
      dispatch(setAssignments([...assignments, newAssignment]));
    } else {
      const updatedAssignment = await client.updateAssignment(cid, { ...assignmentToSave, _id: aid });
      dispatch(setAssignments(
        assignments.map((a: any) => a._id === aid ? updatedAssignment : a)
      ));
    }
    router.push(`/Courses/${cid}/Assignments`);
  };

  const handleCancel = () => {
    router.push(`/Courses/${cid}/Assignments`);
  };

  return (
    <div id="wd-assignments-editor" className="p-4">
      <Form>
        <div className="mb-3">
          <Form.Label htmlFor="wd-name">Assignment Name</Form.Label>
          <Form.Control
            id="wd-name"
            type="text"
            value={assignment.title || ""}
            onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <Form.Control
            as="textarea"
            rows={10}
            id="wd-description"
            value={assignment.description || ""}
            onChange={(e) => setAssignment({ ...assignment, description: e.target.value })}
          />
        </div>

        <Row className="mb-3">
          <Form.Label column sm={3} htmlFor="wd-points" className="text-end">
            Points
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              id="wd-points"
              type="number"
              value={assignment.points || 100}
              onChange={(e) => setAssignment({ ...assignment, points: parseInt(e.target.value) || 0 })}
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Form.Label column sm={3} htmlFor="wd-group" className="text-end">
            Assignment Group
          </Form.Label>
          <Col sm={9}>
            <Form.Select id="wd-group" defaultValue="ASSIGNMENTS">
              <option value="ASSIGNMENTS">ASSIGNMENTS</option>
              <option value="ABC">ABC</option>
              <option value="CWS">CWS</option>
              <option value="BSA">BSA</option>
            </Form.Select>
          </Col>
        </Row>

        <Row className="mb-3">
          <Form.Label column sm={3} htmlFor="wd-display-grade-as" className="text-end">
            Display Grade as
          </Form.Label>
          <Col sm={9}>
            <Form.Select id="wd-display-grade-as" defaultValue="Percentage">
              <option value="Percentage">Percentage</option>
              <option value="ABC">ABC</option>
              <option value="CWS">CWS</option>
              <option value="BSA">BSA</option>
            </Form.Select>
          </Col>
        </Row>

        <Row className="mb-3">
          <Form.Label column sm={3} htmlFor="wd-submission-type" className="text-end">
            Submission Type
          </Form.Label>
          <Col sm={9}>
            <div className="border rounded p-3">
              <Form.Select id="wd-submission-type" defaultValue="Online" className="mb-3">
                <option value="Online">Online</option>
                <option value="ABC">ABC</option>
                <option value="CWS">CWS</option>
                <option value="BSA">BSA</option>
              </Form.Select>

              <Form.Label className="fw-bold">Online Entry Options</Form.Label>
              
              <Form.Check
                type="checkbox"
                id="wd-text-entry"
                label="Text Entry"
                className="mb-2"
              />
              
              <Form.Check
                type="checkbox"
                id="wd-website-url"
                label="Website URL"
                className="mb-2"
              />
              
              <Form.Check
                type="checkbox"
                id="wd-media-recordings"
                label="Media Recordings"
                className="mb-2"
              />
              
              <Form.Check
                type="checkbox"
                id="wd-student-annotation"
                label="Student Annotation"
                className="mb-2"
              />
              
              <Form.Check
                type="checkbox"
                id="wd-file-upload"
                label="File Uploads"
              />
            </div>
          </Col>
        </Row>

        <Row className="mb-3">
          <Form.Label column sm={3} className="text-end">
            Assign
          </Form.Label>
          <Col sm={9}>
            <div className="border rounded p-3">
              <Form.Label htmlFor="wd-assign-to" className="fw-bold">
                Assign to
              </Form.Label>
              <Form.Control
                id="wd-assign-to"
                type="text"
                defaultValue="Everyone"
                className="mb-3"
              />

              <Form.Label htmlFor="wd-due-date" className="fw-bold">
                Due
              </Form.Label>
              <Form.Control
                id="wd-due-date"
                type="date"
                value={assignment.dueDate || ""}
                onChange={(e) => setAssignment({ ...assignment, dueDate: e.target.value })}
                className="mb-3"
              />

              <Row>
                <Col md={6}>
                  <Form.Label htmlFor="wd-available-from" className="fw-bold">
                    Available from
                  </Form.Label>
                  <Form.Control
                    id="wd-available-from"
                    type="date"
                    value={assignment.availableFromDate || ""}
                    onChange={(e) => setAssignment({ ...assignment, availableFromDate: e.target.value })}
                  />
                </Col>

                <Col md={6}>
                  <Form.Label htmlFor="wd-available-until" className="fw-bold">
                    Until
                  </Form.Label>
                  <Form.Control
                    id="wd-available-until"
                    type="date"
                    value={assignment.availableUntilDate || ""}
                    onChange={(e) => setAssignment({ ...assignment, availableUntilDate: e.target.value })}
                  />
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

        <hr />

        <div className="d-flex justify-content-end">
          <Button variant="secondary" className="me-2" onClick={handleCancel} id="wd-cancel-btn">
            Cancel
          </Button>
          <Button variant="danger" onClick={handleSave} id="wd-save-btn">
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}