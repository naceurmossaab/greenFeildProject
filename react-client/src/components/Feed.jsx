
import React, { useState, useEffect } from 'react';
import Collapsible from "react-collapsible";
import feed from "../../../dammyData/feedDAta.js";

export default function Feed  () {
     const [feeds, setFeeds] = useState(feed);



    return (
      <div>
        {feed.map((e, i) => (
          <div key={i}>
            <h3>{e.post.user}</h3>
            <p>{e.post.text}</p>
            <p>{e.post.createdAt}</p>
            <input   defaultValue= {"reply to " +e.post.user}></input>
               <button >Reply</button>
            <Collapsible trigger="Replies" >
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
    );
  
}
