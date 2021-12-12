
import axios from "axios";
import React, { useState } from "react";
import ReactDom from "react-dom";

import { Image } from "cloudinary-react";

const User = (props) => {
	let userInput =
		props.user.categorie === "owner" ? (
			<AddPostOwner user={props.user} />
		) : (
			<AddPostRenter user={props.user} />
		);
	return (
		<div className='userProfileContainer'>
			<UserPofile user={props.user} />
			{userInput}
			{/* user Posts List with delete and update options  */}
			<Post_R post={post} />
		</div>
	);
};

///////////////////// post popUptest //////////////

//******** */
let post = {
	numberOfRooms: "S+2",
	discription:
		"Situé à Tunis, à 1 km de la plage de Salambo, l'établissement Un emplacement exceptionnel propose un hébergement avec un jardin, une connexion Wi-Fi gratuite, une réception ouverte 24h/24 et un distributeur automatique de billets. Construit en 2019, il propose des hébergements climatisés avec balcon.",
	address: "Salambo,",
	price: "700 TND per monthe",
	pictures: [
		"https://cf.bstatic.com/xdata/images/hotel/max1024x768/270789232.jpg?k=106782d5133e377d68fee52d689e2f938d945f91a096cec1bfafaf1435759e6f&o=&hp=1",
		"https://cf.bstatic.com/xdata/images/hotel/max1024x768/270789963.jpg?k=bdaa848b3fba38f5b7706de68a130e5b829fce7ba001c0d98ece349751839b89&o=&hp=1",
		"https://cf.bstatic.com/xdata/images/hotel/max1280x900/270789227.jpg?k=776ed179df7d34802e71ca86fe174e8f120d021eace26891b67673a8a2f40ebb&o=&hp=1",
		"https://cf.bstatic.com/xdata/images/hotel/max1024x768/270789242.jpg?k=53bea9785875259eeff089701295534ab0f948b48616a085ff90a7f4f7758022&o=&hp=1",
	],
};
//////***** */
const Post_R = ({ post }) => {
	const [slideShow, setSlideShow] = useState(false);
	let modelStyle = {
		psition: "fixed",
		top: "50%",
		left: "50%",
		transform: "translate(-50%,-50%)",
		paddind: "50px",
		zIndex: 1000,
		border: "solid",
		backgroundColor: "rgba(0,0,0,.2)",
	};

	let overLayStyle = {
		position: "fixed",
		rop: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: "rgba(0,0,0,.2)",
		zIndex: 1000,
	};
	return !slideShow ? (
		<div className='postCard'>
			<div className='postImg'>
				<div onClick={() => setSlideShow(true)}>
					<img src={post.pictures[0]} />
				</div>
				<div onClick={() => setSlideShow(true)}>
					<img src={post.pictures[1]} />
				</div>
				<div onClick={() => setSlideShow(true)}>
					<img src={post.pictures[2]} />
				</div>
				<div onClick={() => setSlideShow(true)}>
					<img src={post.pictures[3]} />
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
			<div style={modelStyle}>
				<div>
					<h1>SlideShow</h1>
					<button onClick={() => setSlideShow(false)}>Close</button>
				</div>
			</div>,
			document.getElementById("modele")
		)
	);
};
////////////////////////////////////////:::::::::::

const UserPofile = ({ user }) => (
	<div className='profile'>
		<img src={user.image} className='userProfilPic' />
		<div className='userDetails'>
			<div>{user.userName}</div>
			<div>
				<span>Phone Number </span>
				{user.phoneNumber}
			</div>
			<div>Email {user.email}</div>
		</div>
	</div>
);

const AddPostOwner = (props) => {
	const [adresse, setadresse] = useState("");
	const [numberOfRooms, setnumberOfRooms] = useState("");
	const [price, setprice] = useState("");
	const [description, setdescription] = useState("");
	const [pics, setpics] = useState([]);
	const uploadeImage = (file) => {
		const formData = new FormData();
		formData.append("file", file);
		formData.append("upload_preset", "rgofaujc");
		return axios.post(
			"http://api.cloudinary.com/v1_1/geekitten/image/upload",
			formData
		);
		// .then(({ data }) => acc.push(data.public_id))
		// .catch((err) => console.log(err));
		// console.log(data.data.public_id);
		// acc.push(data.data.public_id);
	};
	const handelSubmit = () => {
		console.log("piiiiiiccsssss", pics[0]);
		let image_id = [];
		for (let i = 0; i < pics.length; i++) {
			image_id.push(uploadeImage(pics[i]));
		}
		let imagesCloudineryIds = [];
		Promise.all(image_id)
			.then((result) => {
				imagesCloudineryIds = result.map((elem) => elem.data.public_id);
			})
			.then(() => {
				let post = {
					userId: props.user._id,
					address: adresse,
					numberOfRooms: numberOfRooms,
					price: price,
					description: description,
					pictures: imagesCloudineryIds,
				};
				console.log(post);
				// axios
				// 	.post("/api/addOwnerPost", post)
				// 	.then(({ data }) => console.log(data))
				// 	.cath((err) => console.log(err));
			})
			.catch((err) => console.log(err));
	};
	return (
		<div className='inputContainer'>
			<input type='text' onChange={(e) => setadresse(e.target.value)} />
			<input
				type='text'
				onChange={(e) => setnumberOfRooms(e.target.value)}
			/>
			<input type='text' onChange={(e) => setprice(e.target.value)} />
			<textarea
				cols='30'
				rows='10'
				onChange={(e) => setdescription(e.target.value)}
			></textarea>
			<input
				type='file'
				multiple
				onChange={(e) => setpics(e.target.files)}
			/>
			<button onClick={handelSubmit}>Submit</button>
		</div>
	);
};

const AddPostRenter = (props) => {
	const [title, settitle] = useState("");
	const [body, setbody] = useState("");
	const handelSubmit = () => {
		let post = { userId: props.user._id, title: title, body: body };
		console.log(post);
		// axios
		// 	.post("/api/addRenterPost", post)
		// 	.then(({ data }) => console.log(data))
		// 	.cath((err) => console.log(err));
	};
	return (
		<div className='inputContainer'>
			<input type='text' onChange={(e) => settitle(e.target.value)} />
			<textarea
				cols='30'
				rows='10'
				onChange={(e) => setbody(e.target.value)}
			></textarea>
			<button onClick={handelSubmit}>Submit</button>
		</div>
	);
};
export default User;

