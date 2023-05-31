import Context from "./Context.js";
import { useState } from "react";

const StudentContext = (props) => {
  const host = "http://localhost:8080";
  const [std, setStd] = useState([]);

  // Get all org
  const getStudents = async () => {
    // API Call
    const response = await fetch(`${host}/get`, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    const json = await response.json();
    setStd(json);
    // console.log(std);
  };

  const addStudents = async (name, age, rollno) => {
    // API Call
    const response = await fetch(`${host}/put`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify({ name, age, rollno }),
    });

    const json = await response.json();
    console.log("response for adding");
    console.log(json);
    await getStudents();
  };

  const deleteStudents = async ({ name, age, rollno } = std) => {
    // API Call
    const response = await fetch(`${host}/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify({ name, age, rollno }),
    });

    const json = await response.json();
    console.log("response for delete");
    console.log(json);
    await getStudents();
  };

  return (
    <Context.Provider
      value={{
        std,
        setStd,
        getStudents,
        addStudents,
        deleteStudents,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default StudentContext;
//   const childList = []
//   const [child, setChild] = useState(childList)
//   const [cid, setcId] = useState("")
//   // Get all child of org
//   const getChild = async (childid) => {
//     if (childid === "") {
//       childid = "626182566938b94cc15391d8"
//     }
//     // API Call
//     const response = await fetch(`${host}/data/org/${childid}`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       }
//     });
//     const json = await response.json()
//     setChild(json)
//   }

//   const setchildvalue = () => {
//     setChild([])
//   }

//   const setorgid = (eid) => {
//     setcId(eid)
//   }

//   // Add a Note
//   const addchild = async (name, gender, age, token) => {
//     // TODO: API Call
//     // API Call
//     const response = await fetch(`${host}/data/add`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         "auth-token": token
//       },
//       body: JSON.stringify({ name, gender, age })
//     });

//     const childs = await response.json();
//     setChild(child.concat(childs))
//   }

//   // Delete a Note
//   const deletechild = async (id, token) => {
//     // API Call
//     const response = await fetch(`${host}/data/remove/${id}`, {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json',
//         "auth-token": token
//       }
//     });
//     const json = response.json();
//     const newChilds = child.filter((child) => { return child._id !== id })
//     setChild(newChilds)
//   }

//   // Edit a Note
//   const updatechild = async (id, name, gender, age, token) => {
//     // API Call
//     const response = await fetch(`${host}/data/modify/${id}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//         "auth-token": token
//       },
//       body: JSON.stringify({ name, gender, age })
//     });
//     const json = await response.json();

//     let newChilds = JSON.parse(JSON.stringify(child))
//     // Logic to edit in client
//     for (let index = 0; index < newChilds.length; index++) {
//       const element = newChilds[index];
//       if (element._id === id) {
//         newChilds[index].name = name;
//         newChilds[index].gender = gender;
//         newChilds[index].age = age;
//         break;
//       }
//     }
//     setChild(newChilds);
//   }

//   // Get all Notes
//   const getchilern = async (token) => {
//     // API Call
//     const response = await fetch(`${host}/auth/getorg`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         "auth-token": token
//       }
//     });
//     const json = await response.json()
//     const { _id } = json
//     getChild(_id)
//   }

//   return (
//     <Context.Provider value={{ org, getOrg, cid, child, setchildvalue, getChild, setorgid, addchild, deletechild, updatechild, getchilern }}>
//       {props.children}
//     </Context.Provider>
//   )

// }
