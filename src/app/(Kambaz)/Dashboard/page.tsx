import Link from "next/link";
import Image from "next/image";
import React from "react";
import { Card, CardBody, CardTitle, CardText, Button, Container, Row, Col } from "react-bootstrap";
import * as db from "../Database/page";
const courses = db.courses;

export default function Dashboard() {
  return (
    <Container fluid id="wd-dashboard" className="main-content">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses {courses.length}</h2>
      <hr />

      <div id="wd-dashboard-courses">
        <Row className="g-4">
          {courses.map((course) => (
            <Col key={course._id} xs={12} sm={6} md={4} lg={3}>
              <Card className="h-100" style={{ width: "14rem" }}>
                <Image 
                  src="/images/reactjs.jpg" 
                  alt={course.name} 
                  width={224} 
                  height={120} 
                  style={{ height: "120px", objectFit: "cover" }} 
                />
                <CardBody>
                  <CardTitle as="h6" className="text-nowrap overflow-hidden">{course.name}</CardTitle>
                  <CardText className="small overflow-hidden" style={{ height: "100px" }}> {course.description}</CardText>
                  <Link href={`/Courses/${course._id}/Home`} className="wd-dashboard-course-link text-decoration-none">
                    <Button variant="primary">Go</Button>
                  </Link>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
        
      </div>
    </Container>
  );
}
