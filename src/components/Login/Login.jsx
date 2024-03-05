import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";


const Login = () => {
  const [values, setValues] = useState({ email: "", password: "" });
	const [error, setError] = useState("");

	const handleChange = ({ currentTarget: input }) => {
		setValues({ ...values, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:4000/user/auth";
      const response = await axios.post(url, values);
  
      // Vérifiez le statut de la réponse (200 OK)
      if (response.status === 200) {
        // Stockez le token dans le localStorage ou utilisez votre logique de gestion
        localStorage.setItem("token", values);
        // Redirigez l'utilisateur vers la page d'accueil ou une autre page appropriée
        window.location = "/";
      }
    } catch (error) {
      // Gestion des erreurs réseau, etc.
      console.error("Error during login:", error);
  
      // Vérifiez si la réponse d'erreur contient des données
      if (error.response && error.response.data) {
        setError(error.response.data.message || "An error occurred during login.");
      } else {
        setError("An error occurred during login. Please try again later.");
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