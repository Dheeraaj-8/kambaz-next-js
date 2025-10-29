"use client";

import { ReactNode, useEffect, useState } from "react";
import CourseNavigation from "./Navigation";
import { useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import Breadcrumb from "./Breadcrumb";
import { FaAlignJustify } from "react-icons/fa";

export default function CoursesLayout({ children }: { children: ReactNode }) {
 const { cid } = useParams();
 const { courses } = useSelector((state: any) => state.coursesReducer);
 const enrollments = useSelector((state: any) => state.enrollmentsReducer.enrollments);
 const { currentUser } = useSelector((state: any) => state.accountReducer);
 const router = useRouter();
 const course = courses.find((course: any) => course._id === cid);
 const [sidebarVisible, setSidebarVisible] = useState(true);

 useEffect(() => {
  if (!currentUser) { return; }
  const allowed = enrollments.some((e: any) => e.user === currentUser._id && e.course === cid);
  if (!allowed) {
    router.push("/Dashboard");
  }
 }, [cid, currentUser, enrollments, router]);

  return (
    <div id="wd-courses" className="main-content">
      <h2 className="text-danger d-flex align-items-center">
        <FaAlignJustify 
          className="me-4 fs-4 mb-1" 
          style={{ cursor: 'pointer' }}
          onClick={() => setSidebarVisible(!sidebarVisible)}
        />
        <Breadcrumb course={course} />
      </h2>
      <hr />

      <div className="d-flex">
        {sidebarVisible && (
          <div className="d-none d-md-block">
            <CourseNavigation courseId={cid as string} />
          </div>
        )}
        <div className="flex-fill">
          {children}
        </div>
      </div>
    </div>
  );
}

