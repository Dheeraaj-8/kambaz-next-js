/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  modules: [],
};

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    setModules: (state, action) => {
      console.log("=== REDUCER: setModules ===");
      console.log("Received modules:", action.payload);
      console.log("Module IDs:", action.payload.map((m: any) => m._id));
      state.modules = action.payload;
    },
    
    addModule: (state, { payload: module }) => {
      console.log("=== REDUCER: addModule ===", module);
      const newModule: any = {
        _id: uuidv4(),
        lessons: [],
        name: module.name,
        course: module.course,
      };
      state.modules = [...state.modules, newModule] as any;
    },
    
    deleteModule: (state, { payload: moduleId }) => {
      console.log("=== REDUCER: deleteModule ===", moduleId);
      state.modules = state.modules.filter(
        (m: any) => m._id !== moduleId
      );
    },
    
    updateModule: (state, { payload: module }) => {
      console.log("=== REDUCER: updateModule ===");
      console.log("Updating module ID:", module._id);
      console.log("New name:", module.name);
      console.log("Current modules count:", state.modules.length);
      
      state.modules = state.modules.map((m: any) => {
        const isMatch = m._id === module._id;
        console.log(`  Checking module ${m._id} === ${module._id}: ${isMatch ? "✅ MATCH" : "❌ no match"}`);
        return isMatch ? module : m;
      }) as any;
      
      console.log("After update, modules:", state.modules.map((m: any) => ({ id: m._id, name: m.name })));
    },
    
    editModule: (state, { payload: moduleId }) => {
      console.log("=== REDUCER: editModule ===");
      console.log("Setting editing=true for:", moduleId);
      console.log("All module IDs:", state.modules.map((m: any) => m._id));
      
      state.modules = state.modules.map((m: any) => {
        if (m._id === moduleId) {
          console.log(`  Module ${m._id}: turning ON editing`);
          return { ...m, editing: true };
        } else {
          console.log(`  Module ${m._id}: turning OFF editing`);
          return { ...m, editing: false };
        }
      }) as any;
      
      console.log("After edit toggle:", state.modules.map((m: any) => ({ id: m._id, editing: m.editing })));
    },
  },
});

export const { addModule, deleteModule, updateModule, editModule, setModules } =
  modulesSlice.actions;
export default modulesSlice.reducer;