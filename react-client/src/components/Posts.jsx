import React, { useState, useEffect } from "react";

import Post from "./Post.jsx";
import dommyPosts from "../../../dammyData/data.js";
import axios from "axios";

// useEffect(() => {
// 	axios.get("/api/posts").then(({ data }) => {
// 		setPostsList(data);
// 	});
// });

const Posts = (props) => {
	const [postsList, setPostsList] = useState(dommyPosts);

	return (
		<div>
			{/* <h4> List of Posts </h4> */}
			<div className='postsContainer'>
				{postsList.map((post, i) => (
					<Post post={post} key={i} />
				))}
			</div>
		</div>
	);
};

export default Posts;
