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
    const mod = await client.createModuleForCourse(cid, newModule);
    dispatch(addModule(mod));
  };

  const onRemoveModule = async (moduleId: string) => {
    await client.deleteModule(moduleId);
    dispatch(setModules(modules.filter((m: any) => m._id !== moduleId)));
  };

  // ✅ NEW: Update module function
  const onUpdateModule = async (module: any) => {
    await client.updateModule(module);
    dispatch(setModules(modules.map((m: any) => (m._id === module._id ? module : m))));
  };

  const fetchModules = async () => {
    const modules = await client.findModulesForCourse(cid as string);
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
        {modules.map((mod: any) => (
          <ListGroupItem key={mod._id} className="wd-module p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" />
              
              {!mod.editing && mod.name}
              
              {mod.editing && (
                <FormControl 
                  className="w-50 d-inline-block"
                  value={mod.name} // ✅ Changed from defaultValue to value
                  onChange={(e) =>
                    dispatch(
                      updateModule({ ...mod, name: e.target.value })
                    )
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      onUpdateModule({ ...mod, editing: false }); // ✅ Calls API to save
                    }
                  }}
                />
              )}
              
              <ModuleControlButtons 
                moduleId={mod._id}
                deleteModule={(moduleId) => onRemoveModule(moduleId)}
                editModule={(moduleId) => dispatch(editModule(moduleId))} 
              />
            </div>
            {mod.lessons && (
              <ListGroup className="wd-lessons rounded-0">
                {mod.lessons.map((lesson: any, index: number) => (
                  <ListGroupItem key={index} className="wd-lesson p-3 ps-1">
                    <BsGripVertical className="me-2 fs-3" /> {lesson.name} 
                    <LessonControlButtons />
                  </ListGroupItem>
                ))}
              </ListGroup>
            )}
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}