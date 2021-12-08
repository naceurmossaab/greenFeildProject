import React, { Component } from 'react';

export default class Testimonial extends Component {
     constructor() {
          super();
     }

     render() {
          return (
               <div className="testimonial">
                    <section id="slider-container">
                         <div id="testimonials">
                              <figure className="single-testimonial">
                                   <blockquote>
                                        <p>I found a good deal on House. I am satisfied with the servicel</p>
                                        <footer>
                                             <img src="https://source.unsplash.com/100x100/?human" alt="" />
                                             <cite>Joe Schmo</cite>
                                        </footer>
                                   </blockquote>
                                   <blockquote>
                                        <p>I found a good deal on House. I am satisfied with the service</p>
                                        <footer>
                                             <img src="https://source.unsplash.com/100x100/?human" alt="" />
                                             <cite>Joe Schmo</cite>
                                        </footer>
                                   </blockquote>
                                   <blockquote>
                                        <p>I found a good deal on House. I am satisfied with the service</p>
                                        <footer>
                                             <img src="https://source.unsplash.com/100x100/?human" alt="" />
                                             <cite>Joe Schmo</cite>
                                        </footer>
                                   </blockquote>
                              </figure>
                         </div>
                    </section>
               </div>
          )
     }
}