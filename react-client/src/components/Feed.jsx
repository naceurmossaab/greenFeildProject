import React, { useState, useEffect } from "react";
import Collapsible from "react-collapsible";
import feed from "../../../dammyData/feedDAta.js";
import axios from "axios";
import $ from "jquery";
import regions from "../../../dammyData/Regions.js";

export default function Feed(props) {
  const [feeds, setFeeds] = useState(feed);
  const [txt, setReply] = useState("");
  const[newpost,setpost]=useState({content:txt,user:props.user});
  const[userselectedpost,setselectedpost]=useState('')
  const [cities, setCities] = useState([]);
  const [Cities, setcities] = useState([]);

  useEffect(() => {
    axios.get("").then((res) => {
      console.log(res.data)
      // setFeeds(res.data);
    });

    axios.post("",newpost).then((res) => {
      console.log(res)
    });
    axios.post("",{newpost,userselectedpost}).then((res) => {
     console.log(res)
    });
  });

  function addPost() {
    $(".Post").toggle();
  }
  return (
    <div className="feed">
      <div className="creat-post">
        <div className="creat-post-head">
          <select
            id="state"
            onChange={(event) => setCities(regions[event.target.value].cities)}
          >
            <option>Select the state</option>
            {regions.map((region, index) => (
              <option id={region.state} value={index} key={index}>
                {region.state}
              </option>
            ))}
          </select>
          <select>
            <option>Select the city</option>
            {cities.map((city, index) => (
              <option value={city} key={index}>
                {city}
              </option>
            ))}
          </select>
          <button>Search</button>
          <button onClick={() => addPost()}>Create a post +</button>
        </div>
        <div className="Post creat-post-body" style={{ display: "none" }}>
            <div className="creat-post-body-contact">
              <select 
                id="state"
                onChange={(event) => setcities(regions[event.target.value].cities)}
                >
                <option>Select the state</option>
                {regions.map((region, index) => (
                  <option id={region.state} value={index} key={index}>
                    {region.state}
                  </option>
                ))}
              </select>
              <select>
                <option>Select the city</option>
                {Cities.map((city, index) => (
                  <option value={city} key={index}>
                    {city}
                  </option>
                ))}
              </select>
            </div>  
            <textarea
              className="create-body-textarea"
              placeholder="your post here.."
            ></textarea>
            <button >Post</button>
        </div>

      </div>
      {feeds.map((e, i) => (
        <div key={i} className="announce feed-content">
          <h3 className="feed-user"><img src="https://source.unsplash.com/30x30/?face" />{e.post.user}</h3>
          <p>{e.post.text}</p>
          <p>{e.post.createdAt}</p>
          
            <Collapsible trigger="Comment">
              <div className="comment-input">
                <input
                  onChange={(event) => setReply(event.value)}
                  defaultValue={"reply to " + e.post.user}
                ></input>
                <button >Post the comment</button>
              </div>
            </Collapsible>
            <Collapsible trigger="Replies">
              {e.replies.map((reply, index) => (
                <div className="replies-feed" key={index}>
                  <h5>{reply.user}</h5>
                  <p>{reply.text}</p>
                  <p>{reply.createdAt}</p>
                </div>
              ))}
            </Collapsible>
        </div>
      ))}
    </div>
  );
}
