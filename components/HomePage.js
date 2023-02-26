import React from "react";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
  Outlet,
  useParams,
} from "react-router-dom";
import StudentData from "./StudentData";
import Dashboard from "./Dashboard";
import UserDashboard from "./UserDashboard";
import { useSelector, useDispatch } from "react-redux";
import { loggedInChanged } from "../data/dataSlice";

function HomePage(props) {
  const user = useSelector((state) => state.data.loggedInStudent);
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <nav className="nav-main">
          <ul>
            <li>
              <Link to="">Overview</Link>
            </li>
            <li>
              <Link to="userdashboard">Own Dashboard</Link>
            </li>
            <li>
              <button
                onClick={() =>
                  dispatch(loggedInChanged({ bool: false, name: "" }))
                }
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>

        <hr />

        <Outlet />
      </div>
      <p></p>
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="userdashboard" element={<UserDashboard user={user} />} />
        <Route path=":id" element={<StudentData />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}

export default HomePage;
