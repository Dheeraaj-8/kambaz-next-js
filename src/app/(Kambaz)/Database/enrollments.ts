import enrollmentsData from "./enrollments.json" assert { type: "json" };

export interface Enrollment {
  _id: string;
  user: string;
  course: string;
}

const enrollments: Enrollment[] = enrollmentsData;

export default enrollments;
