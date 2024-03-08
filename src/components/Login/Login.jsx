import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";


const Login = () => {
  const [values, setValues] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = ({ currentTarget: input }) => {
    setValues({ ...values, [input.name]: input.value });
  };
	const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = 'http://localhost:4000/user/auth';
      const response = await axios.post(url, values, {
        headers: {
          'Content-Type': 'application/json',
        },});

        localStorage.setItem("user", JSON.stringify({role: "admin"}))
        navigate("/dash")

      // Check if the response status is in the success range (e.g., 200-299)
      if (response.status >= 200 && response.status < 300) {
        // Store the token in localStorage or implement your token handling logic
     
      } else {
        setError('An error occurred during login. Please try again later.');
      }
    } catch (error) {
      // Handle network errors, etc.
      console.error('Error during login:', error);
      console.error('Error during login:', error.response);

      // Check if the error has a response and contains data
      if (error.response && error.response.data) {
        setError(error.response.data.message || 'An error occurred during login.');
      } else {
        setError('An error occurred during login. Please try again later.');
      }
    }
  };

  return (
    <div className="login-page">
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto">
          <div className="row justify-content-center">

          <h6 className="heading" >Login</h6>

          </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label></label>
                <input
                  type="text"
                  name="email"
                  className="form-control"
                  placeholder="email"

                  value={values.email}
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
            <span>
              <br></br>
            </span>
            <div className="row justify-content-center">
            <span className="justify-content-center">
  Did you forget your password ? <Link to="/forgot-password">Forgot Password</Link>
  <br/><br/>
  Don't have an account ? <Link to="/register"> Register</Link>
</span>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Login;