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
import Iconify from 'src/components/iconify/Iconify';
import Label from 'src/components/label';

const headCells = [
    {
        id: 'name',
        align: 'left',
        label: 'Task Name',
    },
    {
        id: 'description',
        align: 'left',
        label: 'Description',
    },
    {
        id: 'Priority',
        align: 'left',
        label: 'Priority',
    },
    {
        id: 'status',
        align: 'left',
        label: 'Status',
    },
    {
        id: 'Progress',
        align: 'left',
        label: 'Progress',
    },
];

export default function TaskListView({tasks}) {
    return (
        <Box
            component={Card}
        >
            <Stack p={3} gap={3} direction="row">
                <TextField
                    name="role"
                    label="Role"
                    type="text"
                    sx={{ height: '50px' }}
                />
                <TextField
                    name="search"
                    placeholder="Search ..."
                    type="text"
                    sx={{ height: '50px' }}
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
                                <TableCell key={item.id} align={item.align} sx={{ border: 'none' }}>
                                    <Typography variant="body2" fontWeight="">
                                        {item.label}
                                    </Typography>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tasks.map((item, index) => (
                            <TableRow
                                key={item.userid}
                                hover
                                sx={{
                                    borderBottom:
                                        index < tasks.length - 1 ? '1px dashed #f4f4f4' : 'none',
                                }}
                            >
                                <TableCell>{item.name}</TableCell>
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
                    count={tasks.length}
                    rowsPerPage={5}
                    page={10}
                    // onPageChange={handleChangePage}
                    // onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Box>
        </Box>
    );
}
