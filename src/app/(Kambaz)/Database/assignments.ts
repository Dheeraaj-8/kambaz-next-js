import assignmentsData from "./assignments.json" assert { type: "json" };

export interface Assignment {
  _id: string;
  title: string;
  course: string;
}

export const assignments: Assignment[] = assignmentsData;
