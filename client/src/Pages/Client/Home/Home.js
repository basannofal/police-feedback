import React from 'react';
import '../../../Assets/css/home.css';
import Footer from '../../../Layout/Client/Footer';
import ChatBoat from '../Citizen/ChatBoat';

function Home() {
  return (
    <>
      <div className="home_main">
        <div className="home_img">
          <div
            id="carouselExampleAutoplaying"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src={require("../../../Assets/Images/1.jpg")}
                  className="d-block w-100"
                  style={{ height: "70vh" }}
                  alt="..."
                />
              </div>
              <div className="carousel-item">
                <img
                  src={require("../../../Assets/Images/2.jpg")}
                  className="d-block w-100"
                  style={{ height: "70vh" }}
                  alt="..."
                />
              </div>
              <div className="carousel-item">
                <img
                  src={require("../../../Assets/Images/rjpolice.jpg")}
                  className="d-block w-100"
                  style={{ height: "70vh" }}
                  alt="..."
                />
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleAutoplaying"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleAutoplaying"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>

        <div className="home_pg">
          <div className="home_space">
            <p>
              Rajasthan is divided into 2 police commissionerate, 7 police range
              each headed by an Inspector General of Police (IGP). The state is
              further divided into 40 districts (including 3 rural districts, 2
              city districts in Jaipur City and 2 railway police districts), 171
              circles, 709 police stations and 788 out-posts.
              <br />
              <br />
              What is the structure of Police in Rajasthan?
              <br />
              There are eight range offices in the State and Headed by Deputy
              Inspector of General of Police and Superintendent of Police level
              officer. Two ranges offices are situated at State Headquarter,
              Jaipur-I & Jaipur-II. Rest are situated at Ajmer, Bikaner,
              Bharatpur, Kota, Udapur and Jodhpur District Headquarters.
            </p>
          </div>
        </div>
      </div>

      <ChatBoat/>
      <Footer />
    </>
  );
}

export default Home;
