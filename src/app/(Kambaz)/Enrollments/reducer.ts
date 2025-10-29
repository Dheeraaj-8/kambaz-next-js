import { createSlice } from "@reduxjs/toolkit";
import enrollmentsData from "../Database/enrollments";

export interface Enrollment {
  _id: string;
  user: string;
  course: string;
}

type EnrollmentsState = {
  enrollments: Enrollment[];
};

const initialState: EnrollmentsState = {
  enrollments: enrollmentsData as unknown as Enrollment[],
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    enroll: (state, { payload }: { payload: { user: string; course: string } }) => {
      const exists = state.enrollments.some(
        (e) => e.user === payload.user && e.course === payload.course
      );
      if (!exists) {
        const newEnrollment: Enrollment = {
          _id: `${payload.user}-${payload.course}-${Date.now()}`,
          user: payload.user,
          course: payload.course,
        };
        state.enrollments.push(newEnrollment);
      }
    },
    unenroll: (state, { payload }: { payload: { user: string; course: string } }) => {
      state.enrollments = state.enrollments.filter(
        (e) => !(e.user === payload.user && e.course === payload.course)
      );
    },
  },
});

export const { enroll, unenroll } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;


