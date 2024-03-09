import { useCallback, useState } from 'react';
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
    Chip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import Iconify from 'src/components/iconify/Iconify';
import Label from 'src/components/label';
import EmptyContent from 'src/components/empty-content/empty-content';

const headCells = [
    {
        id: 'name',
        align: 'center',
        label: 'Task Name',
    },
    {
        id: 'priority',
        align: 'center',
        label: 'Priority',
    },
    {
        id: 'status',
        align: 'center',
        label: 'Stage',
    },
    {
        id: 'reporter',
        align: 'center',
        label: 'Reporter',
    },
    {
        id: 'users',
        align: 'center',
        label: 'Users',
    },
    {
        id: 'teams',
        align: 'center',
        label: 'Teams',
    },
    {
        id: 'start_date',
        align: 'center',
        label: 'Start Date',
    },
    {
        id: 'due_date',
        align: 'center',
        label: 'End Date',
    },
    {
        id: 'progress',
        align: 'center',
        label: 'Progress',
    },
];

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    },
}));

const isCurrentOrFutureDate = (dateStr) => {
    try {
        var inputDate = new Date(dateStr.split('-').reverse().join('-'));
        var currentDate = new Date();
        return inputDate <= currentDate;
    } catch (error) {
        return false;
    }
};

export default function TaskListView({ tasks }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchUsers, setSearchUsers] = useState('');

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const dataFiltered = applyFilter({
        inputData: tasks,
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
                {/* <TextField name="role" label="Role" type="text" sx={{ height: '50px' }} /> */}
                <TextField
                    name="search"
                    placeholder="Search ..."
                    type="text"
                    sx={{ maxWidth: 500 }}
                    fullWidth
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
                                <TableCell key={item.id} align={item.align} sx={{ border: 'none' }}>
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
                                        key={item.userid}
                                        hover
                                        sx={{
                                            borderBottom:
                                                index < tasks.length - 1
                                                    ? '1px dashed #f4f4f4'
                                                    : 'none',
                                        }}
                                    >
                                        <TableCell align="center">
                                            <Typography variant="body2" fontWeight="bold">
                                                {item.name}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Label
                                                variant="soft"
                                                color={
                                                    (item.priority === 'low' && 'info') ||
                                                    (item.priority === 'medium' && 'warning') ||
                                                    (item.priority === 'high' && 'error')
                                                }
                                            >
                                                <Typography
                                                    variant="body2"
                                                    fontSize={12}
                                                    fontWeight="bold"
                                                >
                                                    {item.priority}
                                                </Typography>
                                            </Label>
                                        </TableCell>
                                        <TableCell align="center">{item.status}</TableCell>
                                        <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Avatar
                                                alt={item.reporter.name}
                                                src={item.reporter.avatar}
                                                sx={{ mr: 2 }}
                                            />
                                            {item.reporter.name}
                                        </TableCell>
                                        <TableCell align="center">{item.users}</TableCell>
                                        <TableCell align="center">{item.teams}</TableCell>
                                        <TableCell align="center">
                                            <Label variant="soft" color="default">
                                                <Typography
                                                    variant="body2"
                                                    fontSize={12}
                                                    fontWeight="bold"
                                                >
                                                    {item.start_date ? item.start_date : '...'}
                                                </Typography>
                                            </Label>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Label
                                                variant="soft"
                                                color={
                                                    isCurrentOrFutureDate(
                                                        item.due_date ? item.due_date : '...'
                                                    )
                                                        ? 'error'
                                                        : 'warning'
                                                }
                                            >
                                                <Typography
                                                    variant="body2"
                                                    fontSize={12}
                                                    fontWeight="bold"
                                                >
                                                    {item.due_date ? item.due_date : '...'}
                                                </Typography>
                                            </Label>
                                        </TableCell>
                                        <TableCell>
                                            <Typography>{`${item.progress}%`}</Typography>
                                            <BorderLinearProgress
                                                variant="determinate"
                                                value={item.progress}
                                            />
                                        </TableCell>
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
                    count={tasks.length}
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
                item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
                item.priority.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
                item.status.toLowerCase().indexOf(query.toLowerCase()) !== -1
        );
    }
    return inputData;
}
