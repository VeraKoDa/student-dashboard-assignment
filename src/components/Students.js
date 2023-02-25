import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";

function Students(props) {
  const linkToStudents = props.students.map((s) => {
    return (
      <li key={s}>
        <Link to={s} state={s}>
          {s}
        </Link>
      </li>
    );
  });

  return (
    <div>
      <div>
        <nav className="nav-students">
          <ul>{[linkToStudents]}</ul>
        </nav>

        <hr />
        <Outlet />
      </div>
    </div>
  );
}

export default Students;
