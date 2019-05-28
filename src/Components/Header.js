import React, { Component } from 'react';

class Header extends Component {
   constructor(props) {
      super(props)
      this.state = {
        facebook: false,
        twitter: false,
        linkedin: false,
        instagram: false,
        github: false
      }
      this.toggleHover = this.toggleHover.bind(this);
    }
  
    toggleHover(event) {
      let elem = event.target.id;
      switch (elem) {
        case 'facebook':
          this.setState({ facebook: !this.state.facebook });
          return
        case 'twitter':
          this.setState({ twitter: !this.state.twitter });
          return
        case 'linkedin':
          this.setState({ linkedin: !this.state.linkedin });
          return
        case 'instagram':
          this.setState({ instagram: !this.state.instagram });
          return
        default:
          this.setState({ github: !this.state.github });
          return
      }
    }
  render() {

    if(this.props.data){
      var name = this.props.data.name;
      var occupation= this.props.data.occupation;
      var description= this.props.data.description;
      var city= this.props.data.address.city;
      var networks = this.props.data.social.map(network => {
         const hoverStyle = this.state[network.name] ? { color: network.color } : { color: "#BEBEBE" };
         return (<li key={network.name}>
           <a href={network.url} target={network.target} >
             <i style={hoverStyle} id={network.name} className={network.className} onMouseLeave={this.toggleHover} onMouseEnter={this.toggleHover}></i>
           </a>
         </li>)
       })
    }

    return (
      <header id="home">

      <nav id="nav-wrap">

         <a className="mobile-btn" href="#nav-wrap" title="Show navigation">Show navigation</a>
	      <a className="mobile-btn" href="#home" title="Hide navigation">Hide navigation</a>

         <ul id="nav" className="nav">
            <li className="current"><a className="smoothscroll" href="#home">Home</a></li>
            <li><a className="smoothscroll" href="#about">About</a></li>
	         <li><a className="smoothscroll" href="#resume">Resume</a></li>
            <li><a className="smoothscroll" href="#portfolio">Projects</a></li>
            <li><a className="smoothscroll" href="#quotes">Quotes</a></li>
            <li><a className="smoothscroll" href="#contact">Contact</a></li>
         </ul>

      </nav>

      <div className="row banner">
         <div className="banner-text">
            <h1 className="responsive-headline">Hi, I'm {name}</h1>
            <h3>I'm a <span>{occupation}</span> living in {city}. {description}.</h3>
            <hr />
            <ul className="social">
               {networks}
            </ul>
         </div>
      </div>

      <p className="scrolldown">
         <a className="smoothscroll" href="#about"><i className="icon-down-circle"></i></a>
      </p>

   </header>
    );
  }
}

export default Header;
