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
import { useEffect, useState, useRef } from 'react';
import Iconify from 'src/components/iconify/Iconify';
import axiosInstance from 'src/utils/axios';
import { useBoolean } from 'src/utils/use-boolean';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'src/redux/store';
import UserListRow from './user-list-row';

const headCells = [
    {
        id: 'user_name',
        align: 'left',
        label: 'Name',
    },
    {
        id: 'email_addrs',
        align: 'left',
        label: 'Email',
    },
    {
        id: 'phonenumber',
        align: 'left',
        label: 'Phone Number',
    },
    {
        id: 'role',
        align: 'left',
        label: 'Role',
    },
    {
        id: 'verified',
        align: 'left',
        label: 'Status',
    },
];

const DataCell = [
    {
        user_id: 1,
        user_name: 'user_name',
        email_addrs: 'user_name@gmail.com',
        avatar: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_24.jpg',
        department: 'department-1',
        role: 'admin',
        verified: 'active',
    },
    {
        user_id: 2,
        user_name: 'user_name',
        email_addrs: 'user_name@gmail.com',
        avatar: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_24.jpg',
        department: 'department-1',
        role: 'admin',
        verified: 'active',
    },
    {
        user_id: 3,
        user_name: 'user_name',
        email_addrs: 'user_name@gmail.com',
        avatar: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_24.jpg',
        department: 'department-1',
        role: 'admin',
        verified: 'pending',
    },
];

export default function UserListView() {
    const [userList, setUserList] = useState([...DataCell]);
    const navigate = useNavigate();
    const department = useSelector((state) => state.department);

    const deleteUser = async () => {
        try {
            const response = await axiosInstance.post('');
            const { data, errorcode, verified, message } = response.data;
            if (errorcode === 0) {
                console.log('deleted');
            }
        } catch (err) {
            console.log(err);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await axiosInstance.post('user/user_list', {
                department_id: department.department_id,
            });
            const { data, errorcode, verified, message } = response.data;
            if (errorcode === 0) {
                setUserList(data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    // const firstRender = useRef(true);
    useEffect(() => {
        fetchUsers();
    }, [department.department_id]);

    return (
        <Box component={Card}>
            <Stack p={3} gap={3} direction="row">
                <TextField
                    user_name="role"
                    label="Role"
                    type="text"
                    sx={{ height: '50px' }}
                    InputProps={{
                        sx: { borderRadius: '8px' },
                    }}
                />
                <TextField
                    user_name="search"
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
                            <UserListRow row={item} />
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
        </Box>
    );
}
