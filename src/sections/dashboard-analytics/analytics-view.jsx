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

export default function AnalyticsView() {
    const theme = useTheme();
    const department = useSelector((state) => state.department);
    const firstRender = useRef(true);
    const [ProjectName, setProjectName] = useState('');
    const [ProjectList, setProjectList] = useState([]);
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
    const [timeline, setTimeline] = useState([]);
    const [performer, setPerformer] = useState([]);

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
            '/get_timeline',
            '/get_performance',
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
        const [
            dashboard_count,
            stages_count,
            priority_count,
            task_list,
            user_list,
            timeline,
            performer,
        ] = response;
        if (dashboard_count.errorcode === 0) setTotalCounts(dashboard_count.data);
        if (stages_count.errorcode === 0) setPriorities(stages_count.data);
        if (priority_count.errorcode === 0) setStages(priority_count.data);
        if (task_list.errorcode === 0) setTaskList(task_list.data);
        if (user_list.errorcode === 0) setUsersList(user_list.data);
        if (timeline.errorcode === 0) setTimeline(timeline.data);
        if (performer.errorcode === 0) setPerformer(performer.data);

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
                    <ContactDetails assignee={performer} />
                </Grid>
                <Grid xs={12} md={8}>
                    <UserListView userList={userList} />
                </Grid>
                <Grid xs={12} md={4}>
                    {' '}
                    <TimeLine assignee={timeline} />
                </Grid>
                <Grid xs={12} md={12}>
                    <TaskListView tasks={taskList} />
                </Grid>
            </Grid>
        </Stack>
    );
}
