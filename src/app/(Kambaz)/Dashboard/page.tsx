import Link from "next/link";

export default function Dashboard() {
  return (
    <div id="wd-dashboard" className="main-content">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2>
      <hr />
      
      <div id="wd-dashboard-courses">
        <div className="row g-4">
          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card h-100" style={{ width: "14rem" }}>
              <Link href="/Courses/1234/Home" className="wd-dashboard-course-link text-decoration-none text-dark">
                <img src="/images/reactjs.jpg" className="card-img-top" alt="React JS" style={{ height: "120px", objectFit: "cover" }} />
                <div className="card-body">
                  <h6 className="card-title">CS1234 React JS</h6>
                  <p className="card-text small">Full Stack software developer</p>
                  <button className="btn btn-primary">Go</button>
                </div>
              </Link>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card h-100" style={{ width: "14rem" }}>
              <Link href="/Courses/1235/Home" className="wd-dashboard-course-link text-decoration-none text-dark">
                <img src="/images/nextjs.png" className="card-img-top" alt="Next JS" style={{ height: "120px", objectFit: "cover" }} />
                <div className="card-body">
                  <h6 className="card-title">CS1235 Next JS</h6>
                  <p className="card-text small">Full Stack software developer</p>
                  <button className="btn btn-primary">Go</button>
                </div>
              </Link>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card h-100" style={{ width: "14rem" }}>
              <Link href="/Courses/1236/Home" className="wd-dashboard-course-link text-decoration-none text-dark">
                <img src="/images/expressjs.png" className="card-img-top" alt="Express JS" style={{ height: "120px", objectFit: "cover" }} />
                <div className="card-body">
                  <h6 className="card-title">CS1236 Express JS</h6>
                  <p className="card-text small">Full Stack software developer</p>
                  <button className="btn btn-primary">Go</button>
                </div>
              </Link>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card h-100" style={{ width: "14rem" }}>
              <Link href="/Courses/1237/Home" className="wd-dashboard-course-link text-decoration-none text-dark">
                <img src="/images/mongodb.jpg" className="card-img-top" alt="MongoDB" style={{ height: "120px", objectFit: "cover" }} />
                <div className="card-body">
                  <h6 className="card-title">CS1237 MongoDB</h6>
                  <p className="card-text small">Full Stack software developer</p>
                  <button className="btn btn-primary">Go</button>
                </div>
              </Link>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card h-100" style={{ width: "14rem" }}>
              <Link href="/Courses/1238/Home" className="wd-dashboard-course-link text-decoration-none text-dark">
                <img src="/images/typescript.jpg" className="card-img-top" alt="TypeScript" style={{ height: "120px", objectFit: "cover" }} />
                <div className="card-body">
                  <h6 className="card-title">CS1238 TypeScript</h6>
                  <p className="card-text small">Full Stack software developer</p>
                  <button className="btn btn-primary">Go</button>
                </div>
              </Link>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card h-100" style={{ width: "14rem" }}>
              <Link href="/Courses/1239/Home" className="wd-dashboard-course-link text-decoration-none text-dark">
                <img src="/images/tailwindcss.png" className="card-img-top" alt="Tailwind CSS" style={{ height: "120px", objectFit: "cover" }} />
                <div className="card-body">
                  <h6 className="card-title">CS1239 Tailwind CSS</h6>
                  <p className="card-text small">Full Stack software developer</p>
                  <button className="btn btn-primary">Go</button>
                </div>
              </Link>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card h-100" style={{ width: "14rem" }}>
              <Link href="/Courses/1240/Home" className="wd-dashboard-course-link text-decoration-none text-dark">
                <img src="/images/python.jpg" className="card-img-top" alt="Python" style={{ height: "120px", objectFit: "cover" }} />
                <div className="card-body">
                  <h6 className="card-title">CS1240 Python</h6>
                  <p className="card-text small">Full Stack software developer</p>
                  <button className="btn btn-primary">Go</button>
                </div>
              </Link>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card h-100" style={{ width: "14rem" }}>
              <Link href="/Courses/1241/Home" className="wd-dashboard-course-link text-decoration-none text-dark">
                <img src="/images/java.jpg" className="card-img-top" alt="Java" style={{ height: "120px", objectFit: "cover" }} />
                <div className="card-body">
                  <h6 className="card-title">CS1241 Java</h6>
                  <p className="card-text small">Full Stack software developer</p>
                  <button className="btn btn-primary">Go</button>
                </div>
              </Link>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card h-100" style={{ width: "14rem" }}>
              <Link href="/Courses/1242/Home" className="wd-dashboard-course-link text-decoration-none text-dark">
                <img src="/images/teslabot.jpg" className="card-img-top" alt="AI & Machine Learning" style={{ height: "120px", objectFit: "cover" }} />
                <div className="card-body">
                  <h6 className="card-title">CS1242 AI & Machine Learning</h6>
                  <p className="card-text small">Full Stack software developer</p>
                  <button className="btn btn-primary">Go</button>
                </div>
              </Link>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card h-100" style={{ width: "14rem" }}>
              <Link href="/Courses/1243/Home" className="wd-dashboard-course-link text-decoration-none text-dark">
                <img src="/images/stacked.jpg" className="card-img-top" alt="Data Structures" style={{ height: "120px", objectFit: "cover" }} />
                <div className="card-body">
                  <h6 className="card-title">CS1243 Data Structures</h6>
                  <p className="card-text small">Full Stack software developer</p>
                  <button className="btn btn-primary">Go</button>
                </div>
              </Link>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card h-100" style={{ width: "14rem" }}>
              <Link href="/Courses/1244/Home" className="wd-dashboard-course-link text-decoration-none text-dark">
                <img src="/images/NEU.png" className="card-img-top" alt="Algorithms" style={{ height: "120px", objectFit: "cover" }} />
                <div className="card-body">
                  <h6 className="card-title">CS1244 Algorithms</h6>
                  <p className="card-text small">Full Stack software developer</p>
                  <button className="btn btn-primary">Go</button>
                </div>
              </Link>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card h-100" style={{ width: "14rem" }}>
              <Link href="/Courses/1245/Home" className="wd-dashboard-course-link text-decoration-none text-dark">
                <img src="/images/reactjs.jpg" className="card-img-top" alt="Database Systems" style={{ height: "120px", objectFit: "cover" }} />
                <div className="card-body">
                  <h6 className="card-title">CS1245 Database Systems</h6>
                  <p className="card-text small">Full Stack software developer</p>
                  <button className="btn btn-primary">Go</button>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
