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
    Backdrop,
} from '@mui/material';
import { useEffect, useState, useRef, useCallback } from 'react';
import Iconify from 'src/components/iconify/Iconify';
import axiosInstance from 'src/utils/axios';
import { useBoolean } from 'src/utils/use-boolean';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'src/redux/store';
import EmptyContent from 'src/components/empty-content';
import UserListRow from './user-list-row';
import { LoadingScreen } from 'src/components/loading-screen';

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

export default function UserListView() {
    const [userList, setUserList] = useState([]);
    const navigate = useNavigate();
    const department = useSelector((state) => state.department);
    const loading = useBoolean();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const [searchUsers, setSearchUsers] = useState('');

    const handleSearchTable = useCallback((event) => {
        setSearchUsers(event.target.value);
    }, []);

    const dataFiltered = applyFilter({
        inputData: userList,
        query: searchUsers,
    });

    const notFound = !dataFiltered.length && !!searchUsers;

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
            loading.onTrue();
            const response = await axiosInstance.post('user/user_list', {
                department_id: department.department_id,
            });
            const { data, errorcode, verified, message } = response.data;
            if (errorcode === 0) {
                setUserList(data);
            }
        } catch (err) {
            console.log(err);
        } finally {
            loading.onFalse();
        }
    };

    const firstRender = useRef(true);
    useEffect(() => {
        if (firstRender.current && department.department_id) {
            fetchUsers();
            firstRender.current = false;
        }
    }, [department.department_id]);

    return (
        <Box component={Card}>
            <Backdrop open={loading.value}>
                <LoadingScreen />
            </Backdrop>
            <Stack p={3} gap={3} direction="row">
                <TextField
                    user_name="search"
                    placeholder="Search ..."
                    type="text"
                    sx={{ height: '50px' }}
                    value={searchUsers}
                    onChange={handleSearchTable}
                    InputProps={{
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
                        {notFound || dataFiltered.length === 0 ? (
                            <TableRow>
                                {' '}
                                <TableCell colSpan={12}>
                                    <EmptyContent title="No Data" />{' '}
                                </TableCell>
                            </TableRow>
                        ) : (
                            dataFiltered
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((item, index) => <UserListRow row={item} />)
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    p: 3,
                }}
            >
                <TablePagination
                    rowsPerPageOptions={[1, 5, 10, 25]}
                    component="div"
                    count={dataFiltered.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Box>
        </Box>
    );
}

function applyFilter({ inputData, query }) {
    if (query) {
        inputData = inputData.filter(
            (contact) =>
                contact.user_name.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
                contact.email_addrs.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
                contact.role.toLowerCase().indexOf(query.toLowerCase()) !== -1
        );
    }
    return inputData;
}
