import axios from "axios";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import EditCustomer from "./EditProfile";
import ChangePassword from "./ChangePassword";
import { Navigate } from "react-router-dom";
import { ApiKey } from "./constants";

const URL = "http://127.0.0.1:8901/users";
//const URL = "http://localhost/users";

export default function Admin(props) {
  const [allUsers, setAllUsers] = useState("");

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = () => {
    // get all users from api for admin
    axios
      .get(URL)
      .then((response) => {
        let uData = response.data.map((d) => {
          let adminn =
            d._id == "1001"
              ? "btn btn-danger btn-sm disabled"
              : "btn btn-danger btn-sm ";
          return (
            <tr key={d._id}>
              <td>{d._id}</td>
              <td>{d.name}</td>
              <td>{d.phoneNo}</td>
              <td>{d.email}</td>
              <td>{d.address}</td>
              <td>{d.username}</td>
              <td>
                <button
                  className={adminn}
                  type="button"
                  name={d._id}
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        });
        setAllUsers(uData);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data.message);
          this.setState({ error: error.response.data.message });
        } else {
          console.log(error.message);
          this.setState({ error: error.message });
        }
      });
  };

  const handleDelete = (e) => {
    console.log("user to delete", e.target.name);
    let flag = window.confirm("Are you sure ?");
    if (flag === true) {
      const URL =
        "http://127.0.0.1:8901/users/" + e.target.name + "?APIKey=" + ApiKey;

      console.log("deleting", URL);

      axios
        .delete(URL)
        .then((response) => {
          console.log(response.data);

          // setDoneDelete(true)
          alert("Customer deleted successfully!");
          getAllUsers();
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
    }
  };

  const loggedIn = localStorage.getItem("loggedIn") === "true";
  if (loggedIn)
    return (
      // user is admin. Return all user details

      <div className="conatiner">
        <table className="table">
          <thead>
            <th colSpan={6}>All Users</th>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Phone no.</th>
              <th>Email</th>
              <th>Address</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>{allUsers}</tbody>
        </table>
      </div>
    );
  else return <div>Invalid</div>;
}
