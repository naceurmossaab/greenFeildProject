import React, { Component } from 'react';
import axios from 'axios';

export default class Login extends Component {
     constructor(props) {
          super(props);
          this.state = {
               view: "signin",
               username: "",
               name: "",
               email: "",
               password: "",
               status: "",
               login: "",
               pwd: "",
               status2: ""
          }
          this.signup = this.signup.bind(this);
          this.signin = this.signin.bind(this);
     }

     signup() {
          // console.log("signup ", this.state);
          axios.post('/signup', this.state)
               .then(({ data }) => {
                    this.setState({
                         username: "",
                         name: "",
                         email: "",
                         password: "",
                         status: data

                    })
               })
               .catch((err) => console.log("Authentification => signup error : ", err));
     }

     signin() {
          // console.log("signin ", this.state);
          axios.post('/signin', this.state)
               .then(({ data }) => {
                    console.log("login response : ", data);
                    if (Array.isArray(data)) this.props.account(data[0]);
                    else this.setState({ status2: data });
               })
               .catch((err) => console.log("Authentification => signin error : ", err));
     }

     render() {
          var color = this.state.status === 'username already exist' ? 'red' : 'green';
          return (
          <div className="login">
               <div className="left-div">
                    <h1>Create an account</h1>
                    <p>it's totally free and secure</p>
                    <p>we don't share your </p>
                    <p>informations with others</p>
               </div>
               {this.state.view === "signup" ? 
               (<div className="contact">
                    <h3>Sign Up</h3>
                         <span>Have an account ? <span className="cursor-pointer" onClick={() => this.setState({ view: "signin" })}><u>Sign In</u></span></span>
                    <input className="username-input" value={this.state.username} onChange={(e) => this.setState({ username: e.target.value })} placeholder="username" type="text" />
                    <input className="name-input" value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} placeholder="name" type="text" />
                    <input className="email-input" value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} placeholder="email" type="text" />
                    <input className="type-input" value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} placeholder="type" type="text" />
                    <input className="password-input" value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} placeholder="password" type="text" />
                    <div><button onClick={this.signup}> SignUp </button> <span style={{ fontSize: '20px', color: color }}>{this.state.status}</span> </div>
               </div>)
               :
               (<div className="contact">
                    <h3>Sign In</h3>
                         <span>Don't have an account ? <span className="cursor-pointer" onClick={() => this.setState({ view: "signup" })}><u>Sign Up</u></span></span>
                    <input className="username-input" value={this.state.login} onChange={(e) => this.setState({ login: e.target.value })} placeholder="username" type="text" />
                    <input className="password-input" value={this.state.pwd} onChange={(e) => this.setState({ pwd: e.target.value })} placeholder="password" type="password" />
                    <div><button onClick={this.signin}> SignIn </button> <span style={{ fontSize: '20px', color: 'red' }}>{this.state.status2}</span> </div>
               </div>) }

          </div>
          );
     }
}
