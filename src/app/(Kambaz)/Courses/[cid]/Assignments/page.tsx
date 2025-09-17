import Link from "next/link";

export default function Assignments() {
  return (
    <div id="wd-assignments">
      <input placeholder="Search for Assignments" id="wd-search-input" />
      <button id="wd-group-add">+ Group</button>
      <button id="wd-assignment-add">+ Assignment</button>
      <h3>
        Assignments 40% of Total &nbsp;
        <button>+</button>
      </h3>
      <ul id="wd-assignment-list">
        <li className="wd-assignment-list-item">
          <Link href="/Courses/1234/Assignments/123" className="wd-assignment-link">
            A1 - ENV + HTML
          </Link>
          <br />
          Multiple Modules | <b>Not available until</b> May 6 at 12:00am |<b><br />Due</b> May 13 at 11:59pm | 100 pts
        </li>

        <li className="wd-assignment-list-item">
          <Link href="/Courses/1234/Assignments/123" className="wd-assignment-link">
            A2 - CSS + BOOTSTRAP
          </Link>
          <br />
          Multiple Modules | <b>Not available until</b> May 13 at 12:00am |<b><br />Due</b> May 20 at 12:00pm | 100 pts
        </li>

        <li className="wd-assignment-list-item">
          <Link href="/Courses/1234/Assignments/123" className="wd-assignment-link">
            A3 - JAVASCRIPT + REACT
          </Link>
          <br />
          Multiple Modules | <b>Not available until</b> May 20 at 12:00am |<b><br />Due</b> May 27 at 11:59pm | 100 pts
        </li>
      </ul>
      </div>
    );
}