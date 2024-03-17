import {
    Backdrop,
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
import { useSelector } from 'src/redux/store';
import { AuthContext } from 'src/auth/JwtContext';
import { LoadingScreen } from 'src/components/loading-screen';
import { useBoolean } from 'src/utils/use-boolean';

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

export default function TeamDetailsView() {
    const [value, setValue] = useState(0);
    const navigate = useNavigate();
    const loading = useBoolean()
    const department = useSelector((state) => state.department);
    const location = useLocation();
    const { user } = useContext(AuthContext);
    const [teams, setTeams] = useState({});

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const getBack = () => {
        navigate('/dashboard/teams/list');
    };

    const editTeams = () => {
        navigate('/dashboard/teams/create', {
            state: { teamId: location.state?.teamsId },
        });
    };

    const getTeamData = async () => {
        try {
            loading.onTrue()
            const response = await axiosInstance.post('/team/team_details', {
                team_id: location.state?.teamsId,
                dept_id: department.department_id,
            });
            const { data, errorcode, status, message } = response.data;
            console.log(data);
            if (errorcode === 0) {
                setTeams(data);
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
        if (firstRender.current && department.department_id && location.state?.teamsId) {
            getTeamData();
            firstRender.current = false;
        }
    }, [department.department_id, location.state?.teamsId]);

    return (
        <>
            <Backdrop open={loading.value}>
                <LoadingScreen />
            </Backdrop>
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
                    <IconButton onClick={editTeams}>
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
                <FullDetailsView teams={teams} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <CandidateDetails candidates={teams.contacts || []} />
            </CustomTabPanel>
        </>
    );
}
