import {
    Avatar,
    Box,
    Card,
    Checkbox,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    TextField,
    InputAdornment,
    Stack,
    TablePagination,
    Switch,
    FormControlLabel,
    MenuItem,
    Button,
} from '@mui/material';
import { useState } from 'react';
import Iconify from 'src/components/iconify/Iconify';
import Label from 'src/components/label';
import axiosInstance from 'src/utils/axios';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { useBoolean } from 'src/utils/use-boolean';
import { useNavigate } from 'react-router-dom';
import { ConfirmDialog } from 'src/components/custom-dialog';

const headCells = [
    {
        id: 'name',
        align: 'left',
        label: 'Name',
    },
    {
        id: 'email',
        align: 'left',
        label: 'Email',
    },
    {
        id: 'department',
        align: 'left',
        label: 'Department',
    },
    {
        id: 'role',
        align: 'left',
        label: 'Role',
    },
    {
        id: 'status',
        align: 'left',
        label: 'Status',
    },
];

const DataCell = [
    {
        userid: 1,
        name: 'name',
        email: 'name@gmail.com',
        avatar: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_24.jpg',
        department: 'department-1',
        role: 'admin',
        status: 'active',
    },
    {
        userid: 2,
        name: 'name',
        email: 'name@gmail.com',
        avatar: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_24.jpg',
        department: 'department-1',
        role: 'admin',
        status: 'active',
    },
    {
        userid: 3,
        name: 'name',
        email: 'name@gmail.com',
        avatar: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_24.jpg',
        department: 'department-1',
        role: 'admin',
        status: 'pending',
    },
];

export default function UserListView() {
    const [userList, setUserList] = useState([...DataCell]);
    const popover = usePopover();
    const confirm = useBoolean();
    const navigate = useNavigate();

    const deleteUser = async () => {
        try {
            const response = await axiosInstance.post('');
            const { data, errorcode, status, message } = response.data;
            if (errorcode === 0) {
                console.log('deleted');
            }
        } catch (err) {
            console.log(err);
        }
    };

    const editUser = (userId) => {
        navigate('/dashboard/users/create', {
            state: { userId },
        });
    };

    return (
        <Box component={Card}>
            <Stack p={3} gap={3} direction="row">
                <TextField
                    name="role"
                    label="Role"
                    type="text"
                    sx={{ height: '50px' }}
                    InputProps={{
                        sx: { borderRadius: '8px' },
                    }}
                />
                <TextField
                    name="search"
                    placeholder="Search ..."
                    type="text"
                    sx={{ height: '50px' }}
                    fullWidth
                    InputProps={{
                        sx: { borderRadius: '8px' },
                        startAdornment: (
                            <InputAdornment position="start">
                                <Iconify icon="ic:round-search" />
                            </InputAdornment>
                        ),
                    }}
                />
            </Stack>
            <TableContainer>
                <Table>
                    <TableHead sx={{ backgroundColor: '#f9f9f9' }}>
                        <TableRow>
                            {headCells.map((item) => (
                                <TableCell key={item.id} align={item.align}>
                                    <Typography variant="body2" fontWeight="">
                                        {item.label}
                                    </Typography>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userList.map((item, index) => (
                            <TableRow
                                key={item.userid}
                                hover
                                sx={{
                                    borderBottom:
                                        index < userList.length - 1 ? '1px dashed #f4f4f4' : 'none',
                                }}
                            >
                                <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Avatar alt={item.name} src={item.avatar} sx={{ mr: 2 }} />
                                    {item.name}
                                </TableCell>
                                <TableCell>{item.email}</TableCell>
                                <TableCell>{item.department}</TableCell>
                                <TableCell>{item.role}</TableCell>
                                <TableCell>
                                    <Label
                                        variant="soft"
                                        color={
                                            (item.status === 'active' && 'success') ||
                                            (item.status === 'pending' && 'warning') ||
                                            (item.status === 'banned' && 'error') ||
                                            'default'
                                        }
                                    >
                                        <Typography variant="body2" fontSize={12} fontWeight="bold">
                                            {item.status}
                                        </Typography>
                                    </Label>
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={popover.onOpen}>
                                        <Iconify icon="eva:more-vertical-fill" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    p: 3,
                }}
            >
                <FormControlLabel control={<Switch checked onChange={() => {}} />} label="Dense" />
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={userList.length}
                    rowsPerPage={5}
                    page={10}
                    // onPageChange={handleChangePage}
                    // onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Box>
            <CustomPopover
                open={popover.open}
                onClose={popover.onClose}
                arrow="right-top"
                sx={{ width: 180 }}
            >
                <MenuItem
                    onClick={() => {
                        popover.onClose();
                        editUser('1');
                    }}
                >
                    <Iconify icon="solar:pen-bold" />
                    Edit
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        popover.onClose();
                        confirm.onTrue();
                    }}
                    sx={{ color: 'error.main' }}
                >
                    <Iconify icon="solar:trash-bin-trash-bold" />
                    Delete
                </MenuItem>
            </CustomPopover>

            <ConfirmDialog
                open={confirm.value}
                onClose={confirm.onFalse}
                title="Delete"
                content="Are you sure want to delete?"
                action={
                    <Button variant="contained" color="error" onClick={() => {}}>
                        Delete
                    </Button>
                }
            />
        </Box>
    );
}
