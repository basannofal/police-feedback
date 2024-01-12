import React from "react";
import "../../../Assets/css/Ourservice.css";

function Ourservise() {
    return (
        <div>
            <div className="OurServices">Our Services</div>
            <div className="ouer">
                <div className="OurServices_perent">

                    {/* 1 */}
                    <div className="OurServices_chaild">
                        <div className="OurServices_chaild_img" OurServices_chaild_img>
                            <img src={require("../../../Assets/Images/Fir.png")}></img>
                        </div>
                        <div className="OurServices_chaild_ptag">Get a Copy of FIR</div>
                    </div>
                    {/* 2*/}

                    <div className="OurServices_chaild">
                        <div className="OurServices_chaild_img" OurServices_chaild_img>
                            <img src={require("../../../Assets/Images/Eapplication.png")}></img>
                        </div>
                        <div className="OurServices_chaild_ptag">e-Application</div>
                    </div>

                    {/* 3 */}

                    <div className="OurServices_chaild">
                        <div className="OurServices_chaild_img" OurServices_chaild_img>
                            <img src={require("../../../Assets/Images/MissingPro.png")}></img>
                        </div>
                        <div className="OurServices_chaild_ptag">Report Missing / Stolen Property</div>
                    </div>

                    {/* 4*/}

                    <div className="OurServices_chaild">
                        <div className="OurServices_chaild_img" OurServices_chaild_img>
                            <img src={require("../../../Assets/Images/2.png")}></img>
                        </div>
                        <div className="OurServices_chaild_ptag">eFIR(Vehicle / Mobile Theft)</div>
                    </div>

                    {/* 5 */}

                    <div className="OurServices_chaild">
                        <div className="OurServices_chaild_img" OurServices_chaild_img>
                            <img src={require("../../../Assets/Images/block.png")}></img>
                        </div>
                        <div className="OurServices_chaild_ptag">Block and Unblock Lost/Stolen Mo.</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Ourservise;
