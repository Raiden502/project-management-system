import React, { useState, useEffect, useContext, useRef } from 'react';
import { Typography, Container, Card, Stack, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import {useChatSocket} from 'src/utils/socket';
import axiosInstance from 'src/utils/axios';
import ChatDashboard from 'src/sections/chat/chat-dashboard';
import ChatContactView from 'src/sections/chat/chat-contact';
import ChatViewSmall from 'src/sections/chat/chat-view-small';
import { AuthContext } from 'src/auth/JwtContext';

// const userList = [
//     {
//         avatar: 'https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg',
//         name: 'TL SIR',
//         lastMsg: 'Do task man!, what are you doing',
//         type: 'groups',
//         user_id: '1',
//     },
// ];

// const messageArray = [
//     {
//         message: 'hi team lead how are you',
//         datetime: '12-11-2023',
//         senderid: '123',
//         reciverid: '234',
//     },
// ];

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ChattingView = () => {
    const { user } = useContext(AuthContext);
    const socketIOInstance = useChatSocket();
    const [currentChat, setCurrentChat] = useState({});
    const [usersData, setUsersData] = useState([]);
    const [usersFilterData, setFilterUsersData] = useState([]);
    const [closeNav, setCloseNav] = useState(false);
    const [messageData, setMessageData] = useState([]);
    const [notify, setNotify] = React.useState({ open: false, message: {} });

    const ChangeChatOnTap = (ids) => {
        const reciever = usersData.filter((item) => item.id === ids)[0];
        setCurrentChat(reciever);
    };

    const localSearch = (name) => {
        if (name != '') {
            const inputData = usersData.filter(
                (dev) => dev.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
            );
            setFilterUsersData(inputData);
        } else {
            setFilterUsersData(usersData);
        }
    };

    const fetchChats = async () => {
        try {
            const response = await axiosInstance.post('/api/getChats', {
                receiver_id: currentChat.id,
                sender_id: user.user_id,
                type: currentChat.type,
            });
            if (response.data.status) {
                setMessageData(response.data.data);
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
                setUsersData(response.data.data);
                setFilterUsersData(response.data.data);
                setCurrentChat(response.data.data[0]);
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
    }, [currentChat.id]);

    const ChangeNavBar = () => {
        setCloseNav((prev) => !prev);
    };

    const SendMessage = (value) => {
        if (value != '') {
            socketIOInstance.emit('private message', {
                recipientID: currentChat.id,
                message: value,
                userId: user.user_id,
                type: currentChat.type,
                username: user.user_name,
                avatar: user.avatar,
            });
            setMessageData((prev) => [
                ...prev,
                {
                    message: value,
                    datetime: new Date().toLocaleString(),
                    senderid: user.user_id,
                    reciverid: currentChat.id,
                    username: 'you',
                    avatar: user.avatar,
                },
            ]);
            const temp = usersData.map((item) => {
                if (item.id === currentChat.id) {
                    item.lastmsg = value;
                    return { ...item, lastmsg: value };
                }
                return item;
            });
            setUsersData(temp);
            setFilterUsersData(temp);
        }
    };

    useEffect(() => {
        if (socketIOInstance) {
            socketIOInstance.on('private message', (receivedMessage) => {
                console.log('Received private message:', currentChat);
                if (receivedMessage.userId == currentChat.id) {
                    setMessageData((prev) => [
                        ...prev,
                        {
                            message: receivedMessage.message,
                            datetime: receivedMessage.date,
                            senderid: receivedMessage.userId,
                            reciverid: receivedMessage.recipientID,
                            username: receivedMessage?.username,
                            avatar: receivedMessage?.avatar,
                        },
                    ]);
                    const temp = usersData.map((item) => {
                        if (item.id === currentChat.id) {
                            return { ...item, lastmsg: receivedMessage.message };
                        }
                        return item;
                    });
                    setUsersData(temp);
                    setFilterUsersData(temp);
                } else {
                    setNotify({ open: true, message: receivedMessage });
                }
            });
            socketIOInstance.on('online-status', (receivedMessage) => {
                const temp = usersData.map((item) => {
                    if (item.id === receivedMessage.recipientID) {
                        return { ...item, onlinestatus: receivedMessage.onlinestatus};
                    }
                    return item;
                });
                setUsersData(temp);
                setFilterUsersData(temp);
                if(currentChat.id===receivedMessage.recipientID){
                    setCurrentChat({...currentChat, onlinestatus: receivedMessage.onlinestatus})
                }
            });
        }
    }, [socketIOInstance, currentChat, usersData]);

    return (
        <Container maxWidth={false} sx={{ mt: 3 }}>
            <Typography
                variant="h5"
                sx={{
                    mb: { xs: 3, md: 3 },
                }}
            >
                Chats
            </Typography>
            <Stack component={Card} direction="row" sx={{ height: '66vh' }}>
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
                    messageArray={messageData}
                    currentChat={currentChat}
                    SendMessage={SendMessage}
                />
                <Stack component={Card} direction="column"></Stack>
            </Stack>
            <Snackbar
                open={notify.open}
                autoHideDuration={6000}
                onClose={() => setNotify({ open: false, message: {} })}
            >
                <Alert
                    onClose={() => setNotify({ open: false, message: {} })}
                    severity="success"
                    sx={{ width: '100%' }}
                >
                    {notify.message.message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default ChattingView;
