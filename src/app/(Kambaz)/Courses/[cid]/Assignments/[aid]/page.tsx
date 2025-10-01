"use client";
import { Form, Button, Row, Col } from "react-bootstrap";
import Link from "next/link";
import { useState } from "react";

export default function AssignmentEditor() {
  const [dueDate, setDueDate] = useState("2024-05-13T23:59");
  const [availableFrom, setAvailableFrom] = useState("2024-05-06T00:00");
  const [availableUntil, setAvailableUntil] = useState("2024-05-20T23:59");

  const handleDateClick = (inputId: string) => {
    const input = document.getElementById(inputId) as HTMLInputElement;
    if (input) {
      input.showPicker();
    }
  };


  return (
    <div id="wd-assignments-editor">

      {/* Assignment Name */}
      <div className="mb-3">
        <Form.Label className="fw-bold">Assignment Name</Form.Label>
        <Form.Control
          type="text"
          id="wd-name"
          defaultValue="A1"
          className="w-100"
        />
      </div>

      {/* Description */}
      <div className="mb-3">
        <Form.Label className="fw-bold">Description</Form.Label>
        <div className="border rounded p-3 bg-white" style={{ minHeight: "200px" }}>
          <p>The assignment is available online.</p>
          <p>Submit a link to the landing page of your Web application running on Netlify.</p>
          <p>The landing page should include the following:</p>
          <ul>
            <li>Your full name and section</li>
            <li>Links to each of the lab assignments</li>
            <li>Link to the Kanbas application</li>
            <li>Links to all relevant source code repositories</li>
          </ul>
          <p>The Kanbas application should include a link to navigate back to the landing page.</p>
        </div>
      </div>

      {/* Points */}
      <div className="mb-3">
        <Form.Label className="fw-bold">Points</Form.Label>
        <Form.Control
          type="number"
          id="wd-points"
          defaultValue={100}
          className="w-100"
        />
      </div>

      {/* Assignment Group */}
      <div className="mb-3">
        <Form.Label className="fw-bold">Assignment Group</Form.Label>
        <Form.Select id="wd-group" defaultValue="ASSIGNMENTS" className="w-100">
          <option value="ASSIGNMENTS">ASSIGNMENTS</option>
          <option value="QUIZZES">QUIZZES</option>
          <option value="EXAMS">EXAMS</option>
          <option value="PROJECT">PROJECT</option>
        </Form.Select>
      </div>

      {/* Display Grade as */}
      <div className="mb-3">
        <Form.Label className="fw-bold">Display Grade as</Form.Label>
        <Form.Select id="wd-display-grade-as" defaultValue="Percentage" className="w-100">
          <option value="Percentage">Percentage</option>
          <option value="Points">Points</option>
          <option value="Complete/Incomplete">Complete/Incomplete</option>
        </Form.Select>
      </div>

      {/* Submission Type */}
      <div className="mb-3">
        <Form.Label className="fw-bold">Submission Type</Form.Label>
        <Form.Select id="wd-submission-type" defaultValue="Online" className="w-100 mb-3">
          <option value="Online">Online</option>
          <option value="Paper">Paper</option>
          <option value="External Tool">External Tool</option>
        </Form.Select>

        <Form.Label className="fw-bold">Online Entry Options</Form.Label>
        <div className="ms-3">
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
            defaultChecked
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
            defaultChecked
            className="mb-2"
          />
        </div>
      </div>

      {/* Assign Section */}
      <div className="border rounded p-3 mb-4">
        <Form.Label className="fw-bold">Assign</Form.Label>
        
        <div className="mb-3">
          <Form.Label className="fw-bold">Assign to</Form.Label>
          <div className="border rounded p-2" style={{ minHeight: '38px', backgroundColor: 'white', borderColor: '#dee2e6' }}>
            <span className="badge bg-light text-dark me-2" style={{ fontSize: '0.875rem', padding: '0.375rem 0.75rem' }}>
              Everyone
              <button 
                type="button" 
                className="btn-close btn-close-sm ms-2" 
                style={{ fontSize: '0.5rem' }}
                aria-label="Remove Everyone"
              ></button>
            </span>
          </div>
        </div>

        <div className="mb-3">
          <Form.Label className="fw-bold">Due</Form.Label>
          <div className="input-group">
            <Form.Control
              type="datetime-local"
              id="wd-due-date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              placeholder="Select date and time"
              style={{ 
                backgroundImage: 'none',
                paddingRight: '40px'
              }}
            />
            <span 
              className="input-group-text" 
              style={{ 
                border: 'none', 
                background: 'white', 
                color: 'black', 
                cursor: 'pointer'
              }}
              onClick={() => handleDateClick('wd-due-date')}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h6V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
              </svg>
            </span>
          </div>
        </div>

        <Row>
          <Col md={6}>
            <div className="mb-3">
              <Form.Label className="fw-bold">Available from</Form.Label>
              <div className="input-group">
                <Form.Control
                  type="datetime-local"
                  id="wd-available-from"
                  value={availableFrom}
                  onChange={(e) => setAvailableFrom(e.target.value)}
                  placeholder="Select date and time"
                  style={{ 
                    backgroundImage: 'none',
                    paddingRight: '40px'
                  }}
                />
                <span 
                  className="input-group-text" 
                  style={{ 
                    border: 'none', 
                    background: 'white', 
                    color: 'black', 
                    cursor: 'pointer'
                  }}
                  onClick={() => handleDateClick('wd-available-from')}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h6V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                  </svg>
                </span>
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className="mb-3">
              <Form.Label className="fw-bold">Until</Form.Label>
              <div className="input-group">
                <Form.Control
                  type="datetime-local"
                  id="wd-available-until"
                  value={availableUntil}
                  onChange={(e) => setAvailableUntil(e.target.value)}
                  placeholder="Select date and time"
                  style={{ 
                    backgroundImage: 'none',
                    paddingRight: '40px'
                  }}
                />
                <span 
                  className="input-group-text" 
                  style={{ 
                    border: 'none', 
                    background: 'white', 
                    color: 'black', 
                    cursor: 'pointer'
                  }}
                  onClick={() => handleDateClick('wd-available-until')}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h6V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                  </svg>
                </span>
              </div>
            </div>
          </Col>
        </Row>

        <Button variant="outline-secondary" size="sm">
          + Add
        </Button>
      </div>

      {/* Action Buttons */}
      <hr />
      <div className="d-flex justify-content-end gap-2">
        <Link href="/Courses/1234/Assignments">
          <Button variant="secondary" id="wd-cancel-btn">
            Cancel
          </Button>
        </Link>
        <Button variant="danger" id="wd-submit-btn">
          Submit
        </Button>
      </div>
    </div>
  );
}