import GreenCheckmark from "./GreenCheckmark";

export default function ModulesControls() {
  return (
    <div className="d-flex justify-content-end mb-3">
      <div className="d-flex gap-1">
        <button className="btn btn-sm" style={{ backgroundColor: "#f5f5f5", border: "1px solid #dee2e6" }}>
          Collapse All
        </button>
        <button className="btn btn-sm" style={{ backgroundColor: "#f5f5f5", border: "1px solid #dee2e6" }}>
          View Progress
        </button>
        <div className="dropdown">
          <button className="btn btn-sm dropdown-toggle d-flex align-items-center" type="button" data-bs-toggle="dropdown" style={{ backgroundColor: "#f5f5f5", border: "1px solid #dee2e6" }}>
            <GreenCheckmark />
            Publish All
          </button>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">Publish All</a></li>
          </ul>
        </div>
        <button className="btn btn-danger btn-sm d-flex align-items-center">
          <span className="me-1">+</span>
          Module
        </button>
      </div>
    </div>
  );
}