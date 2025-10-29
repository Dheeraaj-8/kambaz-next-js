"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import { Module, Lesson } from "@/app/(Kambaz)/Database/modules";
import { ListGroup, ListGroupItem, FormControl } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import ModuleControlButtons from "./ModulesControlButtons";
import ModulesControls from "./ModulesControls";
import LessonControlButtons from "./LessonControlButtons";
import { addModule as addModuleAction, editModule as editModuleAction, updateModule as updateModuleAction, deleteModule as deleteModuleAction }
  from "./reducer";
import { useSelector, useDispatch } from "react-redux";

export default function Modules() {
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState("");
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const dispatch = useDispatch();

  return (
    <div className="pe-4">
      <ModulesControls 
        moduleName={moduleName}
        setModuleName={setModuleName}
        addModule={() => {
          dispatch(addModuleAction({ name: moduleName, course: cid }));
          setModuleName("");
        }}
      />

      <ListGroup id="wd-modules" className="rounded-0">
        {modules
          .filter((module: any) => module.course === cid)
          .map((module: any) => (
          <ListGroupItem
            key={module._id || module.name}
            className="wd-module p-0 mb-5 fs-5 border-gray"
          >
            {/* Module title bar */}
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" />
              {!module.editing && module.name}
              {module.editing && (
                <FormControl 
                  className="w-50 d-inline-block"
                  onChange={(e) =>
                    dispatch(
                      updateModuleAction({ ...module, name: e.target.value })
                    )
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      dispatch(updateModuleAction({ ...module, editing: false }));
                    }
                  }}
                  defaultValue={module.name}
                  autoFocus
                />
              )}
              <ModuleControlButtons
                moduleId={module._id}
                deleteModule={(moduleId: string) => {
                  dispatch(deleteModuleAction(moduleId));
                }}
                editModule={(moduleId: string) => dispatch(editModuleAction(moduleId))}
              />
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
