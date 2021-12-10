import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Home from "./components/Home.jsx";
import Feed from "./components/Feed.jsx";
import Announces from "./components/Announces.jsx";
import Contact from "./components/Contact.jsx";
import Login from "./components/Login.jsx";
import User from "./components/User.jsx";
import Posts from "./components/Posts.jsx";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			view: "user",
			connect: false,
		};
		this.setView = this.setView.bind(this);
	}

	setView() {
		let user = {
			userName: "Khalil Hmazaoui",
			phoneNumber: 22556688,
			email: "khalil_hamzaoui.gmail.com",
			_id: "1516845168135",
			categorie: "owner",
			image: "https://images.unsplash.com/photo-1581599129568-e33151627628?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
		};
		var { view } = this.state;
		// console.log("view render : ", this.state.view);
		if (view === "home") return <Home />;
		else if (view === "feed") return <Feed />;
		else if (view === "annouces") return <Posts />;
		else if (view === "contact") return <Contact />;
		else if (view === "login" && !this.state.connect) return <Login />;
		else return <User user={user} />;
	}

	componentDidMount() {
		axios
			.get("/images")
			.then((res) => this.setState({ images: res.data }))
			.catch((err) =>
				console.log(" App => componentDidMount images error : ", err)
			);

		axios
			.get("/videos")
			.then((res) => this.setState({ videos: res.data }))
			.catch((err) =>
				console.log(" App => componentDidMount videos error : ", err)
			);
	}

	render() {
		return (
			<div>
				{/* navbar section  */}
				<nav>
					<div
						className='logo'
						onClick={() => this.setState({ view: "home" })}
					>
						House
					</div>

					<ul className='links'>
						<li onClick={() => this.setState({ view: "home" })}>
							Home
						</li>
						<li onClick={() => this.setState({ view: "feed" })}>
							Feed
						</li>
						<li onClick={() => this.setState({ view: "annouces" })}>
							Annouces
						</li>
					</ul>

					<div className='right'>
						<span
							onClick={() => this.setState({ view: "contact" })}
						>
							Contact
						</span>
						<span onClick={() => this.setState({ view: "login" })}>
							Login
						</span>
					</div>
				</nav>

				{/* container section */}
				<div className='container'>{this.setView()}</div>

				{/* footer section  */}
			</div>
		);
	}
}

// const Nav = () => (
// 	<nav>
// 		<div>House</div>
// 		<ul className='links'>
// 			<Link to='/home'>
// 				<li>Home</li>
// 			</Link>
// 			<Link to='/feed'>
// 				<li>Feed</li>
// 			</Link>
// 			<Link to='/posts'>
// 				<li>Annouces</li>
// 			</Link>
// 		</ul>
// 		<div className='right'>
// 			<Link to='/contact'>
// 				<span>Contact</span>
// 			</Link>
// 			<Link to='/login'>
// 				<span>Login</span>
// 			</Link>
// 		</div>
// 	</nav>
// );

// const App = () => {
// 	return (
// 		<Router>
// 			<Nav />
// 			<Routes>
// 				<Switch>
// 					<Route path='/home' Component={Home} />
// 					<Route path='/feed' Component={Feed} />
// 					<Route path='/posts' Component={Posts} />
// 					<Route path='/contact' Component={Contact} />
// 					<Route path='/login' Component={Login} />
// 				</Switch>
// 			</Routes>
// 		</Router>
// 	);
// };

ReactDOM.render(<App />, document.getElementById("app"));
