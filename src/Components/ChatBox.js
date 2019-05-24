import React, { Component } from 'react';
import { Interactions } from 'aws-amplify';
import { Widget, addResponseMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import logo from '../logo.png';

class ChatBox extends Component {
    componentDidMount() {
        addResponseMessage("Hello! Welcome, I am Thanh Bot. I am a custom built AI chatbot that specializes in answering interview questions and questions about Thanh. Please give me a try!");
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
