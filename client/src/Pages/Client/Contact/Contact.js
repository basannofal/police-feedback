import React from 'react'
import '../../../Assets/css/Contact.css';


function Contact() {
    return (
        <>


            <div className='table_1'>
                <table border={2} >
                    <tbody>
                        <tr>
                            <th colSpan={3}>Helpline Number</th>
                        </tr>
                        <tr>
                            <th>Sr. No.</th>
                            <th>Helpline Number</th>
                            <th>Type of Helpline</th>
                        </tr>
                        <tr style={{ backgroundColor: "#ECECEC" }}>
                            <td style={{ textAlign: "center" }}>1</td>
                            <td >100</td>
                            <td>Police Helpline</td>
                        </tr>
                        <tr>
                            <td style={{ textAlign: "center" }}>2</td>
                            <td>108</td>
                            <td style={{ paddingRight: '2px' }}>Helpline for medical emergency</td>
                        </tr>
                        <tr style={{ backgroundColor: "#ECECEC" }}>
                            <td style={{ textAlign: "center" }}>3</td>
                            <td style={{ paddingRight: '100%' }}>181</td>
                            <td style={{ paddingRight: '200px' }}>Abhayam Women helpline</td>
                        </tr>


                    </tbody></table>
            </div>


            <div className='table_2'>

                <table border={2} className='table-2'>
                    <tbody>
                        <tr>
                            <th colSpan={5} >City/District e-mail ID</th>
                        </tr>

                        <tr>
                            <th>Sr. No.</th>
                            <th> Range/CP</th>
                            <th> City/District Name</th>
                            <th> e-mail ID</th>
                            <th> Contact Number </th>
                        </tr>
                        <tr style={{ backgroundColor: "#ECECEC" }}>
                            <td style={{ textAlign: "center" }}>1</td>
                            <th rowSpan={4}>C.P.</th>
                            <td>Ahmedabad City</td>
                            <td>cp-ahd@gujarat.gov.in</td>
                            <td>7925630100, 7925630500</td>

                        </tr>
                        <tr>
                            <td style={{ textAlign: "center" }}>2</td>
                            <td>Rajkot City</td>
                            <td>cp-raj@gujarat.gov.in</td>
                            <td>2812457777</td>
                        </tr>

                        <tr style={{ backgroundColor: "#ECECEC" }}>
                            <td style={{ textAlign: "center" }}>3</td>
                            <td>Surat City</td>
                            <td>cp-sur@gujarat.gov.in</td>
                            <td>2612241301, 2612241302</td>
                        </tr>
                        <tr>
                            <td style={{ textAlign: "center" }}>4</td>
                            <td>Vadodara City</td>
                            <td>cp-vad@gujarat.gov.in</td>
                            <td>2652415111, 2652411751</td>
                        </tr>
                        <tr style={{ backgroundColor: "#ECECEC" }}>
                            <td style={{ textAlign: "center" }}>5</td>
                            <th rowSpan={3} style={{ backgroundColor: "white" }}>Ahmedabad Range</th>
                            <td>Ahmedabad Rural</td>
                            <td>sp-ahd@gujarat.gov.in</td>
                            <td>7926891168, 7926891115</td>
                        </tr>
                        <tr>
                            <td style={{ textAlign: "center" }} >6</td>
                            <td>Anand</td>
                            <td>sp-and@gujarat.gov.in</td>
                            <td>2692261033, 2692264433</td>
                        </tr>
                        <tr style={{ backgroundColor: "#ECECEC" }}>
                            <td style={{ textAlign: "center" }}>7</td>
                            <td>Kheda</td>
                            <td>sp-khe@gujarat.gov.in</td>
                            <td>2682561800, 2682551750</td>
                        </tr>
                        <tr>
                            <td style={{ textAlign: "center" }}>8</td>
                            <th rowSpan={4} style={{ paddingRight: '10px', backgroundColor: "#ECECEC" }}>Gandhinagar Range</th>
                            <td>Arvalli</td>
                            <td>sp-arv@gujarat.gov.in</td>
                            <td>2774248777, 2774248666</td>
                        </tr>
                        <tr style={{ backgroundColor: "#ECECEC" }}>
                            <td style={{ textAlign: "center" }}>9</td>
                            <td>Gandhinagar</td>
                            <td>sp-gnr@gujarat.gov.in</td>
                            <td>7923210914, 7923210108</td>
                        </tr>
                        <tr>
                            <td style={{ textAlign: "center" }}>10</td>
                            <td>Mehsana</td>
                            <td>dsp-meh@gujarat.gov.in</td>
                            <td>2762222133, 2762222134</td>
                        </tr>
                        <tr style={{ backgroundColor: "#ECECEC" }}>
                            <td style={{ textAlign: "center" }}>11</td>
                            <td style={{ paddingRight: '95px' }}>Sabarkantha</td>
                            <td style={{ paddingRight: '130px' }}>sp-sab@gujarat.gov.in</td>
                            <td style={{ paddingRight: '180px' }}>2772241303, 2772247133</td>
                        </tr>
                    </tbody>
                </table>


            </div>

        </>
    )
}

export default Contact
