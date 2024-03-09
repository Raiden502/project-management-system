import { useEffect, useRef, useState } from 'react';
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
import { useSelector } from 'src/redux/store';
import TimeLine from './stages';

const dummy = {
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
};

export default function AnalyticsView() {
    const theme = useTheme();
    const department = useSelector((state) => state.department);
    const firstRender = useRef(true);
    const [ProjectName, setProjectName] = useState('');
    const [ProjectList, setProjectList] = useState([]);
    const [dashboard, setDashboardDetails] = useState({ ...dummy });

    const [totalCounts, setTotalCounts] = useState({
        total_stages: 0,
        total_tasks: 0,
        total_teams: 0,
        total_users: 0,
    });
    const [priorities, setPriorities] = useState([]);
    const [stages, setStages] = useState([]);
    const [taskList, setTaskList] = useState([]);
    const [userList, setUsersList] = useState([]);

    const fetchProjects = async () => {
        try {
            const response = await axiosInstance.post('/proj/proj_list', {
                dept_id: department.department_id,
            });
            const { errorcode, data, message } = response.data;
            if (errorcode === 0) {
                setProjectList(data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const HandleProjectChange = async () => {
        const urls = [
            '/get_counts',
            '/get_priority_counts',
            '/get_stage_counts',
            '/get_tasks_list',
            '/get_user_list',
        ];
        const response = await Promise.all(
            urls.map(async (uris) => {
                try {
                    const res = await axiosInstance.post(`/dashboard${uris}`, {
                        department_id: department.department_id,
                        project_id: ProjectName,
                    });
                    return res.data;
                } catch (error) {
                    return {};
                }
            })
        );
        // setLoaaderState(false);
        const [dashboard_count, stages_count, priority_count, task_list, user_list] = response;
        if (dashboard_count.errorcode === 0) setTotalCounts(dashboard_count.data);
        if (stages_count.errorcode === 0) setPriorities(stages_count.data);
        if (priority_count.errorcode === 0) setStages(priority_count.data);
        if (task_list.errorcode === 0) setTaskList(task_list.data);
        if (user_list.errorcode === 0) setUsersList(user_list.data);
    };

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setProjectName(value);
    };

    useEffect(() => {
        if (firstRender.current && department.department_id) {
            fetchProjects();
            firstRender.current = false;
        }
    }, [department.department_id]);

    useEffect(() => {
        if (ProjectName && department.department_id) {
            HandleProjectChange();
        }
    }, [ProjectName, department.department_id]);

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
                {ProjectList.map((item) => (
                    <MenuItem key={item.project_id} value={item.project_id}>
                        {item.name}
                    </MenuItem>
                ))}
            </TextField>
            <Grid container spacing={3}>
                <Grid xs={12} md={4}>
                    {' '}
                    <CountWidgetSummary
                        title="Total Users"
                        total={totalCounts.total_users}
                        sx={{
                            borderRadius: '15px',
                            boxShadow: 'rgba(149, 157, 165, 0.1) 0px 8px 24px',
                        }}
                    />
                </Grid>
                <Grid xs={12} md={4}>
                    {' '}
                    <CountWidgetSummary
                        title="Total Teams"
                        total={totalCounts.total_teams}
                        sx={{
                            borderRadius: '15px',
                            boxShadow: 'rgba(149, 157, 165, 0.1) 0px 8px 24px',
                        }}
                    />
                </Grid>
                <Grid xs={12} md={4}>
                    {' '}
                    <CountWidgetSummary
                        title="Total Tasks"
                        total={totalCounts.total_tasks}
                        sx={{
                            borderRadius: '15px',
                            boxShadow: 'rgba(149, 157, 165, 0.1) 0px 8px 24px',
                        }}
                    />
                </Grid>

                <Grid xs={12} md={4}>
                    <CircleGroupChart
                        title="Total Task Priorities"
                        chart={{
                            series: priorities,
                        }}
                    />
                </Grid>
                <Grid xs={12} md={4}>
                    <CircleGroupChart
                        title="Total Stages"
                        chart={{
                            series: stages,
                        }}
                    />
                </Grid>
                <Grid xs={12} md={4}>
                    {' '}
                    <ContactDetails assignee={dashboard.performer} />
                </Grid>
                <Grid xs={12} md={8}>
                    <UserListView userList={userList} />
                </Grid>
                <Grid xs={12} md={4}>
                    {' '}
                    <TimeLine assignee={dashboard.performer} />
                </Grid>
                <Grid xs={12} md={12}>
                    <TaskListView tasks={taskList} />
                </Grid>
            </Grid>
        </Stack>
    );
}
