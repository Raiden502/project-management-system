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
} from '@mui/material';
import { useCallback, useState } from 'react';
import EmptyContent from 'src/components/empty-content/empty-content';
import Iconify from 'src/components/iconify/Iconify';
import Label from 'src/components/label';

const headCells = [
    {
        id: 'User',
        align: 'center',
        label: 'User',
    },
    {
        id: 'email',
        align: 'center',
        label: 'Email',
    },
    {
        id: 'tasks',
        align: 'center',
        label: 'Assigned Tasks',
    },
    {
        id: 'low',
        align: 'center',
        label: 'Low Priority',
    },
    {
        id: 'medium',
        align: 'center',
        label: 'Medium Priority',
    },
    {
        id: 'high',
        align: 'center',
        label: 'High Priority',
    },
    {
        id: 'done',
        align: 'center',
        label: 'Completed',
    },
    {
        id: 'in progress',
        align: 'center',
        label: 'In-Progress',
    },
];

export default function UserListView({ userList }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchUsers, setSearchUsers] = useState('');

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const dataFiltered = applyFilter({
        inputData: userList,
        query: searchUsers,
    });

    const notFound = !dataFiltered.length && !!searchUsers;

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSearchTable = useCallback((event) => {
        setSearchUsers(event.target.value);
    }, []);

    return (
        <Box component={Card} sx={{ borderRadius: '15px', boxShadow: 'rgba(149, 157, 165, 0.1) 0px 8px 24px'}}>
            <Stack p={3} gap={3} direction="row">
                <TextField
                    name="search"
                    placeholder="Search ..."
                    type="text"
                    sx={{ height: '50px' }}
                    value={searchUsers}
                    onChange={handleSearchTable}
                    fullWidth
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
                                .map((item, index) => (
                                    <TableRow
                                        key={item.user_id}
                                        hover
                                        sx={{
                                            borderBottom:
                                                index < userList.length - 1
                                                    ? '1px dashed #f4f4f4'
                                                    : 'none',
                                        }}
                                    >
                                        <TableCell
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                border: 'none',
                                            }}
                                        >
                                            <Avatar
                                                alt={item.details.name}
                                                src={item.details.avatar}
                                                sx={{ mr: 2 }}
                                            />
                                            {item.details.name}
                                        </TableCell>
                                        <TableCell align="center">{item.email}</TableCell>
                                        <TableCell align="center">{item.tasks}</TableCell>
                                        <TableCell align="center">{item.low}</TableCell>
                                        <TableCell align="center">{item.medium}</TableCell>
                                        <TableCell align="center">{item.high}</TableCell>
                                        <TableCell align="center">{item.done}</TableCell>
                                        <TableCell align="center">{item.inprogress}</TableCell>
                                    </TableRow>
                                ))
                        )}
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
            (item) =>
                item.details.name.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
                item.email.toLowerCase().indexOf(query.toLowerCase()) !== -1
        );
    }
    return inputData;
}
