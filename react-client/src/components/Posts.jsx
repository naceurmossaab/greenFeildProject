import React, { useState } from "react";

import Post from "./Post.jsx";
import dommyPosts from "../../../dammyData/data.js";

const Posts = () => {
	const [postsList, setPostsList] = useState(dommyPosts);

	return (
		<div>
			<h4> List of Posts </h4>
			<div className='postsContainer'>
				{postsList.map((post, i) => (
					<Post post={post} key={i} />
				))}
			</div>
		</div>
	);
};

export default Posts;
