import { FaCheckCircle, FaCircle } from "react-icons/fa";
export default function GreenCheckmark() {
    return (
        <span className="me-2 position-relative d-inline-flex align-items-center justify-content-center" style={{ width: "20px", height: "20px" }}>
            <FaCheckCircle className="text-success position-absolute" style={{ fontSize: "20px" }} />
            <FaCircle className="text-white" style={{ fontSize: "14px" }} />
        </span>
    );
}