import React, { Component } from 'react';
import { Interactions } from 'aws-amplify';
import { Widget, addResponseMessage, toggleWidget } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import logo from '../logo.png';


// ChatBot only works for devices with screen widths higher than 1000px.
class ChatBox extends Component {
    componentDidMount() {
        addResponseMessage("Welcome! I am Thanh Bot, a custom built AI chatbot that specializes in answering interview questions for Thanh and other questions about Thanh. I also tell Chuck Norris jokes!");
        addResponseMessage("Example: 'Which languages do you know?'");
        addResponseMessage("Example: 'Tell me a joke'");
        toggleWidget();
      }

    async handleNewUserMessage (newMessage) {
        // console.log('Input: ', newMessage);
        const response = await Interactions.send("thanhBot", newMessage);
        // console.log('Bot response: ',response);
        addResponseMessage(response.message);
      }

      render() {
  
        return (
            <Widget
                handleNewUserMessage={this.handleNewUserMessage}
                title="Thanh Bot"
                subtitle="Ask questions about Thanh"
                titleAvatar={logo}
            />
        );
      }
      
  }
  
  export default ChatBox;
