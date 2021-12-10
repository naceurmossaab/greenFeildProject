import axios from "axios";
import React, { useState } from "react";
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
		</div>
	);
};

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
			<Image cloudName='geekitten' public_id='kbtpnsfb2vkmzbskbp1n' />
		</div>
	</div>
);

const AddPostOwner = (props) => {
	const [adresse, setadresse] = useState("");
	const [numberOfRooms, setnumberOfRooms] = useState("");
	const [price, setprice] = useState("");
	const [description, setdescription] = useState("");
	const [pics, setpics] = useState([]);
	const uploadeImage = async (file, acc) => {
		const formData = new FormData();
		formData.append("file", file);
		formData.append("upload_preset", "rgofaujc");
		let data = await axios.post(
			"http://api.cloudinary.com/v1_1/geekitten/image/upload",
			formData
		);
		// .then(({ data }) => acc.push(data.public_id))
		// .catch((err) => console.log(err));
		console.log(data.data.public_id);
		acc.push(data.data.public_id);
	};
	const handelSubmit = () => {
		console.log(pics);
		let image_id = [];
		for (let i = 0; i < pics.length; i++) {
			uploadeImage(pics[i], image_id);
		}
		let post = {
			userId: props.user._id,
			address: adresse,
			numberOfRooms: numberOfRooms,
			price: price,
			description: description,
			pictures: image_id,
		};
		console.log(image_id[0]);
		// axios
		// 	.post("/api/addOwnerPost", post)
		// 	.then(({ data }) => console.log(data))
		// 	.cath((err) => console.log(err));
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
				onChange={(e) => setpics([...pics, e.target.files[0]])}
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
