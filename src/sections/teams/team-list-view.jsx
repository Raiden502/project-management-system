import { Box, InputAdornment, Stack, TextField } from '@mui/material';
import TeamItem from './team-list-item';
import Iconify from 'src/components/iconify/Iconify';
import axiosInstance from 'src/utils/axios';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import EmptyContent from 'src/components/empty-content/empty-content';
import { AuthContext } from 'src/auth/JwtContext';
import { useSelector } from 'src/redux/store';

const tempData = [
    {
        id: 9,
        name: 'Urban Mobility Solutions',
        desc: 'Develop innovative solutions for urban mobility, including smart transportation systems and traffic management.',
        icon: 'https://api-prod-minimal-v510.vercel.app/assets/images/company/company_2.png',
        candidates: '10',
        teamsize: '10',
        tasks: '21',
        date: '2024-09-05',
        status: 'paused',
    },
];

function TeamListView() {
    const [teams, setTeams] = useState([]);
    const { user } = useContext(AuthContext);
    const department = useSelector((state) => state.department);
    const [searchUsers, setSearchUsers] = useState('');

    const dataFiltered = applyFilter({
        inputData: teams,
        query: searchUsers,
    });

    const handleSearchTable = useCallback((event) => {
        setSearchUsers(event.target.value);
    }, []);

    const getTeamsList = async () => {
        try {
            const response = await axiosInstance.post('/team/team_list', { dept_id: department.department_id });
            const { data, errorcode, status, message } = response.data;
            if (errorcode === 0) {
                setTeams(data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const firstRender = useRef(true);
    useEffect(() => {
        if (firstRender.current && department.department_id) {
            getTeamsList();
            firstRender.current = false;
        }
    }, [department.department_id]);

    const notFound = !dataFiltered.length && !!searchUsers;

    return (
        <Stack gap={4}>
            <TextField
                name="projectname"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Iconify icon="ic:round-search" />
                        </InputAdornment>
                    ),
                }}
                sx={{ height: '40px', width: '300px' }}
                value={searchUsers}
                onChange={handleSearchTable}
                placeholder="search"
            />
            <Box
                gap={3}
                display="grid"
                gridTemplateColumns={{
                    xs: 'repeat(1, 1fr)',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(3, 1fr)',
                }}
            >
                {dataFiltered.map((details) => (
                    <TeamItem key={details.id} job={details} />
                ))}
            </Box>
            {(notFound || dataFiltered.length === 0) && <EmptyContent title="No Data" />}
        </Stack>
    );
}

export default TeamListView;

function applyFilter({ inputData, query }) {
    if (query) {
        inputData = inputData.filter(
            (contact) => contact.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
        );
    }
    return inputData;
}
