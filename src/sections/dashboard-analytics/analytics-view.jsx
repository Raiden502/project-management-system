import { useState } from 'react';
import { Card, Stack, Box, TextField, Select, OutlinedInput, MenuItem } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Iconify from 'src/components/iconify/Iconify';
import { useTheme } from '@emotion/react';
import CountWidgetSummary from './count-view';
import CircleGroupChart from './circle-group-charts';
import ContactDetails from './contacts-view';
import UserListView from './user-list-view';
import TaskListView from './task-list-view';
import DataActivity from './data-activity';
import axiosInstance from 'src/utils/axios';

const TIME_LABELS = {
    week: ['Mon', 'Tue', 'Web', 'Thu', 'Fri', 'Sat', 'Sun'],
    month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    year: ['2018', '2019', '2020', '2021', '2022'],
};

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];

const dummy = {
    total_users: 30,
    total_teams: 30,
    total_tasks: 30,
    priority: [
        { label: 'High', value: 12 },
        { label: 'Low', value: 5 },
        { label: 'Medium', value: 4 },
    ],
    status: [
        { label: 'Todo', value: 12 },
        { label: 'In Progress', value: 53 },
        { label: 'Done', value: 14 },
        { label: 'Testing', value: 7 },
    ],
    week: [
        { name: 'Tasks', data: [20, 34, 48, 65, 37, 48] },
        { name: 'Project', data: [10, 34, 13, 26, 27, 28] },
        { name: 'Documents', data: [10, 14, 13, 16, 17, 18] },
        { name: 'Other', data: [5, 12, 6, 7, 8, 9] },
    ],
    month: [
        {
            name: 'Tasks',
            data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 12, 43, 34],
        },
        {
            name: 'Project',
            data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 12, 43, 34],
        },
        {
            name: 'Documents',
            data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 12, 43, 34],
        },
        {
            name: 'Other',
            data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 12, 43, 34],
        },
    ],
    year: [
        { name: 'Tasks', data: [10, 34, 13, 56, 77] },
        { name: 'Project', data: [10, 34, 13, 56, 77] },
        { name: 'Documents', data: [10, 34, 13, 56, 77] },
        { name: 'Other', data: [10, 34, 13, 56, 77] },
    ],
    performer: [
        {
            id: '1',
            name: 'dummy',
            email: 'dummy@gmail.com',
            avatar: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_21.jpg',
        },
        {
            id: '2',
            name: 'dummy',
            email: 'dummy@gmail.com',
            avatar: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_22.jpg',
        },
        {
            id: '3',
            name: 'dummy',
            email: 'dummy@gmail.com',
            avatar: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_23.jpg',
        },
        {
            id: '4',
            name: 'dummy',
            email: 'dummy@gmail.com',
            avatar: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_24.jpg',
        },
        {
            id: '5',
            name: 'dummy',
            email: 'dummy@gmail.com',
            avatar: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_25.jpg',
        },
        {
            id: '6',
            name: 'non dummy',
            email: 'dummy@gmail.com',
            avatar: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_25.jpg',
        },
        {
            id: '7',
            name: 'non dummy',
            email: 'dummy@gmail.com',
            avatar: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_25.jpg',
        },
    ],
    assignies: [
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
    ],
    tasks: [
        {
            userid: 1,
            name: 'name',
            email: 'name@gmail.com',
            avatar: '',
            department: 'department-1',
            role: 'admin',
            status: 'active',
        },
        {
            userid: 2,
            name: 'name',
            email: 'name@gmail.com',
            avatar: '',
            department: 'department-1',
            role: 'admin',
            status: 'active',
        },
        {
            userid: 3,
            name: 'name',
            email: 'name@gmail.com',
            avatar: '',
            department: 'department-1',
            role: 'admin',
            status: 'pending',
        },
    ],
};
export default function AnalyticsView() {
    const theme = useTheme();
    const [ProjectName, setProjectName] = useState([]);
    const [dashboard, setDashboardDetails] = useState({ ...dummy });

    const getProjectDetails = async () => {
        try {
            const response = await axiosInstance.get('');
            const { data, errorcode, status, message } = response.data;
            if (errorcode === 0) {
                setDashboardDetails(data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setProjectName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value
        );
    };
    return (
        <Stack spacing={3} sx={{ mt: 3 }}>
            <TextField
                select
                label="Projects"
                name="Projects"
                value={ProjectName}
                onChange={handleChange}
                sx={{ maxWidth: '300px' }}
            >
                {names.map((name) => (
                    <MenuItem key={name} value={name}>
                        {name}
                    </MenuItem>
                ))}
            </TextField>
            <Grid container spacing={3}>
                <Grid xs={12} md={4}>
                    {' '}
                    <CountWidgetSummary title="Total Users" total={dashboard.total_users} />
                </Grid>
                <Grid xs={12} md={4}>
                    {' '}
                    <CountWidgetSummary title="Total Teams" total={dashboard.total_teams} />
                </Grid>
                <Grid xs={12} md={4}>
                    {' '}
                    <CountWidgetSummary title="Total Tasks" total={dashboard.total_tasks} />
                </Grid>

                <Grid xs={12} md={4}>
                    <CircleGroupChart
                        title="Total Task Priorities"
                        chart={{
                            series: dashboard.priority,
                        }}
                    />
                </Grid>
                <Grid xs={12} md={4}>
                    <CircleGroupChart
                        title="Total Task Status"
                        chart={{
                            series: dashboard.status,
                        }}
                    />
                </Grid>
                <Grid xs={12} md={4}>
                    {' '}
                    <ContactDetails assignee={dashboard.performer} />
                </Grid>
            </Grid>
            <DataActivity
                title="Data Activity"
                chart={{
                    labels: TIME_LABELS,
                    colors: [
                        theme.palette.primary.main,
                        theme.palette.error.main,
                        theme.palette.warning.main,
                        theme.palette.text.disabled,
                    ],
                    series: [
                        {
                            type: 'Week',
                            data: dashboard.week,
                        },
                        {
                            type: 'Month',
                            data: dashboard.month,
                        },
                        {
                            type: 'Year',
                            data: dashboard.year,
                        },
                    ],
                }}
            />
            <UserListView userList={dashboard.assignies} />
            <TaskListView tasks={dashboard.tasks} />
        </Stack>
    );
}
