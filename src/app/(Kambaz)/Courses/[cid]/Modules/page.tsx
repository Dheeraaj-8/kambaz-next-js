/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import * as client from "../../client";
import { useParams } from "next/navigation";
import { ListGroup, ListGroupItem, FormControl } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import ModuleControlButtons from "./ModuleControlButtons";
import ModulesControls from "./ModulesControls";
import LessonControlButtons from "./LessonControlButtons";
import { useSelector, useDispatch } from "react-redux";
import { setModules, addModule, editModule, updateModule, deleteModule } from "./reducer";

export default function Modules() {
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState("");
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const dispatch = useDispatch();
  
  console.log("=== MODULES STATE ===", modules);
  
  const onCreateModuleForCourse = async () => {
    if (!cid || Array.isArray(cid)) return;
    const newModule = { name: moduleName, course: cid };
    const module = await client.createModuleForCourse(cid, newModule);
    dispatch(addModule(module));
  };

  const onRemoveModule = async (moduleId: string) => {
    if (!cid || Array.isArray(cid)) return;
    await client.deleteModule(cid, moduleId);
    dispatch(setModules(modules.filter((m: any) => m._id !== moduleId)));
  };

  const onUpdateModule = async (module: any) => {
    if (!cid || Array.isArray(cid)) return;
    console.log("=== SAVING MODULE ===", module);
    await client.updateModule(cid, module);
    dispatch(setModules(modules.map((m: any) => (m._id === module._id ? module : m))));
  };

  const fetchModules = async () => {
    console.log("=== FETCHING MODULES FROM API ===");
    const modules = await client.findModulesForCourse(cid as string);
    console.log("=== RAW MODULES FROM API ===", modules);
    console.log("First module:", modules[0]);
    console.log("First module _id:", modules[0]?._id);
    console.log("First module keys:", Object.keys(modules[0] || {}));
    dispatch(setModules(modules));
  };
  
  useEffect(() => {
    fetchModules();
  }, [cid]);

  return (
    <div className="wd-modules">
      <ModulesControls 
        moduleName={moduleName} 
        setModuleName={setModuleName}
        addModule={onCreateModuleForCourse} 
      />
      <br /><br /><br /><br />
      <ListGroup id="wd-modules" className="rounded-0">
        {modules.map((module: any) => {
          console.log("Rendering module:", module._id, module.name);
          return (
            <ListGroupItem key={module._id} className="wd-module p-0 mb-5 fs-5 border-gray">
              {/* Module Title Section */}
              <div className="wd-title p-3 ps-2 bg-secondary">
                <BsGripVertical className="me-2 fs-3" />
                
                {!module.editing && module.name}
                
                {module.editing && (
                  <FormControl 
                    className="w-50 d-inline-block"
                    placeholder="Module Name"
                    value={module.name}
                    onChange={(e) => {
                      dispatch(
                        updateModule({ ...module, name: e.target.value })
                      );
                    }}
                  />
                )}
                
                <ModuleControlButtons 
                  moduleId={module._id}
                  deleteModule={(moduleId) => onRemoveModule(moduleId)}
                  editModule={(moduleId) => {
                    console.log("=== EDIT CLICKED ===");
                    console.log("Editing module ID:", moduleId);
                    dispatch(editModule(moduleId));
                  }} 
                />
              </div>
              
              {/* Module Description Section */}
              <div className="wd-module-description p-3 bg-light">
                {!module.editing && (
                  <div>{module.description || "No description"}</div>
                )}
                
                {module.editing && (
                  <FormControl 
                    as="textarea"
                    rows={3}
                    placeholder="Module Description"
                    value={module.description || ""}
                    onChange={(e) => {
                      dispatch(
                        updateModule({ ...module, description: e.target.value })
                      );
                    }}
                  />
                )}
              </div>
              
              {/* Save Button when editing */}
              {module.editing && (
                <div className="p-3 bg-light border-top">
                  <button 
                    className="btn btn-success me-2"
                    onClick={() => onUpdateModule({ ...module, editing: false })}
                  >
                    Save
                  </button>
                  <button 
                    className="btn btn-secondary"
                    onClick={() => {
                      fetchModules(); // Refresh to discard changes
                    }}
                  >
                    Cancel
                  </button>
                </div>
              )}
              
              {/* Lessons List */}
              {!module.editing && module.lessons && module.lessons.length > 0 && (
                <ListGroup className="wd-lessons rounded-0">
                  {module.lessons.map((lesson: any) => (
                    <ListGroupItem key={lesson._id} className="wd-lesson p-3 ps-1">
                      <BsGripVertical className="me-2 fs-3" /> {lesson.name} 
                      <LessonControlButtons />
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
            </ListGroupItem>
          );
        })}
      </ListGroup>
    </div>
  );
}