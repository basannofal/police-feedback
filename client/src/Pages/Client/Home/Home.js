import React from 'react';
import '../../../Assets/css/home.css';
import Footer from '../../../Layout/Client/Footer';

function Home() {
    return (
        <>
            <div className='home_main'>
                <div className='home_img'>
                    <img src={require("../../../Assets/Images/rjpolice.jpg")} />
                </div>

                <div className='home_pg'>
                    <div className='home_space'>
                        <p>Rajasthan is divided into 2 police commissionerate, 7 police range each headed by an Inspector General of Police (IGP). The state is further divided into 40 districts (including 3 rural districts, 2 city districts in Jaipur City and 2 railway police districts), 171 circles, 709 police stations and 788 out-posts.<br /><br />

                            What is the structure of Police in Rajasthan?<br />
                            There are eight range offices in the State and Headed by Deputy Inspector of General of Police and Superintendent of Police level officer. Two ranges offices are situated at State Headquarter, Jaipur-I & Jaipur-II. Rest are situated at Ajmer, Bikaner, Bharatpur, Kota, Udapur and Jodhpur District Headquarters.
                        </p>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default Home