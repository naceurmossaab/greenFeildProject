import React, { useState } from "react";
import ReactDom from "react-dom";
import { Image } from "cloudinary-react";

// Dommy Post
const Post = (props) => {
	const [post, setPost] = useState(props.post);

	return (
		<div className="announce">
			<div className="title-announce">
				<div className="gallery">
					<div className="img"   ><img src={post.pics[0]} alt="" /> </div>
					<div className="others"><img src={post.pics[1]} alt="" /> </div>
					<div className="others"><img src={post.pics[2]} alt="" /> </div>
				</div>
				<div className="details">
					<span></span>
					<span> <b>Nacer Mossaab</b> </span>
					<span> <b>Location :</b> {post.address} </span>
					<span> <b>Rooms :</b> {post.numberOfRooms} </span>
					<span> <b>Price :</b> {post.price} tnd/month</span>
					<span> <b>Phone :</b> 96123456 </span>
					{/* <span> <b>Views :</b> 12 </span> */}
					<span> <button><img src="https://img.icons8.com/ios-filled/15/4a90e2/new-message.png" /> Contact</button> <button><img src="https://img.icons8.com/ios/15/26e07f/add-bookmark.png" />Add To List</button> </span>
				</div>
			</div>
			<div className="description">
				<b>Description :</b>
				{post.discription}
			</div>
		</div>
		// <div className="postCard">
		// 	<div className='postImg'>
		// 		<img src={post.pics[0]} />
		// 		<img src={post.pics[1]} />
		// 		<img src={post.pics[2]} />
		// 		<img src={post.pics[3]} />
		// 	</div>
		// 	<div className='postDetails'>
		// 		<div>{post.address}</div>
		// 		<div>{post.numberOfRooms}</div>
		// 		<div>{post.price}</div>
		// 	</div>
		// 	<div className='postDiscription'>{post.discription}</div>
		// </div>
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
