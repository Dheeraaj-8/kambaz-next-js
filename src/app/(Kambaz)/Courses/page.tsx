import { redirect } from "next/navigation";
import { courses } from "../Database/page";

export default function Courses() {
  // Redirect to the first available course
  const firstCourse = Array.isArray(courses) && courses.length > 0 ? courses[0] : null;
  if (firstCourse) {
    redirect(`/Courses/${firstCourse._id}/Home`);
  } else {
    // Fallback if no courses are available
    redirect("/Courses/1234/Home");
  }
}