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
import { useEffect, useRef, useState } from 'react';
import Iconify from 'src/components/iconify/Iconify';
import FullDetailsView from './full-details-view';
import CandidateDetails from './candidate-details';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from 'src/utils/axios';
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


export default function ProjectDetailsView() {
    const [value, setValue] = useState(0);
    const department = useSelector((state) => state.department);
    const location = useLocation();
    const navigate = useNavigate();
    const [project, setProject] = useState({});

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const getBack = () => {
        navigate('/dashboard/projects/list');
    };

    const editProject = () => {
        navigate('/dashboard/projects/create', {
            state: { projectId: location.state?.projectId },
        });
    };

    const getProjectData = async () => {
        try {
            const response = await axiosInstance.post('/proj/proj_details', {
                proj_id: location.state?.projectId,
                dept_id: department.department_id,
            });
            const { data, errorcode, status, message } = response.data;
            console.log(data)
            if (errorcode === 0) {
                setProject(data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const firstRender = useRef(true);
    useEffect(() => {
        if (firstRender.current && department.department_id && location.state?.projectId) {
            getProjectData();
            firstRender.current = false;
        }
    }, [department.department_id, location.state?.projectId]);

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
                    <IconButton onClick={editProject}>
                        <Iconify icon="solar:pen-bold" />
                    </IconButton>
                    <Button
                        variant="contained"
                        endIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
                    >
                        <Typography variant="body2">Publish</Typography>
                    </Button>
                </Stack>
            </Stack>
            <Box sx={{ mt: 3 }}>
                <Tabs value={value} onChange={handleChange}>
                    <Tab label={<Typography variant="subtitle2">Content</Typography>} key={0} />
                    <Tab label={<Typography variant="subtitle2">Candidates</Typography>} key={1} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <FullDetailsView project={project} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <CandidateDetails candidates={project.contacts || []} />
            </CustomTabPanel>
        </>
    );
}
