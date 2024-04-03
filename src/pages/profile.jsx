import React, { useState, useContext, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import PageTitle from '../components/pagetitle/PageTitle';
import { Link } from 'react-router-dom';
import img from '../assets/images/BATTERIE.jpg'
import { getuser } from '../services/question';
import SideProfile from './SideProfile';
function Profile(props) {
 

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [level, setLevel] = useState('non precise level'); // Set default level

  const [phoneNumber, setPhoneNumber] = useState('');
 
  const [specialite, setSpecialite] = useState([]);

  const [role, setRole] = useState('student'); // Set default role
  const [image, setImage] = useState(''); 
  const handleOpenPopupUp = (item) => {
    setSelectedItem(item);
    setUpdateFormOpen(true);
  };

  const [isPopupOpenUpdate, setIsPopupOpenUpdate] = useState(false);
  const [isPopupOpenUp, setIsPopupOpenUp] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentUser, setcurrentUser] = useState(



  );

  const [updateShow, setUpdateShow] = useState(false);

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleClosePopupUp = () => {
    setIsPopupOpenUp(false);
  };
 
  const handleOpenupdate = () => {
    isPopupOpenUpdate(true);
  };

  const [isUpdateFormOpen, setUpdateFormOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [user,setuser] = useState([]);
  useEffect(() => {
    const fetchUser = async () => {
        const userResult = await getuser("65f104d40b866b69b10b9552"); 
        setuser(userResult.data);
    }
    fetchUser();
  }, []);
console.log("user",user);
return (

   
    <div>

        <section class="tf-page-title ">    
            <div class="tf-container">
                <div class="row">
                    <div class="col-md-12">
                        <ul class="breadcrumbs">
                            <li><Link to="/">Home</Link></li>
                            <li>Profile</li>
                        </ul>
                    </div>
                </div>
            </div>  
            <div class="container-fluid"  style={{ width: '100%' }}>
                <div class="row"  style={{ width: '100%' }}>
                    <div class="thumb-pagetitle"  style={{ width: '100%' }}>
                    <img src={img} alt="images"   style={{ width: '100%' }}/>
                    </div>
                </div>
            </div>                     
        </section>

        <section className="tf-dashboard tf-tab">
            <div className="tf-container">
                <Tabs className='dashboard-filter'>
                    <div className="row ">                 
                        <div className="col-xl-3 col-lg-12 col-md-12">
                           <SideProfile/>
                        </div>
                        <div className="col-xl-9 col-lg-12 col-md-12 overflow-table">

                                <div className="dashboard-content inventory content-tab">




                                    <section className="tf-item-detail">
                                        <div className="tf-container">
                                            <div className="row">
                                                <div className="col-md-12">
                                                <div className="tf-item-detail-inner">
                                                       

                                                       <div className="content">
  <h2 className="title-detail"></h2>

  <Tabs className="tf-tab">
    <TabList className="menu-tab">
      <Tab className="tab-title">
        <Link to="#">firstName</Link>
      </Tab>
      <Tab className="tab-title">
        <Link to="#">lastName</Link>
      </Tab>
      <Tab className="tab-title">
        <Link to="#">email</Link>
      </Tab>
      <Tab className="tab-title">
        <Link to="#">role</Link>
      </Tab>
      <Tab className="tab-title">
        <Link to="#">phoneNumber</Link>
      </Tab>
      <Tab className="tab-title">
        <Link to="#">level</Link>
      </Tab>
      <Tab className="tab-title">
        <Link to="#">speciality</Link>
      </Tab>
      <Tab className="tab-title">
        <Link to="#">actions</Link>
      </Tab>
    </TabList>
    <TabPanel>
      <div className="tab-details">
        <p>{user.firstName} </p>
      </div>
    </TabPanel>

    <TabPanel>
      <div className="tab-details">
        <p>{user.lastName}</p>
      </div>
    </TabPanel>

    <TabPanel>
      <div className="tab-details">
        <p>{user.email}</p>
      </div>
    </TabPanel>

    <TabPanel>
      <div className="tab-details">
        <p>{user.role}</p>
      </div>
    </TabPanel>

    <TabPanel>
      <div className="tab-details">
      <p>{user.phoneNumber}</p>
      </div>
    </TabPanel>

    <TabPanel>
      <div className="tab-details">
      <p>{user.level}</p>
      </div>
    </TabPanel>

    <TabPanel>
      <div className="tab-details">
   <p>{user.speciality}</p>
      </div>
    </TabPanel>

    <TabPanel>
<button type='submit' 

>
                                <svg fill="none" viewBox="0 0 15 15" height="30px" width="100px" {...props}>
                                  <path
                                    fill="currentColor"
                                    fillRule="evenodd"
                                    d="M1.903 7.297c0 3.044 2.207 5.118 4.686 5.547a.521.521 0 11-.178 1.027C3.5 13.367.861 10.913.861 7.297c0-1.537.699-2.745 1.515-3.663.585-.658 1.254-1.193 1.792-1.602H2.532a.5.5 0 010-1h3a.5.5 0 01.5.5v3a.5.5 0 01-1 0V2.686l-.001.002c-.572.43-1.27.957-1.875 1.638-.715.804-1.253 1.776-1.253 2.97zm11.108.406c0-3.012-2.16-5.073-4.607-5.533a.521.521 0 11.192-1.024c2.874.54 5.457 2.98 5.457 6.557 0 1.537-.699 2.744-1.515 3.663-.585.658-1.254 1.193-1.792 1.602h1.636a.5.5 0 110 1h-3a.5.5 0 01-.5-.5v-3a.5.5 0 111 0v1.845h.002c.571-.432 1.27-.958 1.874-1.64.715-.803 1.253-1.775 1.253-2.97z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                
                              </button>   </TabPanel>
                            
  </Tabs>
  
</div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </section>



                                </div>
                            </div>
                        </div>
                    </Tabs>
                </div>
            </section>
        </div>
);
}

export default Profile;