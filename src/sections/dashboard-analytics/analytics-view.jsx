import { useState } from 'react';
import { Card, Stack, Box, TextField, Select, OutlinedInput, MenuItem } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Iconify from 'src/components/iconify/Iconify';
import CountWidgetSummary from './count-view';
import CircleGroupChart from './circle-group-charts';
import ContactDetails from './contacts-view';
import UserListView from './user-list-view';
import TaskListView from './task-list-view';
import DataActivity from './data-activity';

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

export default function AnalyticsView() {
    const [personName, setPersonName] = useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value
        );
    };
    return (
        <Stack spacing={3}>
            <TextField
                select
                label="Projects"
                name="Projects"
                value={personName}
                onChange={handleChange}
                sx={{ width: '400px' }}
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
                    <CountWidgetSummary
                        title="Total Users"
                        total={311000}
                        icon={<Iconify icon="fluent:people-team-20-filled" />}
                    />
                </Grid>
                <Grid xs={12} md={4}>
                    {' '}
                    <CountWidgetSummary
                        title="Total Teams"
                        total={311000}
                        icon={<Iconify icon="fluent:people-team-20-filled" />}
                    />
                </Grid>
                <Grid xs={12} md={4}>
                    {' '}
                    <CountWidgetSummary
                        title="Total Tasks"
                        total={311000}
                        icon={<Iconify icon="fluent:people-team-20-filled" />}
                    />
                </Grid>

                <Grid xs={12} md={4}>
                    <CircleGroupChart
                        title="Current Download"
                        chart={{
                            series: [
                                { label: 'Mac', value: 12244 },
                                { label: 'Window', value: 53345 },
                                { label: 'iOS', value: 44313 },
                                { label: 'Android', value: 78343 },
                            ],
                        }}
                    />
                </Grid>
                <Grid xs={12} md={4}>
                    <CircleGroupChart
                        title="Current Download"
                        chart={{
                            series: [
                                { label: 'Mac', value: 12244 },
                                { label: 'Window', value: 53345 },
                                { label: 'iOS', value: 44313 },
                                { label: 'Android', value: 78343 },
                            ],
                        }}
                    />
                </Grid>
                <Grid xs={12} md={4}>
                    {' '}
                    <ContactDetails />
                </Grid>
            </Grid>
            <DataActivity
                title="Data Activity"
                chart={{
                    labels: TIME_LABELS,
                    colors: ['red', 'info', 'error', 'warning', 'text.disabled'],
                    series: [
                        {
                            type: 'Week',
                            data: [
                                { name: 'Images', data: [20, 34, 48, 65, 37, 48] },
                                { name: 'Media', data: [10, 34, 13, 26, 27, 28] },
                                { name: 'Documents', data: [10, 14, 13, 16, 17, 18] },
                                { name: 'Other', data: [5, 12, 6, 7, 8, 9] },
                            ],
                        },
                        {
                            type: 'Month',
                            data: [
                                {
                                    name: 'Images',
                                    data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 12, 43, 34],
                                },
                                {
                                    name: 'Media',
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
                        },
                        {
                            type: 'Year',
                            data: [
                                { name: 'Images', data: [10, 34, 13, 56, 77] },
                                { name: 'Media', data: [10, 34, 13, 56, 77] },
                                { name: 'Documents', data: [10, 34, 13, 56, 77] },
                                { name: 'Other', data: [10, 34, 13, 56, 77] },
                            ],
                        },
                    ],
                }}
            />
            <UserListView />
            <TaskListView />
        </Stack>
    );
}
