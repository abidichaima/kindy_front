import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { jwtDecode } from "jwt-decode";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"; // Importez les icônes de l'œil
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
const Login = () => {


  const styles=  {

    footer: {
      textAlign: 'right',
      marginTop: '330px',
      },

      header :{
        marginTop : '100px'
      },
      inputgrouptextbtnshowpass: {
        cursor: 'pointer',
        position: 'absolute',
        right: '10px',
        top: '50%',
        transform: 'translateY(-50%)',
      },}
  const navigate = useNavigate();
  const [cookies] = useCookies(['user']);
  const [values, setValues] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevVisible) => !prevVisible);
  };

  const handleChange = ({ currentTarget: input }) => {
    setValues({ ...values, [input.name]: input.value });
  };
  const [passwordVisible, setPasswordVisible] = useState(false); // État pour suivre la visibilité du mot de passe

  const googleAuth = () => {
		window.open(
			`http://localhost:4000/user/auth/google/callback`,
			"_self"
		);
	};

  const handleSubmit = async (e) => {
    e.preventDefault();

    
   
    try {
      const url = 'http://localhost:4000/user';
      const response = await axios.post(url, values, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status >= 200 && response.status < 300) {
        // Decode the JWT token
        const decodedToken = jwtDecode(response.data.data);

        // Store user information in cookies
 // Accessing user information

 // Store user information in cookies
 Cookies.set('user', JSON.stringify(decodedToken ), { expires: 7 }); // Set an expiration time if needed
        // Navigate to the dashboard
        navigate('/');
      } else {
        // Handle the case where the response status is not in the success range
        setError('An error occurred during login. Please try again later.');
      }
    } catch (error) {
      // Handle other errors related to the axios request
      console.error('Error during login:', error);

      // Check if the error has a response and contains data
      if (error.response && error.response.data) {
        setError(error.response.data.message || 'An error occurred during login.');
      } else {
        setError('An error occurred during login. Please try again later.');
      }
      Swal.fire({
        icon: 'error',
        title: 'Login Error',
        text: 'check your email and password ',
      });
    }
  };
   
  useEffect(() => {
    // Si l'utilisateur est déjà connecté, le rediriger vers la page 404
    if (cookies.user) {
      navigate('/');
    }
  }, [cookies.user, navigate]);



  return (

    <div style={styles.header}>

 
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
              
              <div>
      <div className="form-group">
        <label></label>
        <div className="input-group">
          <input
            type={passwordVisible ? "text" : "password"}
            name="password"
            placeholder="Password"
            className="form-control"
            value={values.password}
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
            
          />
          <div className="inputgrouptextbtnshowpass" onClick={() => setPasswordVisible(!passwordVisible)}>
            <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
            </div>

        </div>
      </div>
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
  <div className="text-center">
    <span>
      Did you forget your password? <Link to="/forgot-password">Forgot Password</Link>
      <br/><br/>
      Don't have an account? <Link to="/register">Register</Link>
    </span>
  </div>
</div>
<div style={styles.footer}>

</div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
  };

export default Login;