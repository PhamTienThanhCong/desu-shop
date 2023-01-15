import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";
// import icon 
import { Close, FormatAlignJustify } from "@material-ui/icons";
import AddIcon from '@mui/icons-material/Add';
import React, { useState } from 'react';
import axios from 'axios';


const Container = styled.div`
    width: 300px;
    background-color: #fff;
    border-radius: 10px;
    position: fixed;
    bottom: 0;
    right: 20px;
    z-index: 999;
`;
const Chat__header = styled.div`
    width: 100%;
    height: 50px;
    background-color: #fff;
    border-radius: 10px 10px 0 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    border-bottom: 1px solid #ccc;
    ${mobile({ width: "100%" })}
`;

const Chat__body = styled.div`
    width: 100%;
    height: 300px;
    overflow-y: scroll;
    background-color: #fff;
    border-radius: 0 0 10px 10px;
    padding: 0 10px;
    border-bottom: 1px solid #ccc;
    display: flex;
    flex-direction: column;
    ${mobile({ width: "100%" })}
`;

const Message = styled.div`
    width: 100%;
    list-style: none;
    padding: 0;
`;

const ChatShow = styled.div`
    width: 100%;
    margin: 3px 0;
    display: flex;
    felx-direction: column;
    // flex right

`;

const Chat = styled.div`
    max-width: 80%;
    font-size: 15px;
    font-weight: 500;
    padding: 5px 7px;
    border-radius: 8px;
    background-color: #F1F0F0;
    color: #000;
    text-align: left;
`;

const MyChat = styled.div`
    max-width: 80%;
    font-size: 15px;
    font-weight: 500;
    padding: 5px 7px;
    border-radius: 8px;
    background-color: #0084FF;
    color: #fff;
    text-align: right;
    float: right;
`;

const HiddenSpace = styled.li`
    height: 10px;
    width: 100%;
`;

const InputMessage = styled.form`
    width: 100%;
    background-color: #fff;
    border-radius: 10px 10px 0 0;
    padding: 5px 10px;
    padding-bottom: 10px;
    display: flex;
    justify-content: space-between;
`;

const Chat__input = styled.input`
    width: 70%;
    font-size: 15px;
    border-radius: 5px;
    border: 1px solid #ccc;
    padding: 5px;
    outline: none;
`;

const Chat__button = styled.button`
    width: 25%;
    font-size: 15px;
    cursor: pointer;
    border-radius: 5px;
    border: 1px solid #ccc;
    background-color: #0084FF;
    color: #fff;
    padding: 5px;
    margin-left: 5%;
`;



const ChatWindown = () => {
    // list message
    const [messages, setMessages] = useState([{
        message: "Xin chào, tôi có thể giúp gì cho bạn?",
        isMyMessage: false,
    }]);
    // state open chat
    const [isOpen, setIsOpen] = useState(true);

    // call api method post 
    const callApi = async (message) => {
        // get REACT_APP_API_CHAT from .env

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "message": `${message}`
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://127.0.0.1:5000/chat", requestOptions)
            .then(response => response.json())
            .then(result => 
                // add result.chat to list message
                setMessages([...messages, {
                    message: message,
                    isMyMessage: true,
                },{
                    message: result.chat,
                    isMyMessage: false,
                }])
                )
                .catch(error => console.log('error', error));
    }
    // function send message
    const sendMessage = (e) => {
        // get value input by id chat-message
        e.preventDefault();
        const message = document.getElementById("chat-message");
        if (message.value !== "") {
            // add message to list message
            setMessages([...messages, {
                message: message.value,
                isMyMessage: true,
            }]);
            callApi(message.value);
            message.value = "";
            // send request to server
        }
    }

    const handleKeyPress = (e) => {
        // console.log(e.target.value);
    }

    return (
      <Container>
        <Chat__header>
            <h3>Trợ lý trang web</h3>
            <Link onClick={() => setIsOpen(!isOpen)} >
                {/* if isOpen true show Close else Plus*/}
                {isOpen ? <Close /> : <AddIcon />}
            </Link>
        </Chat__header>
        {/* if isOpen true show else hidden */}
        <Chat__body style={{ display: isOpen ? "block" : "none" }}>
            <Message>
                {messages.map((message, index) => 
                    <ChatShow key={index} style={ 
                        message.isMyMessage ? { justifyContent: "flex-end" } : { justifyContent: "flex-start" }
                     }>
                        {message.isMyMessage ? <MyChat>{message.message}</MyChat> : <Chat>{message.message}</Chat>}
                    </ChatShow>
                )}
            </Message>
        </Chat__body>
        
        <InputMessage 
            style={{ display: isOpen ? "block" : "none" }} 
            onSubmit= { sendMessage }
        >
            <Chat__input id="chat-message" type={ "text" } placeholder={ "Nhập tin nhắn" } onChange={handleKeyPress}></Chat__input>
            <Chat__button>
                gửi
            </Chat__button>
        </InputMessage>
      </Container>
    );
  };
  
  export default ChatWindown;