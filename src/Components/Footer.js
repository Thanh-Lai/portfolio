import React, { Component } from 'react';

class Footer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      facebook: false,
      twitter: false,
      linkedin: false,
      instagram: false,
      github: false
    }
    this.toggleHover = this.toggleHover.bind(this)
  }

  toggleHover(event) {
    let elem = event.target.id
    switch (elem) {
      case 'facebook':
        this.setState({ facebook: !this.state.facebook })
        return
      case 'twitter':
        this.setState({ twitter: !this.state.twitter })
        return
      case 'linkedin':
        this.setState({ linkedin: !this.state.linkedin })
        return
      case 'instagram':
        this.setState({ instagram: !this.state.instagram })
        return
      default:
        this.setState({ github: !this.state.github })
        return
    }
  }

  render() {

    if (this.props.data) {
      var networks = this.props.data.social.map(network => {
        let hoverStyle = this.state[network.name] ? { color: network.color } : { color: "#525252" };
        return (<li key={network.name}>
          <a href={network.url} target={network.target} >
            <i style={hoverStyle} id={network.name} className={network.className} onMouseLeave={this.toggleHover} onMouseEnter={this.toggleHover}></i>
          </a>
        </li>)
      })
    }

    return (
      <footer>
        <div className="row">
          <div className="twelve columns">
            <ul className="social-links">
              {networks}
            </ul>
          </div>
          <div id="go-top"><a className="smoothscroll" title="Back to Top" href="#home"><i className="icon-up-open"></i></a></div>
        </div>
      </footer>
    );
  }
}

export default Footer;
