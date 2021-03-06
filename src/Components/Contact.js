import React, { Component } from 'react';

class Contact extends Component {
   render() {

      if (this.props.data) {
         var name = this.props.data.name;
         var street = this.props.data.address.street;
         var city = this.props.data.address.city;
         var state = this.props.data.address.state;
         var zip = this.props.data.address.zip;
         var phone = this.props.data.phone;
         var email = this.props.data.email;
         var message = this.props.data.contactmessage;
      }

      return (
         <section id="contact">

            <div className="row section-head">
               <div className="two columns header-col">
                  <h1>Email</h1>
               </div>
               <div className="ten columns">
                  <h3 className="lead">{message}</h3>
               </div>
            </div>

            <div className="row">
               <div className="eight columns">

                  <form autoComplete="off" action="" method="post" id="contactForm" name="contactForm">
                     <fieldset>
                        <div>
                           <label htmlFor="contactName">Name <span className="required">*</span></label>
                           <input autofill="off" autoComplete="off" type="text" defaultValue="" size="35" id="contactName" name="contactName" onChange={this.handleChange} />
                        </div>

                        <div>
                           <label htmlFor="contactEmail">Email <span className="required">*</span></label>
                           <input autoComplete="off" type="text" defaultValue="" size="35" id="contactEmail" name="contactEmail" onChange={this.handleChange} />
                        </div>

                        <div>
                           <label htmlFor="contactSubject">Subject</label>
                           <input autoComplete="off" type="text" defaultValue="" size="35" id="contactSubject" name="contactSubject" onChange={this.handleChange} />
                        </div>

                        <div id="contact-message">
                           <label htmlFor="contactMessage">Message <span className="required">*</span></label>
                           <textarea autoComplete="off" cols="10" rows="5" id="contactMessage" name="contactMessage"></textarea>
                        </div>

                        <div id="submit-response">
                           <button className="submit">Submit</button>
                           <span id="image-loader">
                              <img alt="" src="images/loader.gif" />
                           </span>
                           <div id="message-warning"> There was an error, please try again.</div>
                           <div id="message-honeypot">
                              <i className="fa fa-check"></i> Please stop spamming me!.<br />
                           </div>
                           <div id="message-incomplete-fields">
                              <i className="fa fa-check"></i> Please fill in all required fields marked with an asterisk.<br />
                           </div>
                           <div id="message-invalid-email">
                              <i className="fa fa-check"></i> Please provide a valid email address.<br />
                           </div>
                        </div>

                        <div>
                           <label htmlFor="honeypot"></label>
                           <input autoComplete="off" type='text' defaultValue="" size="5" id="honeypot" name="honeypot" onChange={this.handleChange} />
                        </div>
                     </fieldset>
                  </form>

                  <div id="message-success">
                     <i className="fa fa-check"></i> Your message was sent, thank you!<br />
                  </div>
               </div>

               <aside className="four columns footer-widgets">
                  <div className="widget widget_contact">
                     <h4>Contact Info</h4>
                     <p className="address">
                        {name}<br />
                        {street} <br />
                        {city}, {state} {zip}<br />
                        <span>{phone}</span><br />
                        <span>{email}</span>
                     </p>
                  </div>
               </aside>
            </div>
         </section>
      );
   }
}

export default Contact;
