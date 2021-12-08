import React, { Component } from 'react';

export default class Annouce extends Component {
     constructor() {
          super();
     }

     render() {
          return (
               <div className="announce">
                    <div className="title-announce">
                         <div className="gallery">
                              <div className="img"   ><img src="https://source.unsplash.com/150x100/" alt="" /> </div>
                              <div className="others"><img src="https://source.unsplash.com/75x60/" alt="" /> </div>
                              <div className="others"><img src="https://source.unsplash.com/75x60/" alt="" /> </div>
                         </div>
                         <div className="details">
                              <span></span>
                              <span> <b>Nacer Mossaab</b> </span>
                              <span> <b>Location :</b> ariana </span>
                              <span> <b>Price :</b> 900dt </span>
                              <span> <b>Phone :</b> 96123456 </span>
                              <span> <b>Views :</b> 12 </span>
                              <span> <button>Contact</button> <button>Add To List</button> </span>
                         </div>
                    </div>
                    <div className="description">
                         <b>Description :</b>
                         Félicitations pour nos clients qui achète les premiers
                         deux villas Ne rater pas l'occasion cher amis pour les
                         gens qui cherche la tranquillité A vendre une très une
                         belle villa moderne ...
                    </div>
               </div>
          )
     }
}