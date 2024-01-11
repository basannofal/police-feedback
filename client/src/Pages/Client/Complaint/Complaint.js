import React from 'react';
import '../../../Assets/css/complaint.css';

const Complaint = () => {
    return (
        <>
            <div className="container secActive">
                <header>Complaint Form</header>

                <form>
                    <div className="form first">
                        <div class="details personal">
                            <span class="title">Personal Details</span>

                            <div class="fields">
                                <div class="input-field">
                                    <label>First Name</label>F
                                    <input type="text" placeholder="Enter First name" />
                                </div>

                                <div class="input-field">
                                    <label>Middle Name</label>
                                    <input type="text" placeholder="Enter Middle name" />
                                </div>

                                <div class="input-field">
                                    <label>Last Name</label>
                                    <input type="text" placeholder="Enter Last name" />
                                </div>

                                <div class="input-field">
                                    <label>Email</label>
                                    <input type="text" placeholder="Enter your email" />
                                </div>

                                <div class="input-field">
                                    <label>Mobile Number</label>
                                    <input type="number" placeholder="Enter mobile number" />
                                </div>

                                <div class="input-field">
                                    <label>Present Address</label>
                                    <input type="text" placeholder="Enter Present Address" />
                                </div>

                                <div class="input-field">
                                    <label>Pin Code</label>
                                    <input type="number" placeholder="Enter Pin Code" />
                                </div>
                            </div>
                        </div>

                        <div className="details ID">
                            <span class="title">Stolen Details</span>

                            <div class="fields">
                                <div class="input-field">
                                    <label>Item Name</label>
                                    <input type="text" placeholder="Enter Item name" />
                                </div>

                                <div class="input-field">
                                    <label>Item Description</label>
                                    <textarea type="text" placeholder="Enter Item Description" />
                                </div>
                                <div class="input_image">
                                    <label>Item Images</label>
                                    <input className='' type="file" />
                                </div>
                                <button class="sumbit">
                                    <span class="btnText">Submit</span>
                                    <i class="uil uil-navigator"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Complaint
