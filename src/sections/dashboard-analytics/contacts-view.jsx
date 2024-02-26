import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';
// @mui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Iconify from 'src/components/iconify/Iconify';
import { Card, Typography } from '@mui/material';

const ITEM_HEIGHT = 70;

export default function ContactDetails({ assignee = [] }) {
    return (
        <Card sx={{ borderRadius: '15px', boxShadow: 'rgba(149, 157, 165, 0.1) 0px 8px 24px', p:3}}>
            <Typography variant="h6">Top Performer</Typography>

            <Box
                sx={{
                    height: ITEM_HEIGHT * 6,
                    mt:1,
                    overflowY: 'hidden', // Initially hide the scrollbar
                    '&:hover': {
                        overflowY: 'auto', // Show the scrollbar on hover
                    },
                    '&::-webkit-scrollbar': {
                        width: '8px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: '#D5CECC',
                        borderRadius: '4px',
                        height: '10px',
                    },
                    '&::-webkit-scrollbar-track': {
                        // backgroundColor: '#f0f0f0',
                    },
                }}
            >
                {assignee.map((contact) => (
                    <ListItem key={contact.id} disableGutters sx={{ height: ITEM_HEIGHT }}>
                        <ListItemAvatar>
                            <Avatar src={contact.avatar} />
                        </ListItemAvatar>

                        <ListItemText
                            primaryTypographyProps={{
                                typography: 'subtitle2',
                                sx: { mb: 0.25 },
                            }}
                            secondaryTypographyProps={{ typography: 'caption' }}
                            primary={contact.name}
                            secondary={contact.email}
                        />
                    </ListItem>
                ))}
            </Box>
        </Card>
    );
}

ContactDetails.propTypes = {
    assignee: PropTypes.array,
    onClose: PropTypes.func,
    open: PropTypes.bool,
};
