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

const ITEM_HEIGHT = 84;

export default function ContactDetails({ assignee = [] }) {
    const _contacts = [
        {
            id: '1',
            name: 'dummy',
            email: 'dummy@gmail.com',
            avatar: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_21.jpg',
        },
        {
            id: '2',
            name: 'dummy',
            email: 'dummy@gmail.com',
            avatar: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_22.jpg',
        },
        {
            id: '3',
            name: 'dummy',
            email: 'dummy@gmail.com',
            avatar: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_23.jpg',
        },
        {
            id: '4',
            name: 'dummy',
            email: 'dummy@gmail.com',
            avatar: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_24.jpg',
        },
        {
            id: '5',
            name: 'dummy',
            email: 'dummy@gmail.com',
            avatar: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_25.jpg',
        },
        {
            id: '5',
            name: 'non dummy',
            email: 'dummy@gmail.com',
            avatar: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_25.jpg',
        },
    ];
    return (
        <Box
            sx={{
                px: 2.5,
                height: ITEM_HEIGHT * 6,
                overflowY: 'scroll',
                boxShadow:1,
            }}
        >
            {_contacts.map((contact) => (
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
    );
}

ContactDetails.propTypes = {
    assignee: PropTypes.array,
    onClose: PropTypes.func,
    open: PropTypes.bool,
};

// ----------------------------------------------------------------------

function applyFilter({ inputData, query }) {
    if (query) {
        inputData = inputData.filter(
            (contact) =>
                contact.name.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
                contact.email.toLowerCase().indexOf(query.toLowerCase()) !== -1
        );
    }

    return inputData;
}
