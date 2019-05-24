import React, { Component } from 'react';
import { Interactions } from 'aws-amplify';
import { Widget, addResponseMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import logo from '../logo.png';

class ChatBox extends Component {
    componentDidMount() {
        addResponseMessage("Hello! Welcome, I am Thanh Bot. Please ask me any questions about Thanh.");
      }

    async handleNewUserMessage (newMessage) {
        // console.log(`New message incoming! ${newMessage}`);
        const response = await Interactions.send("thanhBot", newMessage);
        console.log('Bot response: ',response)
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
