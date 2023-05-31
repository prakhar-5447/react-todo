import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Context from "./../context/Context";

function Student(props) {
  const { std, getStudents, deleteStudents } = useContext(Context);
  const navigate = useNavigate();
  const [upt, setUpt] = useState({
    name: "",
    age: "",
    rollno: "",
  });

  const delete_item = (i) => {
    deleteStudents(std[i]);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setUpt((prevState) => ({ ...prevState, [name]: value }));
  };

const handleSubmission = async () => {
    try {
      const response = await fetch("http://localhost:8080/project/create", {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwcmF0aGFtLTAwOTQiLCJpYXQiOjE2ODExOTY4OTksImV4cCI6MTY4MTI4MzI5OX0.CntI-LdMIlwKRtUc2uHfws45NJTBS_VopmtKlgP4Djg",
        },
        body: JSON.stringify({
          project_name: "ERP",
          description: "hello",
        }),
      });
      const result = await response.json();
      console.log(result);
      // alert(result);
    } catch (error) {
      console.log(error);
}
};

  const updated = () => {};

  useEffect(() => {
    handleSubmission();
    // getStudents();
  }, []);

  return (
    <div>
      {std &&
        std.map((user, i) => (
          <div key={i} className="card mb-2">
            <div className="card-body">
              <h5 className="card-title">{user.name}</h5>
              <p className="">Roll no.- {user.rollno}</p>
              <p className="">Age- {user.age}</p>
            </div>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                delete_item(i);
              }}
            >
              Delete
            </button>
            {/* <!-- Button trigger modal --> */}
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                navigate(`/update/${i}`);
              }}
            >
              Update
            </button>
          </div>
        ))}
    </div>
  );
}

Student.propTypes = {};

export default Student;
