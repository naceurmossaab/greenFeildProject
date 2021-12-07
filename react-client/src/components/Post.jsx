import React, { useState } from "react";

const Post = (props) => {
	const [post, setPost] = useState(props.post);
	return (
		<div className="postCard">
			<div className='postImg'>
				<img src={post.pics[0]} />
				<img src={post.pics[1]} />
				<img src={post.pics[2]} />
				<img src={post.pics[3]} />
			</div>
			<div className='postDetails'>
				<div>{post.address}</div>
				<div>{post.numberOfRooms}</div>
				<div>{post.price}</div>
			</div>
			<div className='postDiscription'>{post.discription}</div>
		</div>
	);
};

export default Post;
