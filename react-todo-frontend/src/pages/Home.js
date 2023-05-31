import { useState, useContext } from "react";
import Context from "./../context/Context";
import Navbar from "./Navbar.js";

function Home(props) {
  const { addStudents } = useContext(Context);
  const [student, setStudent] = useState({
    name: "",
    age: "",
    rollno: "",
  });

  const handleClick = async (e) => {
    e.preventDefault();

    addStudents(student.name, student.age, student.rollno);
    setStudent({
      name: "",
      age: "",
      rollno: "",
    });
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setStudent((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <form className="container bg-dark rounded-3 w-25 p-5 text-light">
      <Navbar/>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Name
        </label>
        <input
          name="name"
          value={student.name}
          onChange={onChange}
          type="text"
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Age
        </label>
        <input
          name="age"
          value={student.age}
          onChange={onChange}
          type="number"
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Roll no.
        </label>
        <input
          name="rollno"
          value={student.rollno}
          onChange={onChange}
          type="number"
          className="form-control"
        />
      </div>
      <button type="submit" className="btn btn-primary" onClick={handleClick}>
        Register
      </button>
    </form>
  );
}

Home.propTypes = {};

export default Home;
