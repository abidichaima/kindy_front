import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import Swal from 'sweetalert2';
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
  import {
    ref,
    uploadBytes,
    getDownloadURL,
    listAll,
    list,
  } from "firebase/storage";
  import { storage } from "../../firebase";
  import { v4 } from "uuid";
function Register() {
  const [cookies] = useCookies(["cookie-name"]);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [errors, setErrors] = useState({})
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [level, setLevel] = useState('non precise level'); // Set default level

  const [phoneNumber, setPhoneNumber] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');

  const [role, setRole] = useState('student'); // Set default role
  //control saisie 
  const [errEmail, setErrEmail] = useState('');
  const [showerrEmail, setShowerrEmail] = useState(false);

  const [errPassword, setErrPassword] = useState('');
  const [showerrPassword, setShowerrPassword] = useState(false);

  const [errFirstName, setErrFirstName] = useState('');
  const [showerrFirstName, setShowerrFirstName] = useState(false);

  const [errLastName, setErrLastName] = useState('');
  const [showErrLastName, setShowErrLastName] = useState(false);

  const [errLevel, setErrLevel] = useState('');
  const [showErrLevel, setShowErrLevel] = useState(false);

  const [errPhoneNumber, setErrPhoneNumber] = useState('');
  const [showErrPhoneNumber, setShowErrPhoneNumber] = useState(false);

  const [errConfirmPassword, setErrConfirmPassword] = useState('');
  const [showErrConfirmPassword, setShowErrConfirmPassword] = useState(false);


  const isNumber = (value) => !isNaN(Number(value));


  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);


  const isValidEmail = (value) => {
    // You can use a regular expression for basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };
const imagesListRef = ref(storage, "images/");
  const uploadFile = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
      });
    });
  };

  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
  }, []);



  useEffect(() => {
    if (cookies.jwt) {
      navigate("/");
    }
  }, [cookies, navigate]);

  const [values, setValues] = useState({
    firstName: '', lastName: '', email: '', password: '', role: 'student', phoneNumber: '', level: 'non precise level' ,    confirmPassword: '' // Include confirmPassword here

    // Default role
  }

  );
  const [errorFields, setErrorFields] = useState({});
  console.log("Initial errorFields:", errorFields);



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values, [name]: value
    })
  }
  const handleSubmit = async (event) => {


    event.preventDefault();


    if (!isNumber(phoneNumber)) {
      setErrPhoneNumber('Ensure phone number is a number');
      setShowErrPhoneNumber(true);
    } 
     if (phoneNumber.length !== 8) {
      setErrPhoneNumber('Phone number must be 8 digits');
      setShowErrPhoneNumber(true);
    }
    if (!isValidEmail(email)) {
      setErrEmail('Please enter a valid email address');
      setShowerrEmail(true);
    }
    //input 
    if (!firstName) {
      setErrFirstName('Please fill in first name');
      setShowerrFirstName(true)
    }

    if (!email) {
      setErrEmail('Please fill in email');
      setShowerrEmail(true);
    }

    // Validate password
    if (!password) {
      setErrPassword('Please fill in password');
      setShowerrPassword(true);
    }

    // Validate first name
  

    // Validate last name
    if (!lastName) {
      setErrLastName('Please fill in last name');
      setShowErrLastName(true);
    }

    // Validate level (adjust the condition as needed)
    if (!level) {
      setErrLevel('Please select a level');
      setShowErrLevel(true);
    }

    // Validate phone number
    if (!phoneNumber) {
      setErrPhoneNumber('Please fill in phone number');
      setShowErrPhoneNumber(true);
    }
    if (!values.confirmPassword) {
      setErrConfirmPassword('Please confirm your password');
      setShowErrConfirmPassword(true);
    } else if (values.confirmPassword !== values.password) {
      setErrConfirmPassword('Passwords do not match');
      setShowErrConfirmPassword(true);
    }




    try {
      console.log("Sending request with values:", values);

      const url = "http://localhost:4000/user/users";
      const { values: res } = await axios.post(url, values);
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful!',
        text: 'Please verify your email.',
      });
      navigate('/login')

    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Affichez le message d'erreur du serveur, s'il y en a un
        console.error("Erreur de validation côté serveur :", error.response.data.message);
        console.error('Error during form submission:', error);

        
      } else {
        console.error("Erreur inattendue lors de la soumission du formulaire :", error.message);
      }
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
                <fieldset>
                  <input
                    id="firstName"
                    name="firstName"
                    tabIndex="3"
                    aria-required="true"

                    type="text"
                    placeholder="First Name"
                    value={values.firstName}
                    onChange={(e) => { setValues({ ...values, firstName: e.target.value }); setErrFirstName('') }}
                  />
                </fieldset>
                {showerrFirstName && (
                  <div className='error-message'>
                    <p style={{ color: 'red' }}>{errFirstName}</p>
                  </div>
                )}
                <fieldset>
                  <input
                    id="lastName"
                    name="lastName"
                    tabIndex="4"
                    aria-required="true"

                    type="text"
                    autoComplete='off'

                    placeholder="Last Name"
                    value={values.lastName}
                    onChange={(e) => { setValues({ ...values, lastName: e.target.value }); setErrLastName(''); }}
                  />

                </fieldset>

                {showErrLastName && (
                  <div className='error-message'>
                    <p style={{ color: 'red' }}>{errLastName}</p>
                  </div>)}
                <fieldset>
                  <input
                    id="phoneNumber"
                    name="phoneNumber"
                    tabIndex="4"
                    aria-required="true"

                    type="text"
                    placeholder="phoneNumber"
                    value={values.phoneNumber}
                    onChange={(e) => { setValues({ ...values, phoneNumber: e.target.value }); setErrPhoneNumber(''); }}
                  />
                </fieldset>

                {showErrPhoneNumber && (
                  <div className='error-message'>
                    <p style={{ color: 'red' }}>{errPhoneNumber}</p>
                  </div>)}
                <fieldset >
                  <select className={styles['level-fieldset']}
                    id="level"
                    name="level"
                    tabIndex="5"
                    aria-required="true"

                    value={values.level}
                    onChange={(e) => handleInputChange(e, 'level')}
                  >
                    <option value="non precise level">non precise level </option>
                    <option value="gradelevel1">gradelevel1</option>
                    <option value="gradelevel2">gradelevel2</option>
                    <option value="gradelevel3">gradelevel3</option>
                    <option value="gradelevel4">gradelevel4</option>
                    <option value="gradelevel5">gradelevel5</option>
                    <option value="gradelevel6">gradelevel6</option>
                    <option value="gradelevel7">gradelevel7</option>

                  </select>
                </fieldset>
                <fieldset>
                  <input
                    id="email"
                    name="email"
                    tabIndex="1"
                    aria-required="true"

                    type="text"
                    placeholder="Email"
                    value={values.email}
                    onChange={(e) => { handleInputChange(e, 'email'); setErrPhoneNumber(''); }}
                  />
                  {showerrEmail && (
                    <div className='error-message'>
                      <p style={{ color: 'red' }}>{errEmail}</p>
                    </div>)}


                </fieldset>
                <fieldset>
                  <input
                    id="showpassword"
                    name="password"
                    tabIndex="2"
                    aria-required="true"

                    type="password"
                    placeholder="Password"
                    value={values.password}
                    onChange={(e) => { setValues({ ...values, password: e.target.value }); setErrPassword(''); }}
                  />
                  {showerrPassword && (
                    <div className='error-message'>
                      <p style={{ color: 'red' }}>{errPassword}</p>
                    </div>)}
                  <span className="btn-show-pass"></span>
                </fieldset>

                
<fieldset>
  <input
    id="confirmpassword" // Step 2
    name="confirmpassword" // Step 2
    tabIndex="3"
    aria-required="true"
    type="password"
    placeholder="Confirm Password"
    value={values.confirmPassword} // Step 2
    onChange={(e) => { setValues({ ...values, confirmPassword: e.target.value }); setErrConfirmPassword('');  }}

  
  />
  {showErrConfirmPassword && ( // Step 3
    <div className='error-message'>
      <p style={{ color: 'red' }}>{errConfirmPassword}</p>
    </div>
  )}
</fieldset>


                <div className="forgot-pass-wrap">
                 
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