import React, { useState, useEffect, useContext, useRef } from 'react';
import { Typography, Container, Card, Stack, Divider } from '@mui/material';
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
            const response = await axiosInstance.post('/chat/fetch_chats', {
                receiver_id: currentChatUser.id,
                sender_id: user.user_id,
                org_id: user.org_id,
                type: currentChatUser.type,
            });

            ChatDispatch({ type: 'SET_DEFAULT_CHATS', payload: response.data.data });
        } catch (err) {
            console.log('error in fetching message', err);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await axiosInstance.post('/chat/fetch_users', {
                user_id: user.user_id,
                org_id: user.org_id,
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
            }}
        >
            {closeNav === false ? (
                <ChatContactView
                    userList={usersFilterData}
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
            <Divider orientation="vertical" flexItem />
            <ChatDashboard
                messageArray={chats}
                currentChat={currentChatUser}
                SendMessage={SendMessage}
            />
        </Stack>
    );
};

export default ChattingView;
