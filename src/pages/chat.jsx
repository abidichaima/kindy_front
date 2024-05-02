import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import SideProfile from './SideProfile';
import { Link, Navigate } from 'react-router-dom'; // Import Navigate from react-router-dom
import Cookies from 'js-cookie';
import img from '../assets/images/BATTERIE.jpg'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'; // Import de l'icône Paper Plane

function Chatbot(props) {
  const [message, setMessage] = useState([]);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false); // Ajout d'un état pour le chargement

 
  useEffect(() => {
    // Scroll to bottom whenever messages change
    scrollToBottom();
  }, [messages]);
  console.log (message)


  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessages = [...messages, { text: inputText, fromUser: true }];
    setMessages(newMessages);
    setInputText('');
    setLoading(true); // Afficher le spinner lors de l'envoi du message

    console.log (message)

    try {
      const response = await axios.post('http://localhost:5000/chatbot', { message: inputText }); // Send the input text to the Flask server
      const botResponse = response.data.botResponse;
      const updatedMessages = [...newMessages, { text: botResponse, fromUser: false }];
      setMessages(updatedMessages);
    } catch (error) {
      console.error('Error sending message to chatbot:', error);
    }
    finally {
        setLoading(false); // Masquer le spinner après la réponse du chatbot
      }
  };
  console.log (message)


  const scrollToBottom = () => {
    // Scroll to bottom of messages div
    const messagesDiv = document.getElementById('messages');
    if (messagesDiv) {
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }
  };

  return (
    <div>

        <section class="tf-page-title ">    
            <div class="tf-container">
                <div class="row">
                    <div class="col-md-12">
                        <ul class="breadcrumbs">
                            <li><Link to="/">Home</Link></li>
                            <li>chatbot</li>
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
  <h5 className="title-detail">Chatbot  </h5>
  <div style={{ marginBottom: '100px' }}></div>

  <div id="messages" className="messages">
  {messages.map((message, index) => (
    <div key={index} className={message.fromUser ? "user-message" : "bot-message"} style={{ border: '1px solid black', padding: '10px', marginBottom: '10px' }}>
      {message.text}
    </div>
  ))}
</div>

<form onSubmit={handleMessageSubmit} style={{ display: 'flex', alignItems: 'center' }}>
  <input
    type="text"
    value={inputText}
    onChange={(e) => setInputText(e.target.value)}
    placeholder="Type your message..."
    style={{ marginRight: '1px' }} // Ajout de marge à droite pour séparer l'input du bouton
  />
  <button type="submit" style={{ background: 'none', border: 'none' }}>
    <FontAwesomeIcon icon={faPaperPlane} style={{ color: 'blue', fontSize: '24px' }} />
  </button>
</form>
  
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


 
  )                       

}


export default Chatbot;
