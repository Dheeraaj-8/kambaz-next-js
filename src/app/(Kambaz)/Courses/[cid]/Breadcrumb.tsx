"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Breadcrumb({ course }: { course: { name: string } | undefined; }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <span>
        Course {course?.name} &gt; Home
      </span>
    );
  }

  return (
    <span>
      {course?.name} &gt; {pathname.split("/").pop()}
    </span>
  );
}