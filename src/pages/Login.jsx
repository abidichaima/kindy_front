import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import avt1 from "../assets/images/author/author-login-1.png";
import avt2 from "../assets/images/author/author-login-2.png";

const Login = () => {
  const [values, setValues] = useState({
    name: "",
    password: "",
  });

  const [cookies, setCookie] = useCookies(["user"]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/users/login", values);

      setCookie("user", response.data, { path: "/" });

      toast.success("Login successful");
      navigate("/");
    } catch (err) {
      toast.error("Invalid username or password");
    }
  };

  return (
    <div className="login-page">
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto">
          <div className="row justify-content-center">

          <h4 className="heading" >Login</h4>

          </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label></label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="email"

                  value={values.name}
                  onChange={(e) =>
                    setValues({ ...values, [e.target.name]: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label></label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="form-control"
                  value={values.password}
                  onChange={(e) =>
                    setValues({ ...values, [e.target.name]: e.target.value })
                  }
                />
              </div>
              <div className="row justify-content-center">
              <button type="submit" className="button-gg mb33">
                Submit
              </button>
              </div>

            </form>
            <div className="row justify-content-center">
            <span>
           
              Don't have an account? <Link to="/register">Register</Link>
            </span>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Login;
