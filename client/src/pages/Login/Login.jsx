import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "./loginandregister.css";
import { useCookies } from "react-cookie";

export default function Login() {
  const navigate = useNavigate();
  const [cookies] = useCookies([]);
  const [status, setStatus] = useState(false);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const generateError = (err) => {
    toast.error(err, {
      position: "bottom-right",
    });
  };
  useEffect(() => {
    if (status) {
      navigate("/home");
    }
    return setStatus(false);
  }, [status]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          "http://localhost:4000/login",
          {
            ...values,
          },
          {
            withCredentials: true,
          }
        )
        .then((data) => {
          setStatus(true);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mainContainer">
      <div className="container">
        <h2>Login account </h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
            />
          </div>
          <button type="submit">Submit</button>
          <span>
            Don't have an account? <Link to="/register">Register</Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
