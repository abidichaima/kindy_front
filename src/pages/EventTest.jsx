import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { QRCodeCanvas } from 'qrcode.react';
import {  AiOutlineDownload } from "react-icons/ai";
import { jsPDF } from 'jspdf'
EventTest.propTypes = {

};

function EventTest(props) {
  
  const [id, setid] = useState(1);
  const [dataT, setDataT] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch ticket data
        const ticketResponse = await axios.get(`http://localhost:4000/tickets/user/${id}`);
        setDataT(ticketResponse.data.tickets || []);

        // Fetch event data
        const eventPromises = ticketResponse.data.tickets.map(async (item) => {
          try {
            const eventResponse = await axios.get(`http://localhost:4000/events/${item.event_id}`);
            return eventResponse.data.event;
          } catch (error) {
            console.error('Error fetching event data:', error);
            return null;
          }
        });

        const eventResults = await Promise.all(eventPromises);
        setEvents(eventResults);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);


  const [loading, setLoading] = useState(false);
  const canvasRef = useRef(null);

  const generateQRCodeData = (item, eventTitle) => {
    return `This ticket is for user ${item.user_id} for the event: ${eventTitle}, number of tickets: ${item.number}, total paid: ${item.amount}`;
  };

 

 const QrCodeDownload = () => {

        // Defines the pdf
        let pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: [40, 40]
        })

        // Transforms the canvas into a base64 image
        let base64Image = document.getElementById('qrcode').toDataURL()

        // Adds the image to the pdf
        pdf.addImage(base64Image, 'png', 0, 0, 40, 40)

        // Downloads the pdf
        pdf.save('QR.pdf')
    
    }

  return (
    <div>

      <section className="tf-page-title ">
        <div className="tf-container">
          <div className="row">
            <div className="col-md-12">


              <h4 className="page-title-heading">Your Tickets</h4>
            </div>
          </div>
        </div>
      </section>

      <section className="tf-ranking tf-filter overflow-d">
        <div className="tf-container">

          <div className="table-ranking">
            <div className="title-ranking">
              <div className="col-ranking">#</div>
              <div className="col-ranking">Date of Booking</div>
              <div className="col-ranking">Event</div>
              <div className="col-ranking"> tickets</div>
              <div className="col-ranking">Total Price</div>
              <div className="col-ranking">Your QrCode</div>
            </div>
          </div>
          <div className="table-ranking tf-filter-container">

            {
              dataT.map((item, index) => (

                <div className="content-ranking tf-loadmore 3d anime music" key={index} style={{ marginBottom: '10px' }} >
                  <div className="col-rankingg" style={{ marginRight: '130px' }}>{index}</div>
                  <div className="col-rankingg" style={{ marginRight: '150px' }}>
                    {new Date(item.createdAt).toLocaleDateString('en-GB')}
                  </div>
                  <div className="col-rankingg" style={{ marginRight: '150px' }}>{events[index]?.title}</div>
                  <div className="col-rankingg" style={{ marginRight: '150px' }}>{item.number}</div>
                  <div className="col-rankingg" style={{ marginRight: '150px' }}>{item.amount}</div>
                  <div className="col-rankingg" style={{ marginRight: '100px' }}>
                    <QRCodeCanvas
                      ref={canvasRef}
                      value={generateQRCodeData(item, events[index]?.title)}
                      size={200}
                      bgColor="#ffffff"
                      fgColor="#000000"
                      level="H"
                      includeMargin={false}
                      id = 'qrcode'/>

                  </div>
                  <div className="col-rankingg">
                    <button
                      onClick={() => QrCodeDownload()}
                      class="flex items-center justify-between bg-transparent hover:bg-[#0a75ad] text-[#0a75ad] font-semibold hover:text-white py-2 px-4 border border-[#0a75ad] hover:border-transparent rounded"
                    >
                      <AiOutlineDownload />
                      Download
                    </button>
                  </div>
                </div>
              ))

            }

          </div>

        </div>
      </section>

    </div>
  );
}

export default EventTest;