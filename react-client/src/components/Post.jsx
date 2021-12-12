import React, { useState } from "react";
import ReactDom from "react-dom";
import { Image } from "cloudinary-react";

const Post = ({ post }) => {
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
			<div className='model-style'>
				<div>
					<span
						className='model-close'
						onClick={() => setSlideShow(false)}
					>
						<img src='https://cdn-icons.flaticon.com/png/512/1620/premium/1620739.png?token=exp=1639333638~hmac=f6f61bde2ec464d042b351ab4554892e' />
					</span>
					{/* <button onClick={() => setSlideShow(false)}>Close</button> */}
					<SlidePics pictures={post.pictures} />
				</div>
			</div>,
			document.getElementById("modele")
		)
	);
};

const SlidePics = ({ pictures }) => {
	const [currentPic, setCurrentPic] = useState(0);
	return (
		<div>
			<span
				className='arrow'
				onClick={() => {
					if (currentPic > 0) setCurrentPic(currentPic - 1);
				}}
			>
				<img
					style={{ height: "40px", width: "40px" }}
					src='https://cdn-icons.flaticon.com/png/512/2609/premium/2609370.png?token=exp=1639326370~hmac=50efb7ccdf6c884dc45c517e769d6390'
				/>
			</span>
			<img
				style={{ height: "800px", width: "1000px" }}
				src={pictures[currentPic]}
			/>
			<span className='currentPic-index'>
				{currentPic + 1 + "/" + pictures.length}
			</span>
			<span
				className='arrow arrow-right'
				onClick={() => {
					if (currentPic < pictures.length - 1)
						setCurrentPic(currentPic + 1);
				}}
			>
				<img
					style={{ height: "40px", width: "40px" }}
					src='https://cdn-icons-png.flaticon.com/512/318/318476.png'
				/>
			</span>
		</div>
	);
};

export default Post;
