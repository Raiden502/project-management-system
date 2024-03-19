import {
    Avatar,
    Box,
    Card,
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
} from '@mui/material';
import { useState, useRef, useCallback } from 'react';
import Iconify from 'src/components/iconify/Iconify';
import EmptyContent from 'src/components/empty-content';
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

export default function UserListView({ userList }) {


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
    return (
        <Box component={Card}>
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
                    rowsPerPageOptions={[5, 10, 25]}
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
