import { Box, InputAdornment, Stack, TextField } from '@mui/material';
import DepartmentItem from './department-list-item';
import Iconify from 'src/components/iconify/Iconify';
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import axiosInstance from 'src/utils/axios';
import { AuthContext } from 'src/auth/JwtContext';
import EmptyContent from 'src/components/empty-content/empty-content';
import { useSelector } from 'src/redux/store';

function DepartmentListView() {
    const [departmentsList, setDepartments] = useState([]);
    const department = useSelector((state)=>state.department)
    const { user } = useContext(AuthContext);
    const [searchUsers, setSearchUsers] = useState('');

    const access = useMemo(()=>department.dept_list.map((item)=>item.department_id), [department.dept_list])

    const dataFiltered = applyFilter({
        inputData: departmentsList,
        query: searchUsers,
    });

    const handleSearchTable = useCallback((event) => {
        setSearchUsers(event.target.value);
    }, []);

    const getDepartmentList = async () => {
        try {
            const response = await axiosInstance.post('/dept/dept_list', { org_id: user.org_id });
            const { data, errorcode, status, message } = response.data;
            if (errorcode === 0) {
                setDepartments(data);
                console.log(data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const firstRender = useRef(true);
    useEffect(() => {
        if (firstRender.current) {
            getDepartmentList();
            firstRender.current = false;
        }
    });

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
                    <DepartmentItem key={details.department_id} department={details} access={access} />
                ))}
            </Box>
            {notFound && <EmptyContent title="No Data" />}
        </Stack>
    );
}

export default DepartmentListView;

function applyFilter({ inputData, query }) {
    if (query) {
        inputData = inputData.filter(
            (contact) => contact.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
        );
    }
    return inputData;
}
