import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';
// @mui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import ListItemText from '@mui/material/ListItemText';
import DialogContent from '@mui/material/DialogContent';
import InputAdornment from '@mui/material/InputAdornment';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Iconify from 'src/components/iconify/Iconify';

const ITEM_HEIGHT = 64;

export default function TaskContactDetails({ assignee = [], open, onClose }) {
    const [searchContact, setSearchContact] = useState('');
    const _contacts = [ {
        id: '1',
        name: 'dummy',
        email:"dummy@gmail.com",
        avatar: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_21.jpg',
    },
    {
        id: '2',
        name: 'dummy',
        email:"dummy@gmail.com",
        avatar: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_22.jpg',
    },
    {
        id: '3',
        name: 'dummy',
        email:"dummy@gmail.com",
        avatar: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_23.jpg',
    },
    {
        id: '4',
        name: 'dummy',
        email:"dummy@gmail.com",
        avatar: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_24.jpg',
    },
    {
        id: '5',
        name: 'dummy',
        email:"dummy@gmail.com",
        avatar: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_25.jpg',
    },
    {
        id: '5',
        name: 'non dummy',
        email:"dummy@gmail.com",
        avatar: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_25.jpg',
    },
]

    const handleSearchContacts = useCallback((event) => {
        setSearchContact(event.target.value);
    }, []);

    const dataFiltered = applyFilter({
        inputData: _contacts,
        query: searchContact,
    });

    const notFound = !dataFiltered.length && !!searchContact;

    return (
        <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose}>
            <DialogTitle sx={{ pb: 0 }}>
                Contacts <Typography component="span">({_contacts.length})</Typography>
            </DialogTitle>

            <Box sx={{ px: 3, py: 2.5 }}>
                <TextField
                    fullWidth
                    value={searchContact}
                    onChange={handleSearchContacts}
                    placeholder="Search..."
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>

            <DialogContent sx={{ p: 0 }}>
                {notFound ? (
                    <>not found</>
                ) : (
                    <Box
                        sx={{
                            px: 2.5,
                            height: ITEM_HEIGHT * 6,
                            overflowY: 'scroll',
                        }}
                    >
                        {dataFiltered.map((contact) => {
                            const checked = assignee
                                .map((person) => person.name)
                                .includes(contact.name);

                            return (
                                <ListItem
                                    key={contact.id}
                                    disableGutters
                                    secondaryAction={
                                        <Button
                                            size="small"
                                            color={checked ? 'primary' : 'inherit'}
                                            startIcon={
                                                <Iconify
                                                    width={16}
                                                    icon={
                                                        checked
                                                            ? 'eva:checkmark-fill'
                                                            : 'mingcute:add-line'
                                                    }
                                                    sx={{ mr: -0.5 }}
                                                />
                                            }
                                        >
                                            {checked ? 'Assigned' : 'Assign'}
                                        </Button>
                                    }
                                    sx={{ height: ITEM_HEIGHT }}
                                >
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
                            );
                        })}
                    </Box>
                )}
            </DialogContent>
        </Dialog>
    );
}

TaskContactDetails.propTypes = {
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
