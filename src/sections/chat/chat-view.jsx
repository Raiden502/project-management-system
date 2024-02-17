import React, { useState, useEffect, useContext, useRef } from 'react';
import { Typography, Container, Card, Stack } from '@mui/material';
import axiosInstance from 'src/utils/axios';
import ChatDashboard from 'src/sections/chat/chat-dashboard';
import ChatContactView from 'src/sections/chat/chat-contact';
import ChatViewSmall from 'src/sections/chat/chat-view-small';
import { AuthContext } from 'src/auth/JwtContext';
import { ChatContext } from 'src/providers/socket/ChatProviders';

const ChattingView = () => {
    const { user } = useContext(AuthContext);
    const { SendMessage, currentChatUser, chats, chatUsers, ChatDispatch } =
        useContext(ChatContext);
    const [usersFilterData, setFilterUsersData] = useState([]);
    const [closeNav, setCloseNav] = useState(false);

    const ChangeChatOnTap = (ids) => {
        const reciever = chatUsers.filter((item) => item.id === ids)[0];
        ChatDispatch({ type: 'SET_DEFAULT_CURRENTUSR', payload: reciever });
    };

    const localSearch = (name) => {
        if (name != '') {
            const inputData = chatUsers.filter(
                (dev) => dev.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
            );
            setFilterUsersData(inputData);
        } else {
            setFilterUsersData(chatUsers);
        }
    };

    const ChangeNavBar = () => {
        setCloseNav((prev) => !prev);
    };

    const fetchChats = async () => {
        try {
            const response = await axiosInstance.post('/api/getChats', {
                receiver_id: currentChatUser.id,
                sender_id: user.user_id,
                type: currentChatUser.type,
            });
            if (response.data.status) {
                ChatDispatch({ type: 'SET_DEFAULT_CHATS', payload: response.data.data });
            }
        } catch (err) {
            console.log('error in fetching message', err);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await axiosInstance.post('/api/getUsers', {
                sender_id: user.user_id,
            });
            if (response.data.status) {
                ChatDispatch({ type: 'SET_DEFAULT_USERS', payload: response.data.data });
                ChatDispatch({ type: 'SET_DEFAULT_CURRENTUSR', payload: response.data.data[0] });
                setFilterUsersData(response.data.data);
            }
        } catch (err) {
            console.log('error in fetching message', err);
        }
    };

    const firstRender = useRef(true);
    useEffect(() => {
        if (firstRender.current) {
            fetchUsers();
            firstRender.current = false;
        } else {
            fetchChats();
        }
    }, [currentChatUser.id]);

    useEffect(() => {
        setFilterUsersData(chatUsers);
    }, [chatUsers, currentChatUser, chats]);

    return (
        <Stack
            component={Card}
            direction="row"
            sx={{
                height: '66vh',
                borderRadius: '15px',
                boxShadow: 'rgba(149, 157, 165, 0.1) 0px 8px 24px',
            }}
        >
            {closeNav === false ? (
                <ChatContactView
                    user={usersFilterData}
                    ChangeChatOnTap={ChangeChatOnTap}
                    localSearch={localSearch}
                    ChangeNavBar={ChangeNavBar}
                />
            ) : (
                <ChatViewSmall
                    ChangeNavBar={ChangeNavBar}
                    user={usersFilterData}
                    ChangeChatOnTap={ChangeChatOnTap}
                />
            )}
            <ChatDashboard
                messageArray={chats}
                currentChat={currentChatUser}
                SendMessage={SendMessage}
            />
            <Stack component={Card} direction="column"></Stack>
        </Stack>
    );
};

export default ChattingView;
