import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";


function Register() {
const [cookies] = useCookies(["cookie-name"]);
const navigate = useNavigate();

useEffect(() => {
  if (cookies.jwt) {
    navigate("/");
  }
}, [cookies, navigate]);

const [values, setValues] = useState({ firstName: '', lastName: '', email: '', password: ''    , role: 'student', // Default role
});
const [errorFields, setErrorFields] = useState({});
console.log("Initial errorFields:", errorFields);

const generateError = (error) => toast.error(error, { position: "bottom-right" });

const handleInputChange = (e, field) => {
  setValues({ ...values, [field]: e.target.value });
};

const validateEmail = (email) => {
  // Validation simple pour l'e-mail
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const handleSubmit = async (event) => {
  event.preventDefault();
  console.log("Form submitted with values:", values);
  // ... rest of the code


  // Vérifier les champs obligatoires
  const fieldsToCheck = ["firstName", "lastName", "email", "password"];
  let hasError = false;

  fieldsToCheck.forEach((field) => {
    if (!values[field]) {
      setErrorFields({ ...errorFields, [field]: true });
      hasError = true;
    }
  });

  // Vérifier le format de l'e-mail
  if (values.email && !validateEmail(values.email)) {
    setErrorFields({ ...errorFields, email: true });
    generateError("Invalid email format");
    hasError = true;
  }

  if (hasError) {
    return;
  }
    try {
      const { data } = await axios.post(
        "http://localhost:4000/register",
        { ...values },
        { withCredentials: true }
      );

      if (data) {
        if (data.errors) {
          const { email, password } = data.errors;
          if (email) generateError(email);
          else if (password) generateError(password);
        } else {
          navigate("/");
        }
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <div>
      <section className="tf-page-title style-2">
        <div className="tf-container">
          <div className="row">
            <div className="col-md-12">
              <ul className="breadcrumbs">
                <li><Link to="/blog-v2">Home</Link></li>
                <li>Register</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="tf-login">
        <div className="tf-container">
          <div className="row justify-content-center">
            <div className="col-md-12">
              <div className="tf-heading style-2">
                <h4 className="heading">Register</h4>
              </div>
            </div>
            <div className="col-xl-6 col-lg-9 col-md-12">
            <form onSubmit={(e) => handleSubmit(e)} id="contactform">
                <fieldset className={errorFields.firstName ? 'error' : ''}>
                  <input
                    id="firstName"
                    name="firstName"
                    tabIndex="3"
                    aria-required="true"
                    required
                    type="text"
                    placeholder="First Name"
                    value={values.firstName}
                    onChange={(e) => setValues({ ...values, firstName: e.target.value })}
                  />
                  {errorFields.firstName && <p className="error-message">{errorFields.firstName}</p>}
                </fieldset>
<fieldset>
  <input
    id="lastName"
    name="lastName"
    tabIndex="4"
    aria-required="true"
    required
    type="text"
    placeholder="Last Name"
    value={values.lastName}
    onChange={(e) => setValues({ ...values, lastName: e.target.value })}
  />
</fieldset>
                <fieldset>
                <input
  id="email"
  name="email"
  tabIndex="1"
  aria-required="true"
  required
  type="text"
  placeholder="Email"
  value={values.email}
  onChange={(e) => handleInputChange(e, 'email')}
  style={{ border: errorFields.email ? '2px solid red' : '1px solid #ccc' }}
/>
                </fieldset>
                <fieldset>
                  <input
                    id="showpassword"
                    name="password"
                    tabIndex="2"
                    aria-required="true"
                    required
                    type="password"
                    placeholder="Password"
                    value={values.password}
                    onChange={(e) => setValues({ ...values, password: e.target.value })}
                  />
                  <span className="btn-show-pass"><i className="far fa-eye-slash"></i></span>
                </fieldset>
                <div className="forgot-pass-wrap">
                  <label>
                    I agree to the terms and services
                    <input type="checkbox" />
                    <span className="btn-checkbox"></span>
                  </label>
                </div>
                <div className="title-login">Or login with social</div>
                <div className="button-gg">
                  <Link to="#"><i className="fab fa-facebook"></i>Facebook</Link>
                </div>
                <div className="button-gg mb33">
                  <Link to="#"><i className="fab fa-google"></i>Google</Link>
                </div>
                <button className="submit" type="submit">Register</button>
                <div className="row justify-content-center">
                  <span>
                    Already have an account? <Link to="/login">Login</Link>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Register;
