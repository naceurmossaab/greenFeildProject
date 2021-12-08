import React, { Component } from 'react';
import axios from 'axios';
import Announce from './Announce.jsx';
import Testimonial from './Testimonial.jsx';

export default class Home extends Component {
     constructor(props) {
          super(props);
          this.state = {
               feed: [],
               search: ""
          }
          this.search = this.search.bind(this);
     }

     search() {
          // console.log("search response : ", this.state.search);
          axios.post('/images/find', { owner: this.state.search })
               .then(({ data }) => {
                    console.log("search response : ", data);
                    this.setState({ images: data });
               })
               .catch((err) => console.log("Accueil => search error : ", err));
     }

     render() {
          return (
               <div className="accueil">

                    {/* search section */}
                    <div className="search">
                         <h3> Find Your New Home Here. Right Now ...</h3>
                         <div className="search-form">
                              <input value={this.state.search} onChange={(e) => this.setState({ search: e.target.value })} type="text" />
                              <button onClick={this.search}>Search</button>
                         </div>
                    </div>
                    <div id="search-result">
                         {this.state.feed.length !== 0 && <Feed feed={this.state.feed} />}
                    </div>
                    <div className="last-annouces">
                         <h3>Latest Annouces added : </h3>
                         <div className="announces-container">
                              <Announce />
                              <Announce />
                              <Announce />
                         </div>
                    </div>
                    <div className="fixed-div"></div>
                    <div className="informations">
                         <div className="safety-tips">
                              <img src="https://img.icons8.com/color/144/000000/unlock.png" />
                              <div>
                                   <h3>Safety Tips <img src="https://img.icons8.com/ios/15/000000/info--v4.png" /></h3>
                                   <p>Trust is the basis of successful exchanges.For this we recommend that you always use the chat and notify us of any inappropriate announcement or exchange.We are here for you !</p>
                              </div>
                         </div>
                         <Testimonial />
                    </div>
               </div>
          );
     }
}
