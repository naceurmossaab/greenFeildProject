import React from "react";
import ReactDOM from "react-dom";
import Posts from "./components/Posts.jsx";

const App = () => {
	return (
		<div>
			<h1>Posts List</h1>
			<Posts />
		</div>
	);
};

ReactDOM.render(<App />, document.getElementById("app"));
