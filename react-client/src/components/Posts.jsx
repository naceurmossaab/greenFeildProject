import React, { useState, useEffect } from "react";

import Post from "./Post.jsx";
import dommyPosts from "../../../dammyData/data.js";
import axios from "axios";

// useEffect(() => {
// 	axios.get("/api/ownerposts").then(({ data }) => {
// 		setPostsList(data);
// 	});
// });

const Posts = (props) => {
	const [postsList, setPostsList] = useState(dommyPosts);

	return (
		<div>
<<<<<<< HEAD
			{/* <h4> List of Posts </h4> */}
=======
>>>>>>> fc26d1e693fe3fb767163de7319285455f1154b4
			<div className='announces-container'>
				{postsList.map((post, i) => (
					<Post post={post} key={i} />
				))}
			</div>
		</div>
	);
};

export default Posts;
