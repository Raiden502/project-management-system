import PropTypes from 'prop-types';
import { useState, useCallback, useContext, useRef, useEffect } from 'react';
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
import { AuthContext } from 'src/auth/JwtContext';
import { useSnackbar } from 'src/components/snackbar';
import axiosInstance from 'src/utils/axios';
import AvatarUploader from 'src/components/Image-uploader/avatar-uploader';

const ITEM_HEIGHT = 64;

export default function GroupComponent({ open, group_id }) {
    const [searchContact, setSearchContact] = useState('');
    const { enqueueSnackbar } = useSnackbar();
    const { user } = useContext(AuthContext);
    const [contacts, setContacts] = useState([]);
    const [selectedImages, setSelectedImages] = useState(null);
    const [formData, setFomData] = useState({
        name: '',
        desc: '',
        assignee: [user.user_id],
    });

    const handleSearchContacts = useCallback((event) => {
        setSearchContact(event.target.value);
    }, []);

    const handleChange = (user_id) => {
        let users = formData.assignee;
        if (users.includes(user_id) && user_id !== user.user_id) {
            users = users.filter((item) => item !== user_id);
        } else {
            users.push(user_id);
        }
        setFomData((prev) => ({ ...prev, assignee: [...users] }));
    };

    const dataFiltered = applyFilter({
        inputData: contacts,
        query: searchContact,
    });

    const get_contacts = async () => {
        try {
            const response = await axiosInstance.post('/chat/get_user_list', {
                org_id: user.org_id,
            });
            const { data, errorcode, message } = response.data;
            if (errorcode === 0) {
                setContacts(data);
            }
        } catch (err) {
            console.log('error in fetching message', err);
        }
    };

    const create_group = async () => {
        try {
            const response = await axiosInstance.post('/chat/create_group', {
                ...formData,
                org_id: user.org_id,
                user_id: user.user_id,
                avatar: selectedImages,
            });
            const { errorcode, message } = response.data;
            if (errorcode === 0) {
                enqueueSnackbar('details saved successful', { variant: 'success' });
                firstRender.current = true;
                open.onFalse();
            } else {
                enqueueSnackbar(' failed to saved', { variant: 'warning' });
            }
        } catch (err) {
            console.log('error in fetching message', err);
            enqueueSnackbar('Unable to save', { variant: 'error' });
        }
    };

    const edit_group = async () => {
        try {
            const response = await axiosInstance.post('/chat/edit_group', {
                ...formData,
                group_id: group_id,
                avatar: selectedImages,
            });
            const { errorcode, message } = response.data;
            if (errorcode === 0) {
                enqueueSnackbar('details saved successful', { variant: 'success' });
                firstRender.current = true;
                open.onFalse();
            } else {
                enqueueSnackbar(' failed to saved', { variant: 'warning' });
            }
        } catch (err) {
            console.log('error in fetching message', err);
            enqueueSnackbar('Unable to save', { variant: 'error' });
        }
    };

    const getFormData = async () => {
        try {
            const response = await axiosInstance.post('/chat/get_group_data', {
                org_id: user.org_id,
                group_id: group_id,
            });
            const { data, errorcode, message } = response.data;
            if (errorcode === 0) {
                setFomData(data);
                setSelectedImages(data.avatar);
            }
        } catch (err) {
            console.log('error in fetching message', err);
        }
    };

    const firstRender = useRef(true);
    useEffect(() => {
        if (firstRender.current && user?.org_id) {
            get_contacts();
            firstRender.current = false;
        }
    }, [user?.org_id]);

    useEffect(() => {
        if (group_id && user?.org_id) {
            getFormData();
        }
    }, [group_id, user?.org_id]);

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
                    p: 3,
                },
            }}
        >
            <Stack gap={2}>
                <AvatarUploader
                    selectedImages={selectedImages}
                    setSelectedImages={setSelectedImages}
                />
                <TextField
                    label="Group Name"
                    value={formData.name}
                    onChange={(e) => setFomData((prev) => ({ ...prev, name: e.target.value }))}
                />
                <TextField
                    label="Description"
                    multiline
                    rows={6}
                    value={formData.desc}
                    onChange={(e) => setFomData((prev) => ({ ...prev, desc: e.target.value }))}
                />
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
                        const checked = formData.assignee.includes(contact.user_id);
                        return (
                            <ListItem
                                key={contact.user_id}
                                disableGutters
                                secondaryAction={
                                    <Button
                                        size="small"
                                        color={checked ? 'primary' : 'inherit'}
                                        onClick={() => handleChange(contact.user_id)}
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
                <Box display="flex" justifyContent="space-between">
                    <Button variant="contained" onClick={group_id ? edit_group : create_group}>
                        {group_id ? 'Save' : 'Create'}
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => {
                            firstRender.current = true;
                            open.onFalse();
                        }}
                    >
                        Cancel
                    </Button>
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
