import {
    Box,
    Button,
    Card,
    IconButton,
    ListItemText,
    Stack,
    Tab,
    Tabs,
    Typography,
} from '@mui/material';
import { useContext, useEffect, useRef, useState } from 'react';
import Iconify from 'src/components/iconify/Iconify';
import FullDetailsView from './full-details-view';
import CandidateDetails from './candidate-details';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from 'src/utils/axios';
import { AuthContext } from 'src/auth/JwtContext';
import { useSelector } from 'src/redux/store';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

export default function DepartmentDetailsView() {
    const department = useSelector((state) => state.department);
    const [value, setValue] = useState(0);
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [departmentDetails, setDepartmentDetails] = useState({});

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const getBack = () => {
        navigate('/dashboard/departments/list');
    };

    const editDepartment = () => {
        navigate('/dashboard/departments/create', {
            state: { departmentId: location.state?.departmentId || department.department_id },
        });
    };

    const getDepartmentData = async () => {
        try {
            const response = await axiosInstance.post('/dept/dept_details', {
                dept_id: location.state?.departmentId || department.department_id
            });
            const { data, errorcode, status, message } = response.data;
            if (errorcode === 0) {
                setDepartmentDetails(data);
                console.log(data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const firstRender = useRef(true);
    useEffect(() => {
        if (firstRender.current && department.department_id) {
            getDepartmentData();
            firstRender.current = false;
        }
    }, [department.department_id, location.state?.departmentId]);

    return (
        <>
            <Stack direction="row" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button
                    sx={{
                        textAlign: 'right',
                    }}
                    startIcon={<Iconify icon="eva:arrow-ios-back-fill" width={16} />}
                    onClick={getBack}
                >
                    <Typography variant="body2">Back</Typography>
                </Button>
                <Stack direction="row" gap={3}>
                    <IconButton onClick={editDepartment} disabled={user.role === 'user'}>
                        <Iconify icon="solar:pen-bold" />
                    </IconButton>
                </Stack>
            </Stack>
            <Box sx={{ mt: 3 }}>
                <Tabs value={value} onChange={handleChange}>
                    <Tab label={<Typography variant="subtitle2">Content</Typography>} key={0} />
                    <Tab label={<Typography variant="subtitle2">Candidates</Typography>} key={1} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <FullDetailsView department={departmentDetails} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <CandidateDetails candidates={departmentDetails.contacts || []} />
            </CustomTabPanel>
        </>
    );
}
