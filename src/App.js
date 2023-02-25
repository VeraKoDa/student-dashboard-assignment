import "./App.css";
import Login from "./components/Login";
import Header from "./components/Header";
import { useSelector } from "react-redux";
import HomePage from "./components/HomePage";

function App() {
  const studentData = useSelector((state) => state.data);
  const isLoggedIn = useSelector((state) => state.data.loggedIn);

  return (
    <div className="App">
      <Header loggedInStudent={studentData.loggedInStudent} />

      {studentData.studentdata.length === 0 ? (
        <div>loading, please wait..</div>
      ) : isLoggedIn ? (
        <HomePage />
      ) : (
        <Login studentnames={studentData.students} />
      )}
    </div>
  );
}

export default App;
