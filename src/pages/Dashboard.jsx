import React  from 'react';
import { Tab, TabList,  } from 'react-tabs';
import { Link } from 'react-router-dom';
import img1 from '../assets/images/logo.png'

import ViewUser from './viewUser';
import Swal from 'sweetalert2';

import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import {
 
    Dialog,
    DialogContent,
    DialogTitle,
    
  } from '@mui/material';




function Dashboard(props) {

    return (

        <div>
  
                                <div className="dashboard-user">
                                    <div className="dashboard-infor">
                                        <div className="avatar">
                                            <img src={img1} alt="images" />
                                        </div>
                                        <div className="name">El kindy </div>
                                      
                                        <ul className="social-item">
                                            <li><Link to="#"><i className="fab fa-facebook-f"></i></Link></li>
                                            <li><Link to="#"><i className="fab fa-twitter"></i></Link></li>
                                        </ul>
                                    </div>
                                    <TabList className='filter-menuu menu-tab'>

                                                  

                                    <Tab>   <a >         <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      <path d="M4 13h6a1 1 0 001-1V4a1 1 0 00-1-1H4a1 1 0 00-1 1v8a1 1 0 001 1zm-1 7a1 1 0 001 1h6a1 1 0 001-1v-4a1 1 0 00-1-1H4a1 1 0 00-1 1v4zm10 0a1 1 0 001 1h6a1 1 0 001-1v-7a1 1 0 00-1-1h-6a1 1 0 00-1 1v7zm1-10h6a1 1 0 001-1V4a1 1 0 00-1-1h-6a1 1 0 00-1 1v5a1 1 0 001 1z" />
    </svg>  <Link to="/dash">Dashboard</Link></a>  </Tab>
<Tab>   <a >          <svg viewBox="0 0 1024 1024" fill="currentColor" width="20" height="20" {...props}>
<path d="M858.5 763.6a374 374 0 00-80.6-119.5 375.63 375.63 0 00-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 00-80.6 119.5A371.7 371.7 0 00136 901.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 008-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z" />
</svg>  <Link to="/users">Users</Link></a>  </Tab>




<Tab><a > <svg
fill="currentColor"
viewBox="0 0 16 16"
height="20"
width="20"
{...props}
>
<path d="M12.5 3a.5.5 0 010 1h-5a.5.5 0 010-1h5zm0 3a.5.5 0 010 1h-5a.5.5 0 010-1h5zm.5 3.5a.5.5 0 00-.5-.5h-5a.5.5 0 000 1h5a.5.5 0 00.5-.5zm-.5 2.5a.5.5 0 010 1h-5a.5.5 0 010-1h5z" />
<path d="M16 2a2 2 0 00-2-2H2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2zM4 1v14H2a1 1 0 01-1-1V2a1 1 0 011-1h2zm1 0h9a1 1 0 011 1v12a1 1 0 01-1 1H5V1z" />
</svg><Link to="/question">Questions</Link> </a></Tab>
<Tab><a > <svg
fill="currentColor"
viewBox="0 0 16 16"
height="20"
width="20"
{...props}
>
<path d="M12.5 3a.5.5 0 010 1h-5a.5.5 0 010-1h5zm0 3a.5.5 0 010 1h-5a.5.5 0 010-1h5zm.5 3.5a.5.5 0 00-.5-.5h-5a.5.5 0 000 1h5a.5.5 0 00.5-.5zm-.5 2.5a.5.5 0 010 1h-5a.5.5 0 010-1h5z" />
<path d="M16 2a2 2 0 00-2-2H2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2zM4 1v14H2a1 1 0 01-1-1V2a1 1 0 011-1h2zm1 0h9a1 1 0 011 1v12a1 1 0 01-1 1H5V1z" />
</svg><Link to="/quizz">Quizz</Link> </a></Tab>
<Tab><a > <svg
fill="currentColor"
viewBox="0 0 16 16"
height="1em"
width="1em"
{...props}
>
<path d="M7 2.5a.5.5 0 01.5-.5h7a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-7a.5.5 0 01-.5-.5v-1zM2 1a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V3a2 2 0 00-2-2H2zm0 8a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H2zm.854-3.646a.5.5 0 01-.708 0l-1-1a.5.5 0 11.708-.708l.646.647 1.646-1.647a.5.5 0 11.708.708l-2 2zm0 8a.5.5 0 01-.708 0l-1-1a.5.5 0 01.708-.708l.646.647 1.646-1.647a.5.5 0 01.708.708l-2 2zM7 10.5a.5.5 0 01.5-.5h7a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-7a.5.5 0 01-.5-.5v-1zm0-5a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5a.5.5 0 01-.5-.5zm0 8a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5a.5.5 0 01-.5-.5z" />
</svg><Link to="/results"> Results </Link></a></Tab>
<Tab><a >  <svg
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
</svg> Quizz</a></Tab>
<Tab><a > <svg
fill="currentColor"
viewBox="0 0 16 16"
height="20"
width="20"
{...props}
>
<path d="M4 .5a.5.5 0 00-1 0V1H2a2 2 0 00-2 2v1h16V3a2 2 0 00-2-2h-1V.5a.5.5 0 00-1 0V1H4V.5zM16 14V5H0v9a2 2 0 002 2h12a2 2 0 002-2zm-3.5-7h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1a.5.5 0 01.5-.5z" />
</svg> Events</a></Tab>
<Tab><a > <svg
fill="currentColor"
viewBox="0 0 16 16"
height="20"
width="20"
{...props}
>
<path d="M2.5 3.5a.5.5 0 010-1h11a.5.5 0 010 1h-11zm2-2a.5.5 0 010-1h7a.5.5 0 010 1h-7zM0 13a1.5 1.5 0 001.5 1.5h13A1.5 1.5 0 0016 13V6a1.5 1.5 0 00-1.5-1.5h-13A1.5 1.5 0 000 6v7zm1.5.5A.5.5 0 011 13V6a.5.5 0 01.5-.5h13a.5.5 0 01.5.5v7a.5.5 0 01-.5.5h-13z" />
</svg> Courses </a></Tab>
<Tab><a > <svg
fill="currentColor"
viewBox="0 0 16 16"
height="20"
width="20"
{...props}
>
<path d="M3.5 0a.5.5 0 01.5.5V1h8V.5a.5.5 0 011 0V1h1a2 2 0 012 2v11a2 2 0 01-2 2H2a2 2 0 01-2-2V3a2 2 0 012-2h1V.5a.5.5 0 01.5-.5zM2 2a1 1 0 00-1 1v1h14V3a1 1 0 00-1-1H2zm13 3H1v9a1 1 0 001 1h12a1 1 0 001-1V5z" />
<path d="M11 7.5a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1zm-3 0a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1zm-2 3a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1zm-3 0a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1z" />
</svg></a><Link to="/calendar">Calendar</Link></Tab>
<Tab><a > <svg
fill="currentColor"
viewBox="0 0 16 16"
height="20"
width="20"
{...props}
>
<path d="M3.5 0a.5.5 0 01.5.5V1h8V.5a.5.5 0 011 0V1h1a2 2 0 012 2v11a2 2 0 01-2 2H2a2 2 0 01-2-2V3a2 2 0 012-2h1V.5a.5.5 0 01.5-.5zM2 2a1 1 0 00-1 1v1h14V3a1 1 0 00-1-1H2zm13 3H1v9a1 1 0 001 1h12a1 1 0 001-1V5z" />
<path d="M11 7.5a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1zm-3 0a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1zm-2 3a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1zm-3 0a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1z" />
</svg></a><Link to="/freetime">freetime</Link></Tab>
<Tab><a > <svg
fill="currentColor"
viewBox="0 0 16 16"
height="20"
width="20"
{...props}
>
<path d="M3.5 0a.5.5 0 01.5.5V1h8V.5a.5.5 0 011 0V1h1a2 2 0 012 2v11a2 2 0 01-2 2H2a2 2 0 01-2-2V3a2 2 0 012-2h1V.5a.5.5 0 01.5-.5zM2 2a1 1 0 00-1 1v1h14V3a1 1 0 00-1-1H2zm13 3H1v9a1 1 0 001 1h12a1 1 0 001-1V5z" />
<path d="M11 7.5a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1zm-3 0a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1zm-2 3a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1zm-3 0a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1z" />
</svg></a><Link to="/holidays">holidays</Link></Tab>
<Tab><a > <svg
fill="currentColor"
viewBox="0 0 16 16"
height="20"
width="20"
{...props}
>
<path d="M3.5 0a.5.5 0 01.5.5V1h8V.5a.5.5 0 011 0V1h1a2 2 0 012 2v11a2 2 0 01-2 2H2a2 2 0 01-2-2V3a2 2 0 012-2h1V.5a.5.5 0 01.5-.5zM2 2a1 1 0 00-1 1v1h14V3a1 1 0 00-1-1H2zm13 3H1v9a1 1 0 001 1h12a1 1 0 001-1V5z" />
<path d="M11 7.5a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1zm-3 0a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1zm-2 3a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1zm-3 0a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1z" />
</svg></a><Link to="/mycalendar">My Calendar</Link></Tab>
<Tab><a > <svg
fill="currentColor"
viewBox="0 0 16 16"
height="20"
width="20"
{...props}
>
<path d="M3.5 0a.5.5 0 01.5.5V1h8V.5a.5.5 0 011 0V1h1a2 2 0 012 2v11a2 2 0 01-2 2H2a2 2 0 01-2-2V3a2 2 0 012-2h1V.5a.5.5 0 01.5-.5zM2 2a1 1 0 00-1 1v1h14V3a1 1 0 00-1-1H2zm13 3H1v9a1 1 0 001 1h12a1 1 0 001-1V5z" />
<path d="M11 7.5a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1zm-3 0a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1zm-2 3a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1zm-3 0a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1z" />
</svg><Link to="/lesson">Lesson</Link> </a></Tab>



</TabList>
             
                                    
     
                                </div>
        </div>
    );
}

export default Dashboard;