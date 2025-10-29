"use client";
import React from "react";
import { usePathname } from "next/navigation";

export default function Breadcrumb({ course }: { course: { name: string } | undefined; }) {
  const pathname = usePathname();

  // Get the page name from the path
  const segments = pathname.split("/");
  let pageName = segments.pop(); // Get last segment
  
  // Special handling: if we're on People/Table, show "People" instead of "Table"
  if (pathname.includes("/People/Table")) {
    pageName = "People";
  } else if (pathname.includes("/Assignments/")) {
    // For assignments, get "Assignments" instead of the assignment ID
    const assignmentsIndex = segments.indexOf("Assignments");
    if (assignmentsIndex !== -1) {
      pageName = "Assignments";
    }
  }

  // Capitalize first letter and format the page name nicely
  const formattedPageName = pageName && pageName.length > 0 
    ? pageName.charAt(0).toUpperCase() + pageName.slice(1)
    : "Home";

  return (
    <span>
      {course?.name} &gt; {formattedPageName}
    </span>
  );
}