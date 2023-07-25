import React, { Component } from 'react';

class Resume extends Component {
  render() {
    if (this.props.data) {
      var skillmessage = this.props.data.skillmessage;
      var education = this.props.data.education.map(function (education) {
        return <div key={education.school}><h3>{education.school}</h3>
          <p className="info">{education.GPA} <span>&bull;</span><em className="date">{education.graduated}</em></p>
          <p>{education.description}</p></div>
      })
      var work = this.props.data.work.map(function (work) {
        return (
          <div key={work.company}>
            <h3>{work.company}</h3>
            <p>{work.techStack}</p>
            <div>
              {
                work.positions.map((position) => {
                  return (
                    <div key={`${work.company}_${position.title}`}> 
                      <p className="info">{position.title}<span>&bull;</span> <em className="date">{position.years}</em></p>
                      {position.description.map((bullet, idx) => {
                        return <p className="job-description" key={idx}>{`• ${bullet}`}</p>
                      })}
                      <br/>
                    </div>
                  )
                })
              }
            </div>
            <br/>
          </div>
        )
      })
      var skills = this.props.data.skills.map(function (skills) {
      var className = 'bar-expand ' + skills.name.toLowerCase();
        return <li key={skills.name}><span style={{ width: skills.level }} className={className}></span><em>{skills.name}</em></li>
      })
    }

    return (
      <section id="resume">

        <div className="row education">
          <div className="three columns header-col">
            <h1><span>Education</span></h1>
          </div>

          <div className="nine columns main-col">
            <div className="row item">
              <div className="twelve columns">
                {education}
              </div>
            </div>
          </div>
        </div>

        <div className="row work">

          <div className="three columns header-col">
            <h1><span>Work</span></h1>
          </div>

          <div className="nine columns main-col">
            {work}
          </div>
        </div>

        <div className="row skill">

          <div className="three columns header-col">
            <h1><span>Skills</span></h1>
          </div>

          <div className="nine columns main-col">

            <h5 className="half-bottom">
              {skillmessage}
            </h5>

            <div className="bars">
              <ul className="skills">
                {skills}
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Resume;
