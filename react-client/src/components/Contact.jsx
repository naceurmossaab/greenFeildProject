import React, {Component} from 'react';
import axios from 'axios';

export default class Contact extends Component{
     constructor(props){
          super(props);
          this.state = {
               name   : "",
               email  : "",
               message: "",
               status : ""
          }
          this.send = this.send.bind(this);
     }

     send(){
          console.log("contact ", this.state);
          axios.post('/contact', this.state)
               .then(({ data }) => {
                    this.setState({
                         name   : "",
                         email  : "",
                         message: "",
                         status : "Message Sended ..."
                    })
               })
               .catch((err) => console.log("Contact => send error : ", err));
     }

     render(){
          return (
          <div className="contact-container">
               <div className="contact">
                    <input className="name-input" value={this.state.name} onChange={(e) =>this.setState({name: e.target.value})} placeholder="name" type="text"  />
                    <input className="email-input" value={this.state.email} onChange={(e)=>this.setState({email:e.target.value})} placeholder="email" type="text" />
                    <textarea value={this.state.message} onChange={(e)=>this.setState({message:e.target.value})} placeholder="your message here ..." cols="30" rows="10">                    </textarea>
                    <div><button onClick={this.send}> Send </button> <span style={{fontSize:'20px', color:'green'}}>{this.state.status}</span> </div>
               </div>
               <div className="right-div"></div>
          </div>
          );
     } 
}