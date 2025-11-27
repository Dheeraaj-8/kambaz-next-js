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
import { setModules, addModule, editModule, updateModule } from "./reducer";

export default function Modules() {
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState("");
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const dispatch = useDispatch();
  
  const onCreateModuleForCourse = async () => {
    if (!cid || Array.isArray(cid)) return;
    const newModule = { name: moduleName, course: cid };
    const createdModule = await client.createModuleForCourse(cid, newModule);  // ✅ Renamed from 'module'
    dispatch(addModule(createdModule));
    setModuleName("");
  };

  const onRemoveModule = async (moduleId: string) => {
    if (!cid || Array.isArray(cid)) return;
    await client.deleteModule(cid, moduleId);
    dispatch(setModules(modules.filter((m: any) => m._id !== moduleId)));
  };

  const onUpdateModule = async (moduleToUpdate: any) => {  // ✅ Renamed from 'module'
    if (!cid || Array.isArray(cid)) return;
    console.log("=== SAVING MODULE ===", moduleToUpdate);
    await client.updateModule(cid, moduleToUpdate);
    dispatch(setModules(modules.map((m: any) => (m._id === moduleToUpdate._id ? moduleToUpdate : m))));
  };

  const fetchModules = async () => {
    if (!cid || Array.isArray(cid)) return;  // ✅ Added guard
    console.log("=== FETCHING MODULES FROM API ===");
    const fetchedModules = await client.findModulesForCourse(cid as string);  // ✅ Renamed from 'modules'
    console.log("=== RAW MODULES FROM API ===", fetchedModules);
    dispatch(setModules(fetchedModules));
  };
  
  useEffect(() => {
    fetchModules();
  }, [cid]);  // ✅ Only cid as dependency - fetchModules recreated each render

  return (
    <div className="wd-modules">
      <ModulesControls 
        moduleName={moduleName} 
        setModuleName={setModuleName}
        addModule={onCreateModuleForCourse} 
      />
      <br /><br /><br /><br />
      <ListGroup id="wd-modules" className="rounded-0">
        {modules.map((moduleItem: any) => {  // ✅ Renamed from 'module'
          console.log("Rendering module:", moduleItem._id, moduleItem.name);
          return (
            <ListGroupItem key={moduleItem._id} className="wd-module p-0 mb-5 fs-5 border-gray">
              {/* Module Title Section */}
              <div className="wd-title p-3 ps-2 bg-secondary">
                <BsGripVertical className="me-2 fs-3" />
                
                {!moduleItem.editing && moduleItem.name}
                
                {moduleItem.editing && (
                  <FormControl 
                    className="w-50 d-inline-block"
                    placeholder="Module Name"
                    value={moduleItem.name}
                    onChange={(e) => {
                      dispatch(
                        updateModule({ ...moduleItem, name: e.target.value })
                      );
                    }}
                  />
                )}
                
                <ModuleControlButtons 
                  moduleId={moduleItem._id}
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
                {!moduleItem.editing && (
                  <div>{moduleItem.description || "No description"}</div>
                )}
                
                {moduleItem.editing && (
                  <FormControl 
                    as="textarea"
                    rows={3}
                    placeholder="Module Description"
                    value={moduleItem.description || ""}
                    onChange={(e) => {
                      dispatch(
                        updateModule({ ...moduleItem, description: e.target.value })
                      );
                    }}
                  />
                )}
              </div>
              
              {/* Save Button when editing */}
              {moduleItem.editing && (
                <div className="p-3 bg-light border-top">
                  <button 
                    className="btn btn-success me-2"
                    onClick={() => onUpdateModule({ ...moduleItem, editing: false })}
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
              {!moduleItem.editing && moduleItem.lessons && moduleItem.lessons.length > 0 && (
                <ListGroup className="wd-lessons rounded-0">
                  {moduleItem.lessons.map((lesson: any) => (
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