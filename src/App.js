import React, { Component } from 'react';
import ReactGA from 'react-ga';
import $ from 'jquery';
import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import About from './Components/About';
import Resume from './Components/Resume';
import Contact from './Components/Contact';
import Testimonials from './Components/Testimonials';
import Portfolio from './Components/Portfolio';
// import { ChatBot, AmplifyTheme } from 'aws-amplify-react';
import ChatBox from './Components/ChatBox';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      foo: 'bar',
      resumeData: {},
    };

    ReactGA.initialize('UA-110570651-1');
    ReactGA.pageview(window.location.pathname);

  }

  getResumeData() {
    $.ajax({
      url: '/resumeData.json',
      dataType: 'json',
      cache: false,
      success: function (data) {
        this.setState({
          isMounted: true
        })
        if (this.state.isMounted) {
          this.setState({ resumeData: data });
        }
      }.bind(this),
      error: function (xhr, status, err) {
        console.log(err);
        alert(err);
      }
    });
  }

  componentDidMount() {
    this.getResumeData();
  }

  render() {
    // const myTheme = {
    //   ...AmplifyTheme,
    //   sectionHeader: {
    //     ...AmplifyTheme.sectionHeader,
    //     backgroundColor: '#ff6600'
    //   }
    // };
    return (
      <div className="App">
        <Header data={this.state.resumeData.main} />
        <About data={this.state.resumeData.main} />
        <Resume data={this.state.resumeData.resume} />
        <Portfolio data={this.state.resumeData.portfolio} />
        <Testimonials data={this.state.resumeData.testimonials} />
        <Contact data={this.state.resumeData.main} />
        {/* <ChatBot
          title="My React Bot"
          theme={myTheme}
          botName="thanhBot"
          welcomeMessage="Welcome, how can I help you today?"
          // onComplete={this.handleComplete.bind(this)}
          clearOnComplete={true}
        /> */}
                          <ChatBox />
        <Footer data={this.state.resumeData.main} />

      </div>
    );
  }
}

export default App;
