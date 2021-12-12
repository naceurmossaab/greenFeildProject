import React, { useState } from "react";
import ReactDom from "react-dom";
import { Image } from "cloudinary-react";

// Dommy Post
const Post = (props) => {
	const [post, setPost] = useState(props.post);

	return (
		<div className='postCard'>
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

//Real Post

const Post_R = ({ post }) => {
	const [slideShow, setSlideShow] = useState(false);
	let modelStyle = {
		psition: "fixed",
		top: "50%",
		left: "50%",
		transform: "translate(-50%,-50%)",
		paddind: "50px",
		zIndex: 1000,
	};

	let overLayStyle = {
		position: "fixed",
		rop: 0,
		left: 0,
		right: 0,
		bottom: 0,
		bacjgroundColor: "rgba(0,0,0,.2)",
		zIndex: 1000,
	};
	return !slideShow ? (
		<div className='postCard'>
			<div className='postImg'>
				<div onClick={() => setSlideShow(true)}>
					<Image cloudName='geekitten' public_id={post.pictures[0]} />
				</div>
				<div onClick={() => setSlideShow(true)}>
					<Image cloudName='geekitten' public_id={post.pictures[1]} />
				</div>
				<div onClick={() => setSlideShow(true)}>
					<Image cloudName='geekitten' public_id={post.pictures[2]} />
				</div>
				<div onClick={() => setSlideShow(true)}>
					<Image cloudName='geekitten' public_id={post.pictures[3]} />
				</div>
			</div>
			<div className='postDetails'>
				<div>{post.address}</div>
				<div>{post.numberOfRooms}</div>
				<div>{post.price}</div>
			</div>
			<div className='postDiscription'>{post.discription}</div>
		</div>
	) : (
		ReactDom.createPortal(
			<div style={overLayStyle}>
				<div style={modelStyle}>
					<div>SlideShow</div>
					<button onClick={() => setSlideShow(false)}>Close</button>
				</div>
			</div>,
			document.getElementById("modele")
		)
	);
};

export default Post;
