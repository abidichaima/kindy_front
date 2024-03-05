import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBTextArea,
  MDBFile,
  MDBInputGroup
}
  from 'mdb-react-ui-kit';

function Register() {
const [cookies] = useCookies(["cookie-name"]);
const navigate = useNavigate();
const [error, setError] = useState("");
	const [msg, setMsg] = useState("");
  const [errors, setErrors] = useState({})
  const [image, setImage] = useState('');

useEffect(() => {
  if (cookies.jwt) {
    navigate("/");
  }
}, [cookies, navigate]);

const [values, setValues] = useState({ firstName: '', lastName: '', email: '', password: ''    , role: 'student',   phoneNumber: '' ,    level: 'non precise level', image :'' // Ajoutez cette ligne
// Default role
});
const [errorFields, setErrorFields] = useState({});
console.log("Initial errorFields:", errorFields);


const handleInputChange = (e, field) => {
  setValues({ ...values, [field]: e.target.value });
};

const handleImage = (e) => {
  const file = e.target.files[0];
  setFileToBase(file);
  console.log(file);

}
const setFileToBase = (file) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => {
    setImage(reader.result);
  }

}
const handleSubmit = async (event) => {
  event.preventDefault();
  console.log("Form submitted with values:", values);
    try {
      const url = "http://localhost:4000/user/users";
      const { values: res } = await axios.post(url, values);
      console.log("Form values:", values);
      console.log("Image:", image);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Affichez le message d'erreur du serveur, s'il y en a un
        console.error("Erreur de validation côté serveur :", error.response.data.message);
        console.log("Form values:", values);
console.log("Image:", image);
      } else {
        console.error("Erreur inattendue lors de la soumission du formulaire :", error.message);
      }}

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
                <h6 className="heading">Register</h6>
              </div>
            </div>
            <div className="col-xl-6 col-lg-9 col-md-12">
            <form onSubmit={(e) => handleSubmit(e)} id="contactform">
            <fieldset>
          <input
            id="firstName"
            name="firstName"
            tabIndex="3"
            aria-required="true"
            required
            type="text"
            placeholder="First Name"
            className={errors.firstName ? 'error' : ''}
            value={values.firstName}
            onChange={(e) => setValues({ ...values, firstName: e.target.value })}
            />
        </fieldset>
<fieldset>
  <input
    id="lastName"
    name="lastName"
    tabIndex="4"
    aria-required="true"
    required
    type="text"
    autoComplete='off'  

    placeholder="Last Name"
    value={values.lastName}
    onChange={(e) => setValues({ ...values, lastName: e.target.value })}
  />
            {errors.lastName && <span>{errors.lastName}</span>}  

</fieldset>

<fieldset>
  <input
    id="phoneNumber"
    name="phoneNumber"
    tabIndex="4"
    aria-required="true"
    required
    type="text"
    placeholder="phoneNumber"
    value={values.phoneNumber}
    onChange={(e) => setValues({ ...values, phoneNumber: e.target.value })}
     />
</fieldset>
<fieldset >
   <select className={styles['level-fieldset']}
      id="level"
      name="level"
      tabIndex="5"
      aria-required="true"
      required
      value={values.level}
      onChange={(e) => handleInputChange(e, 'level')}
   >
      <option value="non precise level">Non Precise Level</option>
      <option value="gradeLevel1">Grade Level 1</option>
      <option value="gradelevel2">Grade Level 2</option>
      <option value="gradelevel3">Grade Level 3</option>
      <option value="gradelevel4">Grade Level 4</option>
      <option value="gradelevel5">Grade Level 5</option>
      <option value="gradelevel6">Grade Level 6</option>
      <option value="gradelevel7">Grade Level 7</option>

   </select>
</fieldset>

<MDBCol md='3' className='ps-5'>
              <h11 className="mb-0">Image</h11>
            </MDBCol>

            <MDBCol md='9' className='pe-5'>
              <img className="img-fluid" src={image} alt="" />
              <MDBFile size='lg' id='customFile' onChange={handleImage} />


            </MDBCol>
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
/>
{errors.email && <span>{errors.email}</span>}  

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
                {error && <div className={styles.error_msg}>{error}</div>}
						{msg && <div className={styles.success_msg}>{msg}</div>}
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