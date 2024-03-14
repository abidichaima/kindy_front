import React , {useState,useContext,useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Link, Route, Routes } from 'react-router-dom';
import {  useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import img from '../assets/images/background/thumb-pagetitle.jpg'
import img1 from '../assets/images/logo.png'
import { getuser } from '../services/question';

//import avt from '../assets/images/logo1.png'

import ViewUser from './viewUser';

import Swal from 'sweetalert2';

import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import {
 
    Dialog,
    DialogContent,
    DialogTitle,
    
  } from '@mui/material';



  function LogoutButton() {
   
    const navigate = useNavigate();
  
    const handleLogout = () => {
      // Remove user from cookies
      //Cookies.remove('user');
      
      // Navigate to the login page
      navigate('/login');
    };
  
    return (
      <button onClick={handleLogout}>
        Logout
      </button>
    );
  }
function SideProfile(props) {
   
    const [user,setuser] = useState([]);
    useEffect(() => {
      const fetchUser = async () => {
          const userResult = await getuser("65f104d40b866b69b10b9552"); 
          setuser(userResult.data);
      }
      fetchUser();
    }, []);

    return (

       
        <div>
            
<div className="dashboard-user">
                                    <div className="dashboard-infor">
                                    <div className="image">
                                                        {user.image && user.image.url && (
  <div>
    <img src={user.image.url} alt="" style={{ width: '500px', height: '400px' }} />
  </div>
)}

{!user.image && (
  <p>no image</p>
)} </div>
                                        <div className="name"></div>
                                        <div className="name"  >    {user.firstName} </div> 
 
                                    
                                      <ul className="social-item">
                                          <li><Link to="#"><i className="fab fa-facebook-f"></i></Link></li>
                                          <li><Link to="#"><i className="fab fa-twitter"></i></Link></li>
                                      </ul>
                                       
                                    </div>
                                    <TabList className='filter-menuu menu-tab'>

                                                  

                                   
<Tab>   <a >          <svg viewBox="0 0 1024 1024" fill="currentColor" width="20" height="20" {...props}>
<path d="M858.5 763.6a374 374 0 00-80.6-119.5 375.63 375.63 0 00-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 00-80.6 119.5A371.7 371.7 0 00136 901.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 008-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z" />
</svg>  <Link to="/profile">Informations</Link></a>  </Tab>
<Tab>   <a >          <svg viewBox="0 0 1024 1024" fill="currentColor" width="20" height="20" {...props}>
<path d="M858.5 763.6a374 374 0 00-80.6-119.5 375.63 375.63 0 00-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 00-80.6 119.5A371.7 371.7 0 00136 901.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 008-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z" />
</svg>  <Link to="/test">Quizz</Link></a>  </Tab>




<Tab> <svg
fill="currentColor"
viewBox="0 0 16 16"
height="20"
width="20"
{...props}
>
<path
fillRule="evenodd"
d="M5 11.5a.5.5 0 01.5-.5h9a.5.5 0 010 1h-9a.5.5 0 01-.5-.5zm0-4a.5.5 0 01.5-.5h9a.5.5 0 010 1h-9a.5.5 0 01-.5-.5zm0-4a.5.5 0 01.5-.5h9a.5.5 0 010 1h-9a.5.5 0 01-.5-.5z"
/>
<path d="M1.713 11.865v-.474H2c.217 0 .363-.137.363-.317 0-.185-.158-.31-.361-.31-.223 0-.367.152-.373.31h-.59c.016-.467.373-.787.986-.787.588-.002.954.291.957.703a.595.595 0 01-.492.594v.033a.615.615 0 01.569.631c.003.533-.502.8-1.051.8-.656 0-1-.37-1.008-.794h.582c.008.178.186.306.422.309.254 0 .424-.145.422-.35-.002-.195-.155-.348-.414-.348h-.3zm-.004-4.699h-.604v-.035c0-.408.295-.844.958-.844.583 0 .96.326.96.756 0 .389-.257.617-.476.848l-.537.572v.03h1.054V9H1.143v-.395l.957-.99c.138-.142.293-.304.293-.508 0-.18-.147-.32-.342-.32a.33.33 0 00-.342.338v.041zM2.564 5h-.635V2.924h-.031l-.598.42v-.567l.629-.443h.635V5z" />
</svg>  <Link to="">Settings</Link></Tab>

<Tab>
            <LogoutButton />
          </Tab>

</TabList>
             
                                    
     
                                </div>
        </div>
    );
}

export default SideProfile;