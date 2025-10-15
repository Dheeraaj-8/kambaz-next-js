"use client";
import { useParams } from "next/navigation";
import * as db from "@/app/(Kambaz)/Database/page";
import { Module, Lesson } from "@/app/(Kambaz)/Database/modules";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import ModuleControlButtons from "./ModulesControlButtons";
import ModulesControls from "./ModulesControls";
import LessonControlButtons from "./LessonControlButtons";

export default function Modules() {
  const { cid } = useParams();
  const modules = db.modules.filter((module: Module) => module.course === cid);

  return (
    <div>
      <ModulesControls />

      <ListGroup className="rounded-0" id="wd-modules">
        {modules.map((module: Module) => (
          <ListGroupItem
            key={module._id || module.name}
            className="wd-module p-0 mb-5 fs-5 border-gray"
          >
            {/* Module title bar */}
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" /> {module.name}{" "}
              <ModuleControlButtons />
            </div>

            {/* Lessons list */}
            {module.lessons && module.lessons.length > 0 && (
              <ListGroup className="wd-lessons rounded-0">
                {module.lessons.map((lesson: Lesson) => (
                  <ListGroupItem
                    key={lesson._id || lesson.name}
                    className="wd-lesson p-3 ps-1"
                  >
                    <BsGripVertical className="me-2 fs-3" /> {lesson.name}{" "}
                    <LessonControlButtons />
                  </ListGroupItem>
                ))}

                {/* Optional extra info like summaries or intro text */}
                {module.description && (
                  <ListGroupItem className="wd-lesson p-3 ps-1">
                    {module.description}
                  </ListGroupItem>
                )}
              </ListGroup>
            )}
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}
