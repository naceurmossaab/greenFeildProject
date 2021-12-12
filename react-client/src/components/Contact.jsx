import React, {Component, useState} from 'react';
import axios from 'axios';

const Contact = () =>{
     const [contact, setContact] = useState({
          name   : "",
          email  : "",
          message: "",
          status : ""
     });

     const change = (e) =>{
          let key = e.target.name;
          let value = e.target.value;
          let obj = contact;
          obj[key] = value;
          setContact(obj);
     }

     const send = () =>{
          console.log("contact ", contact);
          axios.post('/contact', contact)
               .then(({ data }) => {
                    this.setContact({
                         name: "",
                         email: "",
                         message: "",
                         status: "Message Sended ..."
                    })
               })
               .catch((err) => console.log("Contact => send error : ", err));
     }

     return (
          <div className="contact-container">
               <div className="contact">
                    <input className="name-input"  onChange={change} name="name"  placeholder="name"  type="text"  />
                    <input className="email-input" onChange={change} name="email" placeholder="email" type="text" />
                    <textarea onChange={change} name="message" placeholder="your message here ..." cols="30" rows="10">
                    </textarea>
                    <div><button onClick={send}> Send </button> <span style={{fontSize:'20px', color:'green'}}>{contact.status}</span> </div>
               </div>
               <div className="right-div"></div>
          </div>
          );
}

export default Contact;