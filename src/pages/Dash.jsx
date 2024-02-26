import React , {useState,useContext} from 'react';
import Button from 'react-bootstrap/Button';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import PageTitle from '../components/pagetitle/PageTitle';
import { Link } from 'react-router-dom';
import { createPortal } from 'react-dom';
//import avt from '../assets/images/logo1.png'
import img from '../assets/images/BATTERIE.jpg'

import img1 from '../assets/images/product/product4.jpg'
import img2 from '../assets/images/product/product5.jpg'
import img3 from '../assets/images/product/product6.jpg'
import img4 from '../assets/images/product/product7.jpg'
import img5 from '../assets/images/product/product8.jpg'
import img6 from '../assets/images/product/product9.jpg'
import icon1 from '../assets/images/svg/icon-wallet-1.svg'
import icon2 from '../assets/images/svg/icon-wallet-2.svg'
import icon3 from '../assets/images/svg/icon-wallet-3.svg'
import icon4 from '../assets/images/svg/icon-wallet-4.svg'
import icon5 from '../assets/images/svg/icon-wallet-5.svg'
import icon6 from '../assets/images/svg/icon-wallet-6.svg'
import icon7 from '../assets/images/svg/icon-wallet-7.svg'
import icon8 from '../assets/images/svg/icon-wallet-8.svg'
import avt1 from '../assets/images/author/history-at1.jpg'
import avt2 from '../assets/images/author/history-at2.jpg'
import avt3 from '../assets/images/author/history-at3.jpg'
import avt4 from '../assets/images/author/history-at4.jpg'
import avt5 from '../assets/images/author/history-at5.jpg'
import avt6 from '../assets/images/author/history-at6.jpg'
import avtf1 from '../assets/images/author/author-follow1.jpg'
import avtf2 from '../assets/images/author/author-follow2.jpg'
import avtf3 from '../assets/images/author/author-follow3.jpg'
import avtf4 from '../assets/images/author/author-follow4.jpg'
import avtf5 from '../assets/images/author/author-follow3.jpg'
import avtf6 from '../assets/images/author/author-follow4.jpg'

import Swal from 'sweetalert2';
import AddQuestionForm from './addQuestion';
import UpdateQuestionForm from './updateQuestion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import {Dialog, DialogContent,DialogTitle} from '@mui/material';
import Modal from 'react-bootstrap/Modal';
import Dashboard from './Dashboard';




function Dash(props) {

  
 

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
                            <Dashboard/>
                        </div>
                        <div className="col-xl-9 col-lg-12 col-md-12 overflow-table">

                            <div className="dashboard-content inventory content-tab">
                                                            
                            


                                  
                               this is dash
                                
                                                    
                                
                                
                            </div>
                        </div>
                    </div>
                </Tabs> 
                
            </div>
        </section>
        
    </div>
);
}

export default Dash;