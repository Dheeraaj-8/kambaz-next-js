"use client"
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { Card, CardBody, CardTitle, CardText, Button, Container, Row, Col } from "react-bootstrap";
import coursesData from "../Database/courses";
import { enroll, unenroll } from "../Enrollments/reducer";
import { addNewCourse, updateCourse, deleteCourse } from "../Courses/reducer";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const coursesFromStore = useSelector((state: any) => state.coursesReducer.courses);
  const enrollments = useSelector((state: any) => state.enrollmentsReducer.enrollments);
  const [showAll, setShowAll] = React.useState(false);
  const isFaculty = React.useMemo(() => {
    const role = currentUser?.role;
    if (!role) { return false; }
    const r = String(role).toUpperCase();
    return r === "FACULTY" || r === "ADMIN";
  }, [currentUser]);
  const [course, setCourse] = React.useState<any>({
    _id: "",
    name: "New Course",
    number: "NEW-0000",
    startDate: "2023-01-10",
    endDate: "2023-05-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });

  const isEnrolled = (courseId: string) =>
    currentUser && enrollments.some((e: any) => e.user === currentUser._id && e.course === courseId);

  // choose source of truth from store so faculty edits reflect immediately
  const sourceCourses = coursesFromStore?.length ? coursesFromStore : coursesData;

  const visibleCourses = currentUser
    ? (showAll ? sourceCourses : sourceCourses.filter((c: any) => isEnrolled(c._id)))
    : (showAll ? sourceCourses : []);

  return (
    <Container fluid id="wd-dashboard" className="main-content">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />

      {!currentUser && !showAll && (
        <div className="alert alert-info">
          Please sign in to view your enrollments, or click Enrollments to browse all courses.
        </div>
      )}

      <div className="d-flex justify-content-between align-items-center">
        <h2 id="wd-dashboard-published" className="m-0">Published Courses {visibleCourses.length}</h2>
        <Button variant="primary" onClick={() => setShowAll(!showAll)}>
          {showAll ? "Show My Enrollments" : "Enrollments"}
        </Button>
      </div>
      <hr />

      {isFaculty && (
        <div className="mb-3">
          <div className="d-flex gap-2 align-items-center mb-2">
            <h5 className="m-0">New Course</h5>
            <Button
              className="ms-auto"
              variant="primary"
              onClick={() => {
                dispatch(addNewCourse({ ...course }));
                setCourse({ ...course, _id: "", name: "", description: "" });
              }}
              id="wd-add-new-course-click"
            >
              Add
            </Button>
            <Button
              variant="warning"
              onClick={() => dispatch(updateCourse(course))}
              id="wd-update-course-click"
            >
              Update
            </Button>
          </div>

          <input
            className="form-control mb-2"
            value={course.name}
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
            placeholder="Course name"
          />
          <textarea
            className="form-control"
            rows={3}
            value={course.description}
            onChange={(e) => setCourse({ ...course, description: e.target.value })}
            placeholder="Course description"
          />
          <hr />
        </div>
      )}

      <div id="wd-dashboard-courses">
        <Row className="g-4">
          {visibleCourses.map((c: any) => (
            <Col key={c._id} xs={12} sm={6} md={4} lg={3}>
              <Card className="h-100" style={{ width: "14rem" }}>
                <Image
                  src={c.image || "/images/reactjs.jpg"}
                  alt={c.name}
                  width={224}
                  height={120}
                  style={{ height: "120px", objectFit: "cover" }}
                />
                <CardBody>
                  <CardTitle as="h6" className="text-nowrap overflow-hidden">{c.name}</CardTitle>
                  <CardText className="small overflow-hidden" style={{ height: "100px" }}>
                    {c.description}
                  </CardText>

                  <div className="d-flex flex-wrap gap-2 mt-2">
                    <Link href={`/Courses/${c._id}/Home`} className="text-decoration-none">
                      <Button variant="primary" disabled={!isEnrolled(c._id)}>Go</Button>
                    </Link>
                    {currentUser && (
                      isEnrolled(c._id) ? (
                        <Button variant="danger" onClick={() => dispatch(unenroll({ user: currentUser._id, course: c._id }))}>
                          Unenroll
                        </Button>
                      ) : (
                        <Button variant="success" onClick={() => dispatch(enroll({ user: currentUser._id, course: c._id }))}>
                          Enroll
                        </Button>
                      )
                    )}
                    {currentUser?.role === "FACULTY" && (
                      <>
                        <Button
                          variant="warning"
                          onClick={() => setCourse(c)}
                          id="wd-edit-course-click"
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => dispatch(deleteCourse(c._id))}
                          id="wd-delete-course-click"
                        >
                          Delete
                        </Button>
                      </>
                    )}
                  </div>

                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
}
