import React from "react";
import Menu from "../components/menu/Menu";
import DataService from "../../services/DataService";
import Message from "../components/message/Message";
import PostMessage from "../components/PostMessage";

class MessageFeed extends React.Component {
    client = new DataService();

    state = {
        message: [],
        text: "",
    };

    componentDidMount() {
        this.client.getAllMessages().then((response) => {
            this.setState({ message: response.data.messages });
        });
    }

    handleMessagePost = (event) => {
        event.preventDefault();
        this.client.postMessage({ text: this.state.text })
            .then((result) => {
                this.setState((currentState) => {
                    return {
                        message: [result.data.message, ...currentState.message],
                        text: ""
                    }
                })
            });
        console.log("Post Button Pressed");
    };
    handleDeleteMesssage = (messageId) => {
        this.client.deleteMessage(messageId).then((response) => {
          console.log(response.data);
          this.client
            .getMessageList()
            .then((response) =>
              this.setState({ messages: response.data.messages })
            );
        });
      };


    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    render() {
        if (this.state.message.length === 0) {
            return (
                <div className="MessageList">
                    <Menu />
                    <h1>MessageList</h1>
                    <h3>LOADING...</h3>
                </div>
            );
        }

        return (
            <div className="MessageList">
                <Menu />
                <h1>Message Feed</h1>
                <PostMessage handleChange={this.handleChange} handleMessagePost={this.handleMessagePost} text={this.state.text} />

                <ul>
                    {this.state.message.map((messageObject) => (
                        <Message 
                        handleDeleteMesssage={this.handleDeleteMesssage}
                        key={messageObject.id} {...messageObject} />
                    ))}
                </ul>
            </div>
        );
    }
}

export default MessageFeed;