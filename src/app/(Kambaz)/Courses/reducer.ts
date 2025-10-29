import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import type { Course } from "../Database/courses";

interface CoursesState {
  courses: Course[];
}

const initialState: CoursesState = {
  courses: [],
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addNewCourse: (state, { payload: course }) => {
      // Only generate an ID if one doesn't exist
      state.courses.push({ ...course, _id: course._id || uuidv4() });
    },
    deleteCourse: (state, { payload: courseId }) => {
      state.courses = state.courses.filter((course) => course._id !== courseId);
    },
    updateCourse: (state, { payload: course }) => {
      const index = state.courses.findIndex((c) => c._id === course._id);
      if (index !== -1) {
        state.courses[index] = course;
      }
    },
    setCourses: (state, { payload: courses }) => {
      state.courses = courses;
    },
  },
});

export const { addNewCourse, deleteCourse, updateCourse, setCourses } = coursesSlice.actions;
export default coursesSlice.reducer;
