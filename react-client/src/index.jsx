import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Home from './components/Home.jsx';
import Feed from './components/Feed.jsx';
// import Announces from './components/Announces.jsx';
import Contact from './components/Contact.jsx';
import Login from './components/Login.jsx';
import User from './components/User.jsx';
import Posts from './components/Posts.jsx';

const App = () =>{
	// this.state = {
	// 	view: 'home',
	// 	connect: false
	// }
	const [view, setView] = useState('home');
	const [connect, setConnect] = useState(false);

	const viewRender = () => {
		// console.log("view render : ", this.state.view);
		if (view === 'home') return <Home />
		else if (view === 'feed') return <Feed />
		else if (view === 'announces') return <Posts />
		else if (view === 'contact') return <Contact />
		else if (view === 'login' && !connect) return <Login />
		else return <User />
	}
	return (
		<div>

			{/* navbar section  */}
			<nav>

				<div className="logo" onClick={() => setView('home')}>
					House
				</div>

				<ul className="links">
					<li onClick={() => setView('home')}>Home</li>
					<li onClick={() => setView('feed')}>Feed</li>
					<li onClick={() => setView('announces')}>Annouces</li>
				</ul>

				<div className="right">
					<span onClick={() => setView('contact')}>Contact</span>
					<span onClick={() => setView('login')}>Login</span>
				</div>
			</nav>

			{/* container section */}
			<div className="container">
				{viewRender()}
			</div>

			{/* footer section  */}
		</div>);
}


ReactDOM.render(<App />, document.getElementById('app'));
