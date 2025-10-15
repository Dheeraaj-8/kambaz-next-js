import coursesData from "./courses.json" assert { type: "json" };

export interface Course {
  _id: string;
  name: string;
  number: string;
  startDate: string;
  endDate: string;
  department: string;
  credits: number;
  description: string;
  author?: string;
}

const courses: Course[] = coursesData;

export default courses;
