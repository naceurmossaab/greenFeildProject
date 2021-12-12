import React, { useState, useEffect } from "react";
import Collapsible from "react-collapsible";
import feed from "../../../dammyData/feedDAta.js";
import axios from "axios";
import $ from "jquery";
import regions from '../../../dammyData/Regions.js';
export default function Feed() {
  const [feeds, setFeeds] = useState(feed);
  const [txt, setReply] = useState("");
  const [cities, setCities] = useState([])

  // useEffect(() => {
  //   axios.get("/feeds").then((res) => {
  //     setFeeds(res.data);
  //   });
  // });
  function addPost() {
    $(".Post").toggle();
  }
  function writeReply() {
    $(".show").toggle();
  }

  return (
    <div className="feed">
      {/* post in feed */}
      <div className="creat-post">
        <div className="creat-post-head">
          <select id='state' onChange={(event) => setCities(regions[$('#state').val()].cities)}>
            <option value='...' >...</option>
            {regions.map((region, index) => (
              <option id={region.state} value={index} key={index}>{region.state}</option>
              ))
            }
          </select>
          <select >
            {cities.map((city, index) => (
              <option value={city} key={index}>{city}</option>
              ))
            }
          </select>
          <button onClick={() => addPost()}>Create a post +</button>
        </div>

        <div className="creat-post-body contact">
          <div className="Post" style={{ display: "none" }}>
            <input className="adresse-input" placeholder="region"></input>
            <textarea className="create-body-textarea" placeholder="your post here..">
            </textarea>
            <button>Post</button>
          </div>
        </div>  
      </div>
      {/* feed posts */}
      <div className="feed-container">

        {feeds.map((e, i) => (
          <div key={i}>
            <h3>{e.post.user}</h3>
            <p>{e.post.text}</p>
            <p>{e.post.createdAt}</p>
            <button onClick={() => writeReply()}>Comment</button>
            <div className="show" style={{ display: "none" }}>
              <input
                onChange={(event) => setReply(event.value)}
                defaultValue={"reply to " + e.post.user}
              ></input>
              <button>Post the comment</button>
            </div>
            <Collapsible trigger="Replies">
              {e.replies.map((reply, index) => (
                <div key={index}>
                  <h3>{reply.user}</h3>
                  <p>{reply.text}</p>
                  <p>{reply.createdAt}</p>
                </div>
              ))}
            </Collapsible>
          </div>
        ))}
      </div>
    </div>
  );
}
