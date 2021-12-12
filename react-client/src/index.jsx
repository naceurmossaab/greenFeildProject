import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Home from "./components/Home.jsx";
import Feed from "./components/Feed.jsx";
import Announces from "./components/Announces.jsx";
import Contact from "./components/Contact.jsx";
import Login from "./components/Login.jsx";
import User from "./components/User.jsx";

// prettier-ignore
class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			view: 'home',
			connect: false
		}
		this.setView = this.setView.bind(this);
	}

	setView() {
		var { view } = this.state;
		// console.log("view render : ", this.state.view);
		if (view === 'home') return <Home />
		else if (view === 'feed') return <Feed />
		else if (view === 'annouces') return <Announces />
		else if (view === 'contact') return <Contact />
		else if (view === 'login' && !this.state.connect) return <Login />
		else return <User />
	}

	componentDidMount() {
		axios.get('/images')
			.then((res) => this.setState({ images: res.data }))
			.catch((err) => console.log(" App => componentDidMount images error : ", err));

		axios.get('/videos')
			.then((res) => this.setState({ videos: res.data }))
			.catch((err) => console.log(" App => componentDidMount videos error : ", err));
	}

	render() {
		return (
			<div>

				{/* navbar section  */}
				<nav>

					<div className="logo" onClick={() => this.setState({ view: 'home' })}>
						House
					</div>

					<ul className="links">
						<li onClick={() => this.setState({ view: 'home' })}>Home</li>
						<li onClick={() => this.setState({ view: 'feed' })}>Feed</li>
						<li onClick={() => this.setState({ view: 'annouces' })}>Annouces</li>
					</ul>

					<div className="right">
						<span onClick={() => this.setState({ view: 'contact' })}>Contact</span>
						<span onClick={() => this.setState({ view: 'login' })}>Login</span>
					</div>
				</nav>

				{/* container section */}
				<div className="container">
					{this.setView()}
				</div>

				{/* footer section  */}
			</div>);
	}
}

ReactDOM.render(<App />, document.getElementById("app"));
