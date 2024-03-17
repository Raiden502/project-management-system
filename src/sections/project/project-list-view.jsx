import { Backdrop, Box, InputAdornment, Stack, TextField } from '@mui/material';
import ProjItem from './project-list-item';
import Iconify from 'src/components/iconify/Iconify';
import { useContext, useEffect, useRef, useState } from 'react';
import axiosInstance from 'src/utils/axios';
import { AuthContext } from 'src/auth/JwtContext';
import EmptyContent from 'src/components/empty-content/empty-content';
import { useSelector } from 'src/redux/store';
import { useCallback } from 'react';
import { LoadingScreen } from 'src/components/loading-screen';
import { useBoolean } from 'src/utils/use-boolean';

function ProjectListView() {
    const [projects, setProjects] = useState([]);
    const loading = useBoolean()
    const { user } = useContext(AuthContext);
    const department = useSelector((state)=>state.department)
    const [searchUsers, setSearchUsers] = useState('');

    const dataFiltered = applyFilter({
        inputData: projects,
        query: searchUsers,
    });

    const handleSearchTable = useCallback((event) => {
        setSearchUsers(event.target.value);
    }, []);

    const getProjectList = async () => {
        try {
            loading.onTrue()
            const response = await axiosInstance.post('/proj/proj_list', { dept_id: department.department_id });
            const { data, errorcode, status, message } = response.data;
            if (errorcode === 0) {
                setProjects(data);
                console.log(data);
            }
        } catch (err) {
            console.log(err);
        }
        finally{
            loading.onFalse()
        }
    };

    const firstRender = useRef(true);
    useEffect(() => {
        if (firstRender.current && department.department_id ) {
            getProjectList();
            firstRender.current = false;
        }
    },[department.department_id ]);

    const notFound = !dataFiltered.length && !!searchUsers;
    console.log(user)

    return (
        <Stack gap={4}>
            <Backdrop open={loading.value}>
                <LoadingScreen />
            </Backdrop>
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
                    <ProjItem key={details.id} job={details} />
                ))}
            </Box>
            {(notFound || dataFiltered.length===0) && <EmptyContent title="No Data" />}
        </Stack>
    );
}

export default ProjectListView;


function applyFilter({ inputData, query }) {
    if (query) {
        inputData = inputData.filter(
            (contact) => contact.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
        );
    }
    return inputData;
}

