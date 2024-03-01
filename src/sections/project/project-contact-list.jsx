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
import EmptyContent from 'src/components/empty-content/empty-content';

const ITEM_HEIGHT = 64;

export default function ProjContactDetails({
    assignee = [],
    open,
    onClose,
    handleChange,
    type,
    contacts,
}) {
    const [searchContact, setSearchContact] = useState('');

    const handleSearchContacts = useCallback((event) => {
        setSearchContact(event.target.value);
    }, []);

    const dataFiltered = applyFilter({
        inputData: contacts,
        query: searchContact,
    });

    const notFound = !dataFiltered.length && !!searchContact;

    return (
        <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose}>
            <DialogTitle sx={{ pb: 0 }}>
                Contacts <Typography component="span">({contacts.length})</Typography>
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
                <Box
                    sx={{
                        px: 2.5,
                        height: ITEM_HEIGHT * 6,
                        overflowY: 'scroll',
                    }}
                >
                    {(notFound || dataFiltered.length===0) && <EmptyContent title="Data not available" />}
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
            </DialogContent>
        </Dialog>
    );
}

ProjContactDetails.propTypes = {
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
