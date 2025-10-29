import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "./Courses/reducer";
import courses from "./Database/courses";
import modulesReducer from "./Courses/[cid]/Modules/reducer";
import accountReducer from "./Account/reducer";
import assignmentsReducer from "./Courses/[cid]/Assignments/reducer";
import enrollmentsReducer from "./Enrollments/reducer";
import { modules } from "./Database/page";
import { assignments } from "./Database/assignments";
import enrollments from "./Database/enrollments";

const store = configureStore({
  reducer: { coursesReducer, modulesReducer, accountReducer, assignmentsReducer, enrollmentsReducer },
  preloadedState: {
    coursesReducer: {
      courses: courses,
    },
    modulesReducer: {
      modules: modules,
    },
    assignmentsReducer: {
      assignments: assignments,
    },
    enrollmentsReducer: {
      enrollments: enrollments,
    },
  },
});
export default store;