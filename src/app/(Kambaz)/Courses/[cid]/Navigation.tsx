"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CourseNavigation({ courseId }: { courseId: string }) {
  const pathname = usePathname();
  
  const links = [
    { href: `/Courses/${courseId}/Home`, id: "wd-course-home-link", label: "Home" },
    { href: `/Courses/${courseId}/Modules`, id: "wd-course-modules-link", label: "Modules" },
    { href: `/Courses/${courseId}/Piazza`, id: "wd-course-piazza-link", label: "Piazza" },
    { href: `/Courses/${courseId}/Zoom`, id: "wd-course-zoom-link", label: "Zoom" },
    { href: `/Courses/${courseId}/Assignments`, id: "wd-course-assignments-link", label: "Assignments" },
    { href: `/Courses/${courseId}/Quizzes`, id: "wd-course-quizzes-link", label: "Quizzes" },
    { href: `/Courses/${courseId}/People/Table`, id: "wd-course-people-link", label: "People" },
  ];

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => {
        // Check if current path starts with the link href for assignments
        const isActive = link.href === `/Courses/${courseId}/Assignments` 
          ? pathname.startsWith(link.href)
          : pathname === link.href;
        return (
          <Link 
            key={link.id}
            href={link.href} 
            id={link.id}
            className={`list-group-item border-0 ${isActive ? 'active' : ''}`}
          >
            {link.label}
          </Link>
        );
      })}
    </div>
  );
}
