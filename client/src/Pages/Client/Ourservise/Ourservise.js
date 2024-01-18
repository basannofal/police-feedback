import React, { useEffect, useState } from "react";
import "../../../Assets/css/Ourservice.css";
import { NavLink, useNavigate } from "react-router-dom";
import ChatBoat from "../Citizen/ChatBoat";
import Footer from "../../../Layout/Client/Footer";

function Ourservise() {
  const [isAuth, setIsAuth] = useState(false);
  const [userId, setuserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userToken"));
    console.log(storedUser);
    if (storedUser) {
      setIsAuth(true);
      setuserId(storedUser.id);
    }
  }, []);

  return (
    <>
      <div>
        <div className="OurServices">Our Services</div>
        <div className="ouer">
          <div className="OurServices_perent">
            {/* 1 */}
            <NavLink to={isAuth ? `/complaint/${userId}` : "/citizen-login"}>
              <div className="OurServices_chaild">
                <div className="OurServices_chaild_img" OurServices_chaild_img>
                  <img src={require("../../../Assets/Images/Fir.png")}></img>
                </div>
                <div className="OurServices_chaild_ptag">Get a Copy of FIR</div>
              </div>
            </NavLink>

            {/* 2*/}
            <NavLink to={isAuth ? `/complaint/${userId}` : "/citizen-login"}>
              <div className="OurServices_chaild">
                <div className="OurServices_chaild_img" OurServices_chaild_img>
                  <img
                    src={require("../../../Assets/Images/Eapplication.png")}
                  ></img>
                </div>
                <div className="OurServices_chaild_ptag">e-Application</div>
              </div>
            </NavLink>

            {/* 3 */}

            <NavLink to={isAuth ? `/complaint/${userId}` : "/citizen-login"}>
              <div className="OurServices_chaild">
                <div className="OurServices_chaild_img" OurServices_chaild_img>
                  <img
                    src={require("../../../Assets/Images/MissingPro.png")}
                  ></img>
                </div>
                <div className="OurServices_chaild_ptag">
                  Report Missing / Stolen Property
                </div>
              </div>
            </NavLink>

            {/* 4*/}
            <NavLink to={isAuth ? `/complaint/${userId}` : "/citizen-login"}>
              <div className="OurServices_chaild">
                <div className="OurServices_chaild_img" OurServices_chaild_img>
                  <img src={require("../../../Assets/Images/2.png")}></img>
                </div>
                <div className="OurServices_chaild_ptag">
                  eFIR(Vehicle / Mobile Theft)
                </div>
              </div>
            </NavLink>

            {/* 5 */}
            <NavLink to={isAuth ? `/complaint/${userId}` : "/citizen-login"}>
              <div className="OurServices_chaild">
                <div className="OurServices_chaild_img" OurServices_chaild_img>
                  <img src={require("../../../Assets/Images/block.png")}></img>
                </div>
                <div className="OurServices_chaild_ptag">
                  Block and Unblock Lost/Stolen Mo.
                </div>
              </div>
            </NavLink>
          </div>
        </div>
      </div>
      <Footer/>
      <ChatBoat />
    </>
  );
}

export default Ourservise;
