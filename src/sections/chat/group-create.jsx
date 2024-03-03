import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';
// @mui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import ListItemText from '@mui/material/ListItemText';
import InputAdornment from '@mui/material/InputAdornment';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Iconify from 'src/components/iconify/Iconify';
import EmptyContent from 'src/components/empty-content/empty-content';
import { Drawer, Stack } from '@mui/material';

const ITEM_HEIGHT = 64;

export default function GroupComponent({ open }) {
    const [searchContact, setSearchContact] = useState('');
    const [contacts, setContacts] = useState([]);
    const [formData, setFomData] = useState({
        name: '',
        desc: '',
        assignee: [],
    });

    const handleSearchContacts = useCallback((event) => {
        setSearchContact(event.target.value);
    }, []);

    const dataFiltered = applyFilter({
        inputData: contacts,
        query: searchContact,
    });

    const notFound = !dataFiltered.length && !!searchContact;

    return (
        <Drawer
            anchor="right"
            open={open.value}
            slotProps={{
                backdrop: { invisible: true },
            }}
            PaperProps={{
                sx: {
                    width: {
                        xs: 1,
                        sm: 480,
                    },
                    p:3
                },
            }}
        >
            <Stack gap={2}>
                <TextField label="Group Name"/>
                <TextField  label="Description" multiline rows={6}/>
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
                <Box
                    sx={{
                        height: ITEM_HEIGHT * 5,
                        overflowY: 'scroll',
                    }}
                >
                    {(notFound || dataFiltered.length === 0) && (
                        <EmptyContent title="Data not available" />
                    )}
                    {dataFiltered.map((contact) => {
                        const checked = assignee.includes(contact.id);
                        return (
                            <ListItem
                                key={contact.id}
                                disableGutters
                                secondaryAction={
                                    <Button
                                        size="small"
                                        color={checked ? 'primary' : 'inherit'}
                                        onClick={() => handleChange(contact.id, type)}
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
                <Box display='flex' justifyContent='space-between'>
                    <Button variant='contained'>Save</Button>
                    <Button variant='contained' onClick={open.onFalse}>Cancel</Button>
                </Box>
            </Stack>
        </Drawer>
    );
}

GroupComponent.propTypes = {
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
