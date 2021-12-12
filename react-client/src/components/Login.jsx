import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [view, setView] = useState("signin");
    const [signup, setSignup] = useState({
        username: "",
        name: "",
        type: "",
        email: "",
        password: "",
        status: ""
    });
    const [signin, setSignin] = useState({
        username: "",
        password: "",
        status: ""
    });

    const changeSignUp = (e) => {
        let key = e.target.name;
        let value = e.target.value;
        let obj = signup;
        obj[key] = value;
        setSignup(obj);
    }

    const changeSignIn = (e) => {
        let key = e.target.name;
        let value = e.target.value;
        let obj = signin;
        obj[key] = value;
        setSignin(obj);
    }

    const signupFN = () => {
        console.log("signup ", signup);
        axios.post('/auth/signup', signup)
            .then(({ data }) => {
                setSignup({
                    username: "",
                    name: "",
                    email: "",
                    password: "",
                    status: data
                    //reset the signup state
                    //status : data => "username already exist" - "account created" 
                })
            })
            .catch((err) => console.log("Login Component => signup error : ", err));
    }

    const signinFN = () => {
        console.log("signin ", signin);
        axios.post('/auth/signin', signin)
            .then(({ data }) => {
                console.log("login response : ", data);
                // if (Array.isArray(data)) this.props.account(data[0]);
                // if there is an account pass this account to global state
                // else this.setState({ status2: data });
                //status : data => "username doesn't exist" - "wrrong username/password"
            })
            .catch((err) => console.log("Authentification => signin error : ", err));
    }

    return (
        <div className="login">
            <div className="left-div">
                <h1>Create an account</h1>
                <p>it's totally free and secure</p>
                <p>we don't share your </p>
                <p>informations with others</p>
            </div>
            {view === "signup" ?
                (<div className="contact">
                    <h3>Sign Up</h3>
                    <span>Have an account ? <span className="cursor-pointer" onClick={() => setView("signin")}><u>Sign In</u></span></span>
                    <input className="username-input" onChange={changeSignUp} name="username" placeholder="username" type="text" />
                    <input className="password-input" onChange={changeSignUp} name="password" placeholder="password" type="text" />
                    <input className="name-input" onChange={changeSignUp} name="name" placeholder="name" type="text" />
                    <input className="email-input" onChange={changeSignUp} name="email" placeholder="email" type="text" />
                    <input className="type-input" onChange={changeSignUp} name="type" placeholder="type" type="text" />
                    <div><button onClick={signupFN} > SignUp </button> <span style={{ fontSize: '20px', color: signup.status === 'username already exist' ? 'red' : 'green' }}>{signup.status}</span> </div>
                </div>)
                :
                (<div className="contact">
                    <h3>Sign In</h3>
                    <span>Don't have an account ? <span className="cursor-pointer" onClick={() => setView("signup")}><u>Sign Up</u></span></span>
                    <input className="username-input" onChange={changeSignIn} name="username" placeholder="username" type="text" />
                    <input className="password-input" onChange={changeSignIn} name="password" placeholder="password" type="password" />
                    <div><button onClick={signinFN} > SignIn </button> <span style={{ fontSize: '20px', color: 'red' }}>{signin.status}</span> </div>
                </div>)}

        </div>
    );
}

export default Login;
