import React, { Component } from 'react';
import { AWS_ACCESS_KEY, AWS_SECRET_KEY, AWS_REGION } from '../secrets.js';
const AWS = require('aws-sdk');
AWS.config.update({accessKeyId: AWS_ACCESS_KEY, secretAccessKey: AWS_SECRET_KEY, region: AWS_REGION});

class About extends Component {
    downloadResume () {
        const s3 = new AWS.S3();
        const params = {
            Bucket:'howsthisforunique',
            Key: 'resume.pdf'
        };
        s3.getObject(params, (err, data, ) => {
            const blob = new Blob([data.Body], {type: data.ContentType});
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = 'Thanh_Lai_Resume';
            link.click();
        });
    }

   render() {

      if (this.props.data) {
         var name = this.props.data.name;
         var profilepic = "images/" + this.props.data.image;
         var bio = this.props.data.bio;
         var city = this.props.data.address.city;
         var state = this.props.data.address.state;
         var phone = this.props.data.phone;
         var email = this.props.data.email;
      }

      return (
         <section id="about">
            <div className="row">
               <div className="three columns">
                  <img className="profile-pic" src={profilepic} alt="Profile Pic" />
               </div>
               <div className="nine columns main-col">
                  <h2>About Me</h2>
                  <p>{bio}</p>
                  <div className="row">
                     <div className="columns contact-details">
                        <h2>Contact Info</h2>
                        <p className="address">
                           <span>{name}</span><br />
                           <span>
                              {city}, {state}
                           </span><br />
                           <span>{phone}</span><br />
                           <span>{email}</span>
                        </p>
                     </div>
                     <div className="columns download">
                        <p>
                           <button
                            onClick={this.downloadResume}
                            id="download-resume"
                            className="button"
                           >
                               <i className="fa fa-download"></i>
                               Download Resume
                            </button>
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         </section>
      );
   }
}

export default About;
