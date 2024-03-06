import React from 'react'
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from 'axios'
import styles from "./styles.module.css";


function ResetPassword() {
    const [password, setPassword] = useState()
    const navigate = useNavigate()
    const {id, token} = useParams()

    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`http://localhost:4000/user/users/reset-password/${id}/${token}`, {password})
        .then(res => {
            if(res.data.Status === "Success") {
                navigate('/login')
               
            }
        }).catch(err => console.log(err))
    }
  

    return(
  
      <div className="center">
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto">
          <div className="row justify-content-center">

        <h6>Reset Password</h6>
        <br/>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              autoComplete="off"
              name="password"
              className="form-control rounded-0"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
<br/>
          <button type="submit" className="submit">
            Update
          </button>

          </form>
          </div>
          </div> 
          </div> 
          </div> 
          </div>
    )
}

export default ResetPassword;