import React, { useState } from "react";

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

export default Post;
