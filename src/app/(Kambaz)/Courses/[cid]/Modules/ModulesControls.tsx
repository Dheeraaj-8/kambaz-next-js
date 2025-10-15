"use client";

import GreenCheckmark from "./GreenCheckmark";
import { FaCheckCircle, FaTimes } from "react-icons/fa";
import { Button, Dropdown } from "react-bootstrap";

export default function ModulesControls() {
  return (
    <div className="d-flex justify-content-end mb-3">
      <div className="d-flex gap-1">
        <button
          className="btn btn-sm"
          style={{
            backgroundColor: "#f5f5f5",
            border: "1px solid #dee2e6",
            color: "black",
          }}
        >
          Collapse All
        </button>

        <button
          className="btn btn-sm"
          style={{
            backgroundColor: "#f5f5f5",
            border: "1px solid #dee2e6",
            color: "black",
          }}
        >
          View Progress
        </button>

        {/* react-bootstrap Dropdown */}
        <Dropdown align="end">
          <Dropdown.Toggle
            as={Button}
            variant="secondary"
            size="sm"
            id="publishAllDropdown"
            className="d-flex align-items-center"
          >
            <GreenCheckmark />
            <span className="ms-1">Publish All</span>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item className="d-flex align-items-center" href="#">
              <FaCheckCircle className="me-2 text-success" />
              Publish all modules and items
            </Dropdown.Item>

            <Dropdown.Item className="d-flex align-items-center" href="#">
              <FaCheckCircle className="me-2 text-success" />
              Publish modules only
            </Dropdown.Item>

            <Dropdown.Item className="d-flex align-items-center" href="#">
              <FaTimes className="me-2 text-muted" />
              Unpublish all modules and items
            </Dropdown.Item>

            <Dropdown.Item className="d-flex align-items-center" href="#">
              <FaTimes className="me-2 text-muted" />
              Unpublish modules only
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <button className="btn btn-danger btn-sm d-flex align-items-center">
          <span className="me-1">+</span>
          Module
        </button>
      </div>
    </div>
  );
}
